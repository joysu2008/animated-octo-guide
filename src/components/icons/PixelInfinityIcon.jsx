import React from 'react';
import { cn } from '@/lib/utils';

const PixelInfinityIcon = ({ className, ...props }) => (
  <svg
    width="11"
    height="5"
    viewBox="0 0 11 5"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("inline-block", className)} // ensure it behaves like an icon
    shapeRendering="crispEdges"
    fill="currentColor" // inherit color from parent
    {...props}
  >
    {/* pixelated infinity symbol */}
    <path d="M1 1V0H4V1H5V2H6c0-.3333 0-.6667 0-1H7C7 .6667 7 .3333 7 0h3V1h1V4H10V5H7V4H6c0-.3333 0-.6667 0-1H7V4h3V1H7V2H6V3H5V4H4V5H1V4H0V1H1V4H4V3H5V2H4V1" />
  </svg>
);

export default PixelInfinityIcon;
