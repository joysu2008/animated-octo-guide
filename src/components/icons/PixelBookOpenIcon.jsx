import React from 'react';
import { cn } from '@/lib/utils';

const PixelBookOpenIcon = ({ className, ...props }) => (
  <svg
    width="20" // adjust size as needed
    height="16"
    viewBox="0 0 20 16"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("inline-block", className)} // ensure it behaves like an icon
    shapeRendering="crispEdges"
    fill="currentColor" // inherit color from parent
    {...props}
  >
    {/* pixel open book */}
    <path d="M2 1 V14 H9 V2 H4 V1 Z M11 2 V14 H18 V1 H16 V2 Z M4 4 H7 V5 H4 Z M4 7 H7 V8 H4 Z M13 4 H16 V5 H13 Z M13 7 H16 V8 H13 Z" />
  </svg>
);

export default PixelBookOpenIcon;
