'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PixelStarIcon from '@/components/icons/PixelStarIcon';
import PixelTrashIcon from '@/components/icons/PixelTrashIcon';
import { formatDistanceToNow } from 'date-fns';

const SessionLog = () => {
  const { appState, deleteSessionEntry, clearSessionLog } = useAppContext();

  const handleDeleteEntry = (index) => {
    deleteSessionEntry(index);
  };

  const handleClearLog = () => {
    clearSessionLog();
  };

  return (
    <div className="flex flex-col h-full"> {/* ensure parent takes full height */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="space-y-4 p-4"> {/* add padding back here */}
          {appState.sessionLog.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No sessions logged yet.</p> // inherits default font (silkscreen)
          ) : (
            appState.sessionLog.map((session, index) => (
              <Card key={index} className="relative group"> {/* card uses border-pixel */}
                <CardHeader className="pb-2">
                  {/* cardtitle uses font-bold and default font (silkscreen) */}
                  <CardTitle className="text-base flex justify-between items-center">
                      <span className="text-card-foreground">{session.focusGoal || (session.isStopwatchSession ? 'Stopwatch Session' : 'Untitled Session')}</span>
                      <span className="text-xs text-muted-foreground"> {/* inherits default font */}
                        {session.endTime ? formatDistanceToNow(new Date(session.endTime), { addSuffix: true }) : 'In Progress'}
                      </span>
                  </CardTitle>
                  <CardDescription className="text-xs"> {/* inherits default font */}
                      Planned: {session.isStopwatchSession ? 'Stopwatch' : `${session.plannedDuration}m`} | Actual: {session.actualDuration}m
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4 pr-10"> {/* adjusted padding, added right padding */}
                  {/* inherits default font */}
                  {session.review && session.review !== "Session ended early." && <p className="text-sm mb-2 text-card-foreground">"{session.review}"</p>}
                  {session.rating > 0 && (
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                            <PixelStarIcon // use pixelstaricon
                              key={i}
                              className={`h-4 w-4 ${
                                i < session.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                              }`}
                            />
                        ))}
                      </div>
                  )}
                  {/* inherits default font */}
                  {session.review === "Session ended early." && (
                      <p className="text-xs text-muted-foreground italic">Ended early</p>
                  )}
                  {/* inherits default font */}
                  {!session.review && session.rating === 0 && session.review !== "Session ended early." && (
                      <p className="text-xs text-muted-foreground italic">No review submitted.</p>
                  )}

                  {/* delete button for single entry */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost" // ghost variant has no border
                        size="icon"
                        className="absolute bottom-2 right-2 h-6 w-6 text-destructive/70 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100" // make focus visible
                        aria-label="Delete session entry"
                      >
                        <PixelTrashIcon className="h-4 w-4" /> {/* use pixeltrashicon */}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent> {/* alertdialogcontent is squared */}
                      <AlertDialogHeader>
                        {/* alertdialogtitle uses font-bold and default font */}
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        {/* inherits default font */}
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this session entry.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        {/* buttons inherit default font */}
                        <AlertDialogCancel>Cancel</AlertDialogCancel> {/* outline button, no pixel border */}
                        <AlertDialogAction onClick={() => handleDeleteEntry(index)} className={'bg-destructive hover:bg-destructive/90 text-destructive-foreground border-pixel'}> {/* add pixel border */}
                           Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {/* clear log button - placed outside scrollarea */}
      {appState.sessionLog.length > 0 && (
        <div className="p-4 border-t border-sidebar-border mt-auto"> {/* pushes button to bottom */}
           <AlertDialog>
             <AlertDialogTrigger asChild>
               {/* button inherits default font */}
               <Button variant="destructive" className="w-full border-pixel"> {/* add pixel border */}
                 <PixelTrashIcon className="mr-2 h-4 w-4" /> Clear Entire Log {/* use pixeltrashicon */}
               </Button>
             </AlertDialogTrigger>
             <AlertDialogContent> {/* alertdialogcontent is squared */}
               <AlertDialogHeader>
                 {/* alertdialogtitle uses font-bold and default font */}
                 <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                 {/* inherits default font */}
                 <AlertDialogDescription>
                   This action cannot be undone. This will permanently delete your entire session history.
                 </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                 {/* buttons inherit default font */}
                 <AlertDialogCancel>Cancel</AlertDialogCancel> {/* outline button, no pixel border */}
                 <AlertDialogAction onClick={handleClearLog} className={'bg-destructive hover:bg-destructive/90 text-destructive-foreground border-pixel'}> {/* add pixel border */}
                   Clear Log
                 </AlertDialogAction>
               </AlertDialogFooter>
             </AlertDialogContent>
           </AlertDialog>
         </div>
      )}
    </div>
  );
};

export default SessionLog;
