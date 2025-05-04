'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const Notepad = () => {
  const { appState, setNotepadContent, isHydrated } = useAppContext();

  if (!isHydrated) {
    return null; // or a loading skeleton
  }

  return (
    <div className="relative h-full w-full max-w-xs p-4 pt-10"> {/* add top padding for header */}
      {/* svg background */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 133.33" // adjust viewbox based on desired aspect ratio (e.g., 3:4)
        preserveAspectRatio="none" // allow stretching
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 z-0 pointer-events-none"
        shapeRendering="crispEdges"
      >
         {/* pale blue paper */}
         <rect width="100" height="133.33" fill="#D6EAF8" /> {/* pale blue fill */}

         {/* black spiral binding at the top */}
         {/* repeat small black rectangles for spiral effect */}
         <rect x="10" y="5" width="8" height="4" fill="#000000" />
         <rect x="22" y="5" width="8" height="4" fill="#000000" />
         <rect x="34" y="5" width="8" height="4" fill="#000000" />
         <rect x="46" y="5" width="8" height="4" fill="#000000" />
         <rect x="58" y="5" width="8" height="4" fill="#000000" />
         <rect x="70" y="5" width="8" height="4" fill="#000000" />
         <rect x="82" y="5" width="8" height="4" fill="#000000" />
          {/* add more if needed based on width */}
      </svg>

       {/* notepad content */}
       <div className="relative z-10 flex flex-col h-full">
          {/* header */}
         <h3 className="text-lg font-bold text-center text-foreground mb-2 absolute top-0 left-0 right-0 pt-4">
            notepad
         </h3>
         {/* textarea - adjust padding to avoid overlap */}
         <Textarea
           value={appState.notepadContent}
           onChange={(e) => setNotepadContent(e.target.value)}
           placeholder="jot down your thoughts..."
           // make textarea transparent to see svg, adjust text color for readability
           className="flex-1 resize-none bg-transparent border-none focus:ring-0 focus:outline-none p-2 pt-6 text-sm font-normal text-black" // adjust padding, text color
           style={{ paddingTop: '2.5rem' }} // ensure text starts below header/binding
         />
       </div>
    </div>
  );
};

export default Notepad;
