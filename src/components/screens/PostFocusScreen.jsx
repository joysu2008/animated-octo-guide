'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
// replace lucide star with pixelstaricon
import PixelStarIcon from '@/components/icons/PixelStarIcon';
import CookieBurstAnimation from '@/components/CookieBurstAnimation';

const PostFocusScreen = () => {
  const { appState, endSession } = useAppContext();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  const handleSubmit = () => {
    // allow submission even if rating is 0 (covers early ended sessions)
    // the endsession function handles the review/rating appropriately.
    setShowAnimation(false); // optional: hide animation on submit
    endSession(review, rating); // pass the current review and rating
  };

   // hide animation after a delay
   useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000); // adjust duration as needed (e.g., 3 seconds)
    return () => clearTimeout(timer);
  }, []);

  const actualDuration = appState.currentSession?.actualDuration ?? 0;
  const sessionGoal = appState.currentSession?.focusGoal || 'your session';
  const isStopwatch = appState.currentSession?.isStopwatchSession ?? false;
  const plannedDuration = appState.currentSession?.plannedDuration ?? 0;


  return (
    <div className="relative">
      {showAnimation && <CookieBurstAnimation />}
      <Card className="w-full"> {/* card uses border-pixel */}
        <CardHeader>
          {/* cardtitle uses default font (silkscreen) and font-bold */}
          <CardTitle className="text-3xl text-center text-primary">Session Complete!</CardTitle>
          {/* body font is default (silkscreen) */}
          <p className="text-center text-muted-foreground mt-2">
            You focused on "{sessionGoal}" for {actualDuration} minute{actualDuration !== 1 ? 's' : ''}.
            { !isStopwatch && plannedDuration > 0 && ` (Planned: ${plannedDuration}m)`}
            { isStopwatch && ` (Stopwatch Mode)`}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            {/* label uses default font (silkscreen) */}
            <Label htmlFor="review" className="text-lg">How did it go?</Label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="e.g., Stayed focused, got distracted by..."
              className="text-base min-h-[100px]" // textarea uses default font (silkscreen)
            />
          </div>
          <div className="space-y-2">
             {/* label uses default font (silkscreen) */}
             <Label className="text-lg block mb-2">Rate your focus:</Label>
             <div className="flex space-x-1 justify-center">
               {[1, 2, 3, 4, 5].map((star) => (
                 <PixelStarIcon // use pixelstaricon
                   key={star}
                   className={`h-8 w-8 cursor-pointer transition-colors ${
                     (hoverRating || rating) >= star
                       ? 'text-yellow-400 fill-yellow-400' // control fill here
                       : 'text-muted-foreground'
                   }`}
                   // ensure fill is controlled by classname or set explicitly if needed
                   fill={(hoverRating || rating) >= star ? 'currentColor' : 'currentColor'} // use currentcolor to inherit from text color
                   onMouseEnter={() => setHoverRating(star)}
                   onMouseLeave={() => setHoverRating(0)}
                   onClick={() => setRating(star)}
                   aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                 />
               ))}
             </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleSubmit}
            variant="pixel" // use pixel variant for border
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-4 shadow-md transition-transform transform hover:scale-105" // custom styles
            aria-label="Submit session review"
          >
            Submit Review & Finish
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostFocusScreen;
