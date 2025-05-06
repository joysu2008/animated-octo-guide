
import React from 'react';
import { cn } from '@/lib/utils';

const PixelMinimizeIcon = ({ className, ...props }) => (
  <svg
    width="20" // adjust size as needed
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("inline-block", className)} // ensure it behaves like an icon
    shapeRendering="crispEdges"
    fill="currentColor" // inherit color from parent
    {...props}
  >
    {/* pixelated minimize/exit fullscreen icon (four arrows pointing inwards) */}
    {/* top-left arrow */}
    <path d="M6 3 H3 V6 H4 V5 H5 V4 H6 Z" />
    <path d="M6 6 H5 V5 H6 Z" />
    {/* top-right arrow */}
    <path d="M17 6 H14 V3 H15 V4 H16 V5 H17 Z" />
    <path d="M14 6 H15 V5 H14 Z" />
    {/* bottom-left arrow */}
    <path d="M6 17 H3 V14 H4 V15 H5 V16 H6 Z" />
    <path d="M6 14 H5 V15 H6 Z" />
    {/* bottom-right arrow */}
    <path d="M17 14 H14 V17 H15 V16 H16 V15 H17 Z" />
    <path d="M14 14 H15 V15 H14 Z" />
  </svg>
);

export default PixelMinimizeIcon;