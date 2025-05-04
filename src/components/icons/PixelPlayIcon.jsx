import React from 'react';
import { cn } from '@/lib/utils';

const PixelPlayIcon = ({ className, ...props }) => (
  <svg
    width="3" // adjust size as needed
    height="5"
    viewBox="0 0 3 5"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("inline-block", className)} // ensure it behaves like an icon
    shapeRendering="crispEdges"
    fill="currentColor" // inherit color from parent
    {...props}
  >
    {/* simple pixel triangle */}
    <path d="M0 0V5H1V4H2V3H3V2H2V1 1H1V0H0" />
  </svg>
);

export default PixelPlayIcon;
