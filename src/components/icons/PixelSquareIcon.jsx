import React from 'react';
import { cn } from '@/lib/utils';

const PixelSquareIcon = ({ className, ...props }) => (
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
    {/* pixel square */}
    <path d="M3 3 V13 H13 V3 Z M4 4 H12 V12 H4 Z" />
  </svg>
);

export default PixelSquareIcon;
