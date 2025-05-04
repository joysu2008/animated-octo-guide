'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
// replace lucide icons with pixel icons
import PixelPauseIcon from '@/components/icons/PixelPauseIcon';
import PixelPlayIcon from '@/components/icons/PixelPlayIcon';
import PixelSquareIcon from '@/components/icons/PixelSquareIcon';
import * as Tone from 'tone';
import { cn } from '@/lib/utils'; // import cn

// format time helper (works for both countdown and countup)
const formatTime = (totalSeconds) => {
  const absoluteSeconds = Math.max(0, totalSeconds); // ensure non-negative
  const mins = Math.floor(absoluteSeconds / 60);
  const secs = Math.floor(absoluteSeconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const FocusScreen = () => {
  const { appState, prepareToEndSession } = useAppContext(); // use preparetoendsession
  const isStopwatch = appState.currentSession?.isStopwatchSession ?? false;
  const plannedTotalSeconds = isStopwatch ? 0 : (appState.currentSession?.plannedDuration ?? 0) * 60;

  // state: timevalue represents seconds left (countdown) or seconds elapsed (stopwatch)
  const [timeValue, setTimeValue] = useState(isStopwatch ? 0 : plannedTotalSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false); // used internally for countdown

  // refs
  const intervalRef = useRef(null);
  const synth = useRef(null);
  const sessionStartTimeRef = useRef(Date.now());
  const pauseStartTimeRef = useRef(null);
  const totalPausedDurationRef = useRef(0);

  const playSound = useCallback(() => {
     // only play sound if it's a countdown timer finishing
     if (!isStopwatch) {
         Tone.start().then(() => {
           if (!synth.current) {
             synth.current = new Tone.Synth().toDestination();
           }
           synth.current.triggerAttackRelease("C4", "8n", Tone.now());
         }).catch(err => {
            console.error("failed to start tone.js or play sound:", err);
         });
     }
  }, [isStopwatch]);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // effect to handle the timer update logic
  const updateTimer = useCallback(() => {
     if (isPaused || (isTimerFinished && !isStopwatch)) return; // stop if paused or countdown finished

     const now = Date.now();
     const grossElapsedTime = now - sessionStartTimeRef.current;
     const netElapsedTime = grossElapsedTime - totalPausedDurationRef.current;
     const netElapsedSeconds = Math.floor(netElapsedTime / 1000);

     if (isStopwatch) {
       setTimeValue(netElapsedSeconds); // count up
     } else {
       // countdown mode
       const currentSecondsLeft = plannedTotalSeconds - netElapsedSeconds;
       setTimeValue(Math.max(0, currentSecondsLeft));

       if (currentSecondsLeft <= 0) {
         setIsTimerFinished(true); // mark as finished for internal logic
         clearTimerInterval();
         playSound();
         // don't navigate here, let the effect below handle it
       }
     }
   }, [plannedTotalSeconds, isPaused, isTimerFinished, isStopwatch, clearTimerInterval, playSound]);

   // effect to trigger navigation when countdown timer finishes
   // avoid calling setscreen directly in the render phase of focusscreen
   useEffect(() => {
       let timeoutId;
       if (isTimerFinished && !isStopwatch && !isPaused) {
           // use settimeout to delay the state update slightly, ensuring it happens after the current render cycle
           timeoutId = setTimeout(() => {
               prepareToEndSession();
           }, 100); // added small delay
       }
       return () => clearTimeout(timeoutId); // cleanup the timeout if the component unmounts or dependencies change
   }, [isTimerFinished, isStopwatch, isPaused, prepareToEndSession]);


  // effect to manage the interval timer
  useEffect(() => {
    clearTimerInterval();

    if (!isPaused && !(isTimerFinished && !isStopwatch)) { // don't restart if countdown finished
        updateTimer(); // immediate update on start/resume
        intervalRef.current = setInterval(updateTimer, 1000);
    }

    return clearTimerInterval; // cleanup interval
  }, [isPaused, isTimerFinished, isStopwatch, updateTimer, clearTimerInterval]);


  // effect to initialize/reset timer on mount or when session changes
  useEffect(() => {
    sessionStartTimeRef.current = Date.now();
    totalPausedDurationRef.current = 0;
    pauseStartTimeRef.current = null;
    setIsPaused(false);
    setIsTimerFinished(false);
    setTimeValue(isStopwatch ? 0 : plannedTotalSeconds);

    return clearTimerInterval;
  }, [isStopwatch, plannedTotalSeconds, clearTimerInterval]);


  const handlePauseResume = () => {
    setIsPaused((prevPaused) => {
      const newState = !prevPaused;
      if (newState) {
        // pausing
        pauseStartTimeRef.current = Date.now();
        clearTimerInterval();
      } else {
        // resuming
        if (pauseStartTimeRef.current) {
          const pauseDuration = Date.now() - pauseStartTimeRef.current;
          totalPausedDurationRef.current += pauseDuration;
          pauseStartTimeRef.current = null;
        }
        // timer restart is handled by the interval useeffect
      }
      return newState;
    });
  };

  // handle manual end session click
  const handleEndSession = () => {
    clearTimerInterval();
    prepareToEndSession(); // always go to review screen via prepare
  };

  // calculate progress for countdown, hide for stopwatch
  const progress = (!isStopwatch && plannedTotalSeconds > 0)
    ? Math.max(0, ((plannedTotalSeconds - timeValue) / plannedTotalSeconds) * 100)
    : undefined;


  return (
    <Card
      // remove background styling here - it's now handled by the page layout
      // keep border-pixel-white and potentially bg-transparent if needed
      className="w-full text-center relative overflow-hidden bg-transparent border-pixel-white"
    >
      {/* content still needs z-10 if it were on top of an overlay within the card, but not needed now */}
      <div className="py-6"> {/* add some padding */}
        <CardHeader className="text-white"> {/* text color for contrast against page background */}
          {/* cardtitle uses default font (silkscreen) and font-bold */}
          <CardTitle className="text-xl text-white">Focusing On:</CardTitle>
          {/* body font is default (silkscreen), ensure text is visible */}
          <p className="text-lg mt-1 text-white">{appState.currentSession?.focusGoal || (isStopwatch ? 'Stopwatch Session' : 'Your Goal Here')}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* timer display uses default font (silkscreen) and is bold */}
          <div className="text-7xl font-bold text-white">
            {formatTime(timeValue)}
          </div>
          {!isStopwatch && progress !== undefined && (
             <> {/* fragment to allow comment */}
               <Progress value={progress} className="w-3/4 mx-auto h-4 bg-white/30 border-white/50" aria-label={`Time remaining: ${formatTime(timeValue)}`} />
               {/* adjust progress bar bg and border */}
             </>
          )}
          {isStopwatch && (
            <div className="h-4 text-sm text-white/80">Stopwatch Mode</div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          {/* pause/resume button */}
          <Button
            onClick={handlePauseResume}
            variant="outline" // use outline style
            size="lg"
            className="text-lg border-pixel-white text-white bg-black/30 hover:bg-white/20" // white pixel border, semi-transparent bg
            aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
            disabled={isTimerFinished && !isStopwatch}
          >
             {isPaused ? <PixelPlayIcon className="mr-2 h-5 w-5" /> : <PixelPauseIcon className="mr-2 h-5 w-5" />} {/* use pixel icons */}
             {isPaused ? 'Resume' : 'Pause'}
          </Button>
          {/* end session button */}
          <Button
            onClick={handleEndSession}
            variant="destructive" // use destructive colors
            size="lg"
            className="text-lg border-pixel-white text-white bg-destructive/80 hover:bg-destructive/90" // white pixel border, adjusted bg
            aria-label="End session"
          >
             <PixelSquareIcon className="mr-2 h-5 w-5" /> {/* use pixelsquareicon */}
             End Session
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default FocusScreen;
