import React from 'react';
import { cn } from '@/lib/utils';

const PixelNotepadIcon = ({ className, ...props }) => (
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
    {/* pixel notepad with spiral */}
    {/* paper */}
    <path d="M4 4 V18 H16 V4 Z M5 5 H15 V17 H5 Z" fill="#D6EAF8" /> {/* pale blue paper */}
    {/* spiral */}
    <rect x="6" y="2" width="2" height="2" fill="#000000" />
    <rect x="9" y="2" width="2" height="2" fill="#000000" />
    <rect x="12" y="2" width="2" height="2" fill="#000000" />
     {/* lines (optional) */}
    <rect x="6" y="7" width="8" height="1" fill="#A9CCE3" /> {/* lighter blue line */}
    <rect x="6" y="10" width="8" height="1" fill="#A9CCE3" />
    <rect x="6" y="13" width="8" height="1" fill="#A9CCE3" />
  </svg>
);

export default PixelNotepadIcon;
