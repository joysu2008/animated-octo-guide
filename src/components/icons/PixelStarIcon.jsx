import React from 'react';
import { cn } from '@/lib/utils';

const PixelStarIcon = ({ className, filled, ...props }) => (
  <svg
    width="16" // adjust size as needed
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("inline-block", className)} // ensure it behaves like an icon
    shapeRendering="crispEdges"
    // fill is controlled by parent classname (text-yellow-400 etc.)
    // use fill="currentcolor" to inherit color
    fill={props.fill || "currentColor"} // default to current color, allow override
    {...props}
  >
    {/* simple pixel star */}
    <path d="M8 1 L10 5 L15 6 L11 10 L12 15 L8 13 L4 15 L5 10 L1 6 L6 5 Z" />
  </svg>
);

export default PixelStarIcon;
