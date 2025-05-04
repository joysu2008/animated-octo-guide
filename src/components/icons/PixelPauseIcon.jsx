import React from 'react';
import { cn } from '@/lib/utils';

const PixelPauseIcon = ({ className, ...props }) => (
  <svg
    width="16" // adjust size as needed
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("inline-block", className)} // ensure it behaves like an icon
    shapeRendering="crispEdges"
    fill="currentColor" // inherit color from parent
    {...props}
  >
    {/* pixel pause bars */}
    <path d="M4 3 V13 H6 V3 Z M10 3 V13 H12 V3 Z" />
  </svg>
);

export default PixelPauseIcon;
