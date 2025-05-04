import React from 'react';
import { cn } from '@/lib/utils';

const PixelTrashIcon = ({ className, ...props }) => (
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
    {/* pixel trash can */}
    <path d="M4 3 H12 V4 H13 V5 H3 V4 H4 Z M4 5 H12 V14 H4 Z M6 6 V12 H7 V6 Z M9 6 V12 H10 V6 Z" />
  </svg>
);

export default PixelTrashIcon;
