'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"
// replace lucide icons with pixel icons
import PixelPlayIcon from '@/components/icons/PixelPlayIcon';
import PixelInfinityIcon from '@/components/icons/PixelInfinityIcon';
import { cn } from '@/lib/utils'; // import cn for conditional classes

const HomeScreen = () => {
  const { appState, setTimerDuration, setFocusGoal, startSession, toggleStopwatchMode, isHydrated } = useAppContext();

  const handleStartClick = () => {
    if (!isHydrated) return;
    // allow starting without a goal if in stopwatch mode
    if (!appState.isStopwatchMode && appState.focusGoal.trim() === '') {
      // use a simple alert or a custom modal/toast later
      alert('Please enter what you want to focus on.');
      return;
    }
    startSession();
  };

  const handleSliderChange = (value) => {
    if (isHydrated && !appState.isStopwatchMode) { // only allow change if not stopwatch mode
      setTimerDuration(value[0]);
    }
  };

  const handleToggleStopwatch = () => {
    if (isHydrated) {
      toggleStopwatchMode();
    }
  };

  const isStopwatchActive = isHydrated && appState.isStopwatchMode;
  const displayDurationText = isStopwatchActive ? 'Stopwatch Mode' : `${appState.timerDuration} minutes`;


  return (
    <Card className="w-full"> {/* card already uses border-pixel from its definition */}
      <CardHeader>
        {/* cardtitle now uses font-bold and the default font (silkscreen) */}
        <CardTitle className="text-3xl text-center text-primary">Re(su)me</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          {/* label uses default font (silkscreen) */}
          <Label htmlFor="focus-goal" className="text-lg">What are you focusing on?</Label>
          <Input
            id="focus-goal"
            value={isHydrated ? appState.focusGoal : ''}
            onChange={(e) => setFocusGoal(e.target.value)}
            placeholder="e.g., Study Chapter 5"
            className="text-base" // input uses default font (silkscreen)
            disabled={!isHydrated}
          />
        </div>
         <div className="space-y-4">
           <div className="flex justify-between items-center">
             {/* label uses default font */}
             <Label htmlFor="duration-slider" className="text-lg">
               Session Length: {isHydrated ? displayDurationText : <Skeleton className="h-5 w-32 inline-block" />}
             </Label>
              <Button
                  variant="ghost" // keep ghost for the icon button
                  size="icon"
                  onClick={handleToggleStopwatch}
                  disabled={!isHydrated}
                  aria-pressed={isStopwatchActive}
                  className={cn(
                      "text-muted-foreground hover:text-primary", // default style
                      isStopwatchActive && "text-primary bg-accent/10" // active style
                  )}
                  aria-label={isStopwatchActive ? "Disable Stopwatch Mode" : "Enable Stopwatch Mode"}
              >
                  <PixelInfinityIcon className="h-5 w-5" /> {/* use pixel icon */}
              </Button>
           </div>

           {isHydrated ? (
             <Slider
               id="duration-slider"
               value={isStopwatchActive ? [0] : [appState.timerDuration]} // set value to 0 if stopwatch active
               max={120}
               min={5}
               step={5}
               onValueChange={handleSliderChange}
               aria-label="Session duration slider"
               disabled={!isHydrated || isStopwatchActive} // disable if not hydrated or stopwatch active
               className={cn(isStopwatchActive && "opacity-50 cursor-not-allowed")} // visually indicate disabled state
             />
            ) : (
             <Skeleton className="h-5 w-full" /> // show skeleton while loading
           )}
         </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={handleStartClick}
          variant="pixel" // use pixel variant for border
          className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 shadow-md transition-transform transform hover:scale-105" // custom styles
          aria-label="Start focus session"
          disabled={!isHydrated}
        >
          <PixelPlayIcon className="mr-2 h-5 w-5" /> {/* use pixel icon */}
          Start Focus
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HomeScreen;
