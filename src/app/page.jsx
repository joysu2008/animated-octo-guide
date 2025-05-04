'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import HomeScreen from '@/components/screens/HomeScreen';
import FocusScreen from '@/components/screens/FocusScreen';
import PostFocusScreen from '@/components/screens/PostFocusScreen';
import SessionLog from '@/components/SessionLog';
import Notepad from '@/components/Notepad'; // PLEASEEE PLEASE WORK
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; // import skeleton
import PixelBookOpenIcon from '@/components/icons/PixelBookOpenIcon';
import PixelNotepadIcon from '@/components/icons/PixelNotepadIcon'; // import notepad icon
import { cn } from '@/lib/utils'; // import cn for conditional classes

export default function Home() {
  const { appState, isHydrated, toggleNotepad } = useAppContext(); // get hydration status

  const renderScreen = () => {
    // don't render screen content until hydrated
    if (!isHydrated) {
      return <Skeleton className="h-[300px] w-full" />; // placeholder during hydration - skeleton is squared
    }

    switch (appState.currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'focus':
        return <FocusScreen />;
      case 'postFocus':
        return <PostFocusScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const isFocusScreen = appState.currentScreen === 'focus';
  const isNotepadOpen = appState.isNotepadOpen;

  return (
    <div className={cn(
        "relative min-h-screen flex flex-col",
        isFocusScreen && "bg-cover bg-center", // apply background only for focus screen
        !isFocusScreen && "bg-background" // use theme background otherwise
      )}
      style={isFocusScreen ? {
        backgroundImage: "url('/pixel_bg.gif')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      } 
    : {}}
    >
       {/* overlay for focus screen */}
       {isFocusScreen && <div className="absolute inset-0 bg-black/60 z-0"></div>}

       {/* sidebar trigger positioned top-left */}
       <div className="absolute w-[calc(100%-4rem)] h-[calc(100%-4rem)] top-4 left-4 z-20"> {/* ensure trigger is above overlay */} 
         <Sheet>
           <SheetTrigger asChild>
             {/* adjust trigger style for visibility on dark background */}
             <Button
               variant="ghost"
               size="icon"
               aria-label="Open Session Log"
               disabled={!isHydrated}
               className={cn(isFocusScreen ? "text-white hover:bg-white/20" : "text-foreground hover:bg-accent/10")}
              >
               <PixelBookOpenIcon className="h-5 w-5" /> {/* use pixelbookopenicon */}
             </Button>
           </SheetTrigger>
           <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 flex flex-col bg-sidebar text-sidebar-foreground border-r-pixel"> {/* use sidebar theme colors, add pixel border */}
             <SheetHeader className="p-4 border-b border-sidebar-border">
               {/* sheettitle uses font-bold and default font (silkscreen) */}
               <SheetTitle className="text-xl font-semibold text-center">Session Log</SheetTitle>
             </SheetHeader>
             {/* sessionlog content will be scrollable */}
             {isHydrated ? <SessionLog /> : <Skeleton className="flex-1 m-4" />}
           </SheetContent>
         </Sheet>
          {/* notepad trigger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleNotepad}
            disabled={!isHydrated}
            aria-label={isNotepadOpen ? "Close Notepad" : "Open Notepad"}
            aria-pressed={isNotepadOpen}
            className={cn(
                "p-1", // added padding
                isFocusScreen ? "text-white hover:bg-white/20" : "text-foreground hover:bg-accent/10",
                isNotepadOpen && (isFocusScreen ? "bg-white/20" : "bg-accent/10") // add active state background
            )}
           >
            <PixelNotepadIcon className="h-5 w-5" />
          </Button>
          {/* main content area - uses flex to arrange notepad and screen */}
           <main className="flex flex-1 justify-center items-center p-4 pt-0 md:p-8 md:pt-8 z-10 w-full h-full">
              {/* main content container */}
              <div className={cn(
               "flex gap-1 max-w-7xl transition-all duration-300 ease-in-out",
               appState.isNotepadOpen ? "justify-between" : "justify-center"
              )}
              style={{
                marginLeft: appState.isNotepadOpen ? (isHydrated ? '0' : '0') : '0', // Reset margin
              }}
            >
              {/* notepad container - conditional rendering and positioning */}
                 <div className={cn(
                     "transition-all duration-300 ease-in-out",
                     isNotepadOpen ? "w-1/3 max-w-xs mr-4 opacity-100" : "w-0 mr-0 opacity-0 overflow-hidden" // animate width, margin, opacity
                 )}>
                     {isHydrated && isNotepadOpen && <Notepad />}
                     {!isHydrated && isNotepadOpen && <Skeleton className="h-[400px] w-full" />}
                 </div>

                 {/* screen content container */}
                 <div className="w-[640px] transition-all duration-300 ease-in-out">
                   {renderScreen()}
                 </div>
             </div>
          </main>
       </div>
    </div>
  );
}
