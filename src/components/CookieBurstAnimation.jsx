'use client';

import React from 'react';

// simple svg representation of the pixel art cookie
const PixelCookieSVG = ({ className }) => (
  <svg
    width="32" // increased size for visibility
    height="32"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    shapeRendering="crispEdges" // ensures pixelated look
  >
    {/* define colors */}
    <defs>
      <linearGradient id="cookieGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#D2A679', stopOpacity: 1 }} /> {/* lighter brown */}
        <stop offset="100%" style={{ stopColor: '#B88A5F', stopOpacity: 1 }} /> {/* slightly darker brown */}
      </linearGradient>
      <radialGradient id="chipGradient">
         <stop offset="0%" style={{ stopColor: '#5C3D26', stopOpacity: 1 }} /> {/* dark chip center */}
         <stop offset="100%" style={{ stopColor: '#432C1C', stopOpacity: 1 }} /> {/* dark chip edge */}
       </radialGradient>
    </defs>

    {/* base cookie shape (approximated circle) */}
    <path d="M3,6 V10 H4 V11 H5 V12 H6 V13 H10 V12 H11 V11 H12 V10 H13 V6 H12 V5 H11 V4 H10 V3 H6 V4 H5 V5 H4 V6 Z" fill="url(#cookieGradient)" />

    {/* chocolate chips (approximated positions) */}
    <rect x="5" y="5" width="2" height="2" fill="url(#chipGradient)" />
    <rect x="9" y="4" width="1" height="2" fill="url(#chipGradient)" />
    <rect x="11" y="7" width="1" height="1" fill="url(#chipGradient)" />
    <rect x="8" y="8" width="2" height="2" fill="url(#chipGradient)" />
    <rect x="5" y="9" width="1" height="1" fill="url(#chipGradient)" />
    <rect x="11" y="10" width="1" height="1" fill="url(#chipGradient)" />
    <rect x="7" y="11" width="1" height="1" fill="url(#chipGradient)" />
  </svg>
);


const CookieBurstAnimation = () => {
  const numCookies = 15; // number of cookies to animate

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-50" // container covers the parent
      aria-hidden="true"
    >
      {Array.from({ length: numCookies }).map((_, index) => {
        // randomize animation properties for each cookie
        const duration = Math.random() * 2.0 + 2.5; // slower: 2.5s to 4.5s (was 1.5s to 3s)
        const delay = Math.random() * 0.5; // 0s to 0.5s delay
        const initialX = Math.random() * 100; // start position across the bottom (0% to 100%)
        // target position: move upwards and spread outwards
        const targetY = -(Math.random() * 50 + 50); // move up 50vh to 100vh
        const targetXVariance = (Math.random() - 0.5) * 100; // spread horizontally (-50vw to +50vw variance)

        return (
          <div
            key={index}
            className="absolute bottom-0 transform -translate-x-1/2 animate-cookie-burst"
            style={
              {
                left: `${initialX}%`,
                '--target-y': `${targetY}vh`,
                '--target-x-variance': `${targetXVariance}vw`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                animationTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // standard ease-out
                animationFillMode: 'forwards', // stay at the end state (faded out)
              }
            }
          >
            <PixelCookieSVG className="w-8 h-8 md:w-10 md:h-10" /> {/* use the svg */}
          </div>
        );
      })}
    </div>
  );
};

export default CookieBurstAnimation;
