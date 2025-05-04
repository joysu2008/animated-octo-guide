import React from 'react';
import { cn } from '@/lib/utils';

const PixelInfinityIcon = ({ className, ...props }) => (
  <svg
    width="24" // adjust size as needed
    height="16"
    viewBox="0 0 24 16"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("inline-block", className)} // ensure it behaves like an icon
    shapeRendering="crispEdges"
    fill="currentColor" // inherit color from parent
    {...props}
  >
    {/* pixelated infinity symbol */}
    <path d="M6 4 V6 H4 V10 H6 V12 H10 V10 H14 V12 H18 V10 H20 V6 H18 V4 H14 V6 H10 V4 Z M8 6 H10 V10 H8 Z M14 6 H16 V10 H14 Z" />
  </svg>
);

export default PixelInfinityIcon;
