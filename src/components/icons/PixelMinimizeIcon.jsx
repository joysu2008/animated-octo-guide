
import React from 'react';
import { cn } from '@/lib/utils';

const PixelMinimizeIcon = ({ className, ...props }) => (
  <svg
    width="6" // adjust size as needed
    height="6"
    viewBox="0 0 6 6"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("inline-block", className)} // ensure it behaves like an icon
    shapeRendering="crispEdges"
    fill="currentColor" // inherit color from parent
    {...props}
  >
    {/* four arrows pointing inwards */}
    <path d="M1 0V1H0V2H2V0M4 0V2H6V1H5V0H4M4 4V6H5V5H6V4H4M2 4V6H1M1 6V5H0V4H2" />
  </svg>
);

export default PixelMinimizeIcon;