import React from 'react';
import { cn } from '@/lib/utils';

const PixelPauseIcon = ({ className, ...props }) => (
  <svg
    width="4" // adjust size as needed
    height="5"
    viewBox="0 0 4 5" // xcoor, ycoor, w, h
    xmlns="http://www.w3.org/2000/svg"
    className={cn("inline-block", className)} // ensure it behaves like an icon
    shapeRendering="crispEdges"
    fill="currentColor" // inherit color from parent
    {...props}
  >
    {/* pixel pause bars */}
    <path d="M0 0V5H1V0 0ZV0M3 0H4V5H3Z" />
  </svg>
);

export default PixelPauseIcon;
