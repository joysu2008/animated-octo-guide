
import React from 'react';
import { cn } from '@/lib/utils';

const PixelMaximizeIcon = ({ className, ...props }) => (
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
    {/* four arrows pointing outwards */}
    <path d="M0 0V2H1V1H2V0ZM4 0H6V2H5V1H4V0M6 4V6H4V5H5V4H6M0 4V6H2V5H1V4H0" />
  </svg>
);

export default PixelMaximizeIcon;
