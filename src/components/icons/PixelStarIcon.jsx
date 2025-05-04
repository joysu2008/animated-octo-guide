import React from 'react';
import { cn } from '@/lib/utils';

const PixelStarIcon = ({ className, filled, ...props }) => (
  <svg
    width="15" // adjust size as needed
    height="17"
    viewBox="0 0 15 17"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("inline-block", className)} // ensure it behaves like an icon
    shapeRendering="crispEdges"
    // fill is controlled by parent classname (text-yellow-400 etc.)
    // use fill="currentcolor" to inherit color
    fill={props.fill || "currentColor"} // default to current color, allow override
    {...props}
  >
    {/* simple pixel star */}
    <path d="M0 6H1V5H6V3H7V1H8V0H9V1H10V3H11V5H16V6H17V7H16V8H15V9H13V11H14V13H15V14H14V15H12V14H10V13H9V12 12H8V13H7V14H5V15H3V14H2V13H3V11H4V9H2V8H1V7H0V6Z" />
  </svg>
);

export default PixelStarIcon;
