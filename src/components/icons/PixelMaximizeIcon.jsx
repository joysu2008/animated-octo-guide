
import React from 'react';
import { cn } from '@/lib/utils';

const PixelMaximizeIcon = ({ className, ...props }) => (
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
    {/* pixelated maximize/fullscreen icon (four arrows pointing outwards) */}
    {/* top-left arrow */}
    <path d="M3 6 H6 V5 H5 V4 H4 V3 H3 Z" />
    <path d="M3 3 H4 V4 H3 Z" />
    {/* top-right arrow */}
    <path d="M14 3 H17 V6 H16 V5 H15 V4 H14 Z" />
    <path d="M16 3 H17 V4 H16 Z" />
    {/* bottom-left arrow */}
    <path d="M3 14 H6 V17 H5 V16 H4 V15 H3 Z" />
    <path d="M3 16 H4 V17 H3 Z" />
    {/* bottom-right arrow */}
    <path d="M14 17 H17 V14 H16 V15 H15 V16 H14 Z" />
    <path d="M16 16 H17 V17 H16 Z" />
  </svg>
);

export default PixelMaximizeIcon;
