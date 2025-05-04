import React from 'react';
import { cn } from '@/lib/utils';

const PixelPlayIcon = ({ className, ...props }) => (
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
    {/* simple pixel triangle */}
    <path d="M4 3 V13 L12 8 Z" />
  </svg>
);

export default PixelPlayIcon;
