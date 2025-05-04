import React from 'react';
import { cn } from '@/lib/utils';

const PixelSquareIcon = ({ className, ...props }) => (
  <svg
    width="5" // adjust size as needed
    height="5"
    viewBox="0 0 5 5"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("inline-block", className)} // ensure it behaves like an icon
    shapeRendering="crispEdges"
    fill="currentColor" // inherit color from parent
    {...props}
  >
    {/* pixel square */}
    <path d="M0 0 0 2V5 5H5V0H1V1H4 4V4H1V0H0" />
  </svg>
);

export default PixelSquareIcon;
