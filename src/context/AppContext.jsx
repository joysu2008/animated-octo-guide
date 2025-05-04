'use client';

import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';

const AppContext = createContext(undefined);

const defaultAppState = {
  currentScreen: 'home', // 'home', 'focus', 'postfocus'
  timerDuration: 25, // in minutes
  isStopwatchMode: false, // new state for stopwatch mode
  focusGoal: '',
  sessionLog: [], // array of session objects
  currentSession: null, // partial<session> & { starttime?: date } | null
  isNotepadOpen: false, // default notepad state
  notepadContent: '', // default notepad content
};

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState(defaultAppState);
  const [isHydrated, setIsHydrated] = useState(false);

  // load state from localstorage
  useEffect(() => {
    const savedState = localStorage.getItem('focusFlowState');
    let initialState = defaultAppState;

    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);

        if (parsedState.sessionLog) {
          parsedState.sessionLog = parsedState.sessionLog.map((session) => ({
            ...session,
            startTime: session.startTime ? new Date(session.startTime) : undefined,
            endTime: session.endTime ? new Date(session.endTime) : undefined,
            isStopwatchSession: session.isStopwatchSession ?? false,
            plannedDuration: typeof session.plannedDuration === 'number' ? session.plannedDuration : 0,
            actualDuration: typeof session.actualDuration === 'number' ? session.actualDuration : 0, // ensure actualduration exists
          }));
        }
        if (parsedState.currentSession && parsedState.currentSession.startTime) {
          parsedState.currentSession.startTime = new Date(parsedState.currentSession.startTime);
          parsedState.currentSession.isStopwatchSession = parsedState.currentSession.isStopwatchSession ?? false;
          parsedState.currentSession.plannedDuration = typeof parsedState.currentSession.plannedDuration === 'number' ? parsedState.currentSession.plannedDuration : 0;
          // don't restore actualduration for currentsession, it will be recalculated
          delete parsedState.currentSession.actualDuration;
        }

        initialState = { 
          ...defaultAppState, 
          ...parsedState,
          isNotepadOpen: parsedState.isNotepadOpen ?? false,
          notepadContent: parsedState.notepadContent ?? ''
        };
      } catch (error) {
        console.error("failed to parse state from localstorage", error);
      }
    }
    setAppState(initialState);
    setIsHydrated(true);
  }, []);


  // save state to localstorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('focusFlowState', JSON.stringify(appState));
    }
  }, [appState, isHydrated]);

  // --- state update callbacks ---

  const setScreen = useCallback((screen) => {
    setAppState((prevState) => ({ ...prevState, currentScreen: screen }));
  }, []);

  const setTimerDuration = useCallback((duration) => {
     if (!appState.isStopwatchMode) {
        setAppState((prevState) => ({ ...prevState, timerDuration: duration }));
     }
  }, [appState.isStopwatchMode]);

  const toggleStopwatchMode = useCallback(() => {
    setAppState((prevState) => ({
      ...prevState,
      isStopwatchMode: !prevState.isStopwatchMode,
    }));
  }, []);

  const setFocusGoal = useCallback((goal) => {
    setAppState((prevState) => ({ ...prevState, focusGoal: goal }));
  }, []);

  // --- notepad callbacks ---
  const toggleNotepad = useCallback(() => {
    setAppState((prevState) => ({
      ...prevState,
      isNotepadOpen: !prevState.isNotepadOpen,
    }));
  }, []);

  const setNotepadContent = useCallback((content) => {
    setAppState((prevState) => ({ ...prevState, notepadContent: content }));
  }, []);
  
  // --- session lifecycle callbacks ---

  const startSession = useCallback(() => {
    setAppState((prevState) => {
      const isStopwatch = prevState.isStopwatchMode;
      const newSession = {
        startTime: new Date(),
        focusGoal: prevState.focusGoal,
        plannedDuration: isStopwatch ? 0 : prevState.timerDuration,
        isStopwatchSession: isStopwatch,
        // actualduration will be set in preparetoendsession
        // endtime, review, rating will be set in endsession
      };
      return {
        ...prevState,
        currentScreen: 'focus',
        currentSession: newSession,
      };
    });
  }, []);

  /**
   * calculates the actual duration of the session so far, updates the
   * currentsession state, and navigates to the postfocus screen for review.
   * called when timer naturally finishes or when 'end session' is clicked.
   */
   const prepareToEndSession = useCallback(() => {
    setAppState((prevState) => {
      if (!prevState.currentSession || !prevState.currentSession.startTime) {
        console.error("cannot prepare to end session: current session or start time is missing.");
        return { ...prevState, currentScreen: 'home', currentSession: null }; // go home if error
      }

      const now = new Date();
      const startTime = prevState.currentSession.startTime;
      const isStopwatch = prevState.currentSession.isStopwatchSession ?? false;
      const plannedDuration = prevState.currentSession.plannedDuration ?? 0;

      // calculate duration in minutes
      const elapsedMilliseconds = now.getTime() - startTime.getTime();
      const actualDurationMinutes = Math.round(elapsedMilliseconds / (1000 * 60));

      // cap duration only if it's not a stopwatch session and planned duration > 0
      const finalActualDuration = (!isStopwatch && plannedDuration > 0)
        ? Math.min(actualDurationMinutes, plannedDuration)
        : actualDurationMinutes;

       // update the current session with the calculated duration before navigating
       const updatedSession = {
           ...prevState.currentSession,
           actualDuration: finalActualDuration,
       };

      return {
        ...prevState,
        currentSession: updatedSession,
        currentScreen: 'postFocus', // navigate to review screen
      };
    });
  }, []);

 /**
  * finalizes the session after review, adds it to the log, and resets state.
  * called from postfocusscreen.
  */
 const endSession = useCallback((review, rating) => {
    setAppState((prevState) => {
      if (!prevState.currentSession || !prevState.currentSession.startTime || prevState.currentSession.actualDuration === undefined) {
        console.error("error finalizing session: current session data incomplete (starttime or actualduration missing).");
        // attempt to recover or just reset
        return {
           ...prevState,
           currentScreen: 'home',
           currentSession: null,
           focusGoal: '',
        };
      }

      const endTime = new Date(); // use current time as end time

      const completedSession = {
        startTime: prevState.currentSession.startTime,
        endTime: endTime,
        focusGoal: prevState.currentSession.focusGoal || '',
        plannedDuration: prevState.currentSession.plannedDuration ?? 0,
        actualDuration: prevState.currentSession.actualDuration, // use the pre-calculated duration
        review: review,
        rating: rating,
        isStopwatchSession: prevState.currentSession.isStopwatchSession ?? false,
      };

      return {
        ...prevState,
        sessionLog: [completedSession, ...prevState.sessionLog],
        currentScreen: 'home',
        currentSession: null,
        focusGoal: '',
        // keep stopwatch mode as user set it
      };
    });
  }, []);

  // --- log management callbacks ---

  const deleteSessionEntry = useCallback((index) => {
    setAppState((prevState) => {
      const updatedLog = [...prevState.sessionLog];
      updatedLog.splice(index, 1);
      return { ...prevState, sessionLog: updatedLog };
    });
  }, []);

  const clearSessionLog = useCallback(() => {
    setAppState((prevState) => ({ ...prevState, sessionLog: [] }));
  }, []);

  // --- context value ---

  const contextValue = useMemo(() => ({
     appState,
     setScreen,
     setTimerDuration,
     toggleStopwatchMode,
     setFocusGoal,
     startSession,
     prepareToEndSession, // expose new function
     endSession,
     deleteSessionEntry,
     clearSessionLog,
     isHydrated,
     toggleNotepad, // add notepad functions
     setNotepadContent // add notepad functions
  }), [
      appState,
      setScreen,
      setTimerDuration,
      toggleStopwatchMode,
      setFocusGoal,
      startSession,
      prepareToEndSession, // add to dependencies
      endSession,
      deleteSessionEntry,
      clearSessionLog,
      isHydrated,
      toggleNotepad, // add to dependencies
      setNotepadContent // add to dependencies
]);


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
