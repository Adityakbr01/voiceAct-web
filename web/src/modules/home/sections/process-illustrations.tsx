import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { color: string };

export function DiscoverArt({ color, ...p }: Props) {
  return (
    <svg viewBox="0 0 200 140" {...p}>
      {/* dotted map grid */}
      <g stroke="currentColor" strokeOpacity="0.15" strokeDasharray="2 4">
        <path d="M10 30 H190" />
        <path d="M10 70 H190" />
        <path d="M10 110 H190" />
        <path d="M60 10 V130" />
        <path d="M140 10 V130" />
      </g>
      {/* route */}
      <path
        className="p-illus-draw"
        d="M25 105 C 60 90, 70 40, 105 55 S 165 90, 175 30"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* pins */}
      <g fill={color}>
        <circle cx="25" cy="105" r="4" />
        <circle cx="105" cy="55" r="4" />
        <circle cx="175" cy="30" r="4" />
      </g>
      {/* magnifier */}
      <g transform="translate(120 80)">
        <circle r="18" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M13 13 L26 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle r="8" fill={color} fillOpacity="0.2" />
      </g>
    </svg>
  );
}

export function DesignArt({ color, ...p }: Props) {
  return (
    <svg viewBox="0 0 200 140" {...p}>
      {/* artboard */}
      <rect
        x="20"
        y="20"
        width="130"
        height="100"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <rect x="32" y="34" width="50" height="8" rx="2" fill={color} fillOpacity="0.7" />
      <rect x="32" y="48" width="80" height="6" rx="2" fill="currentColor" fillOpacity="0.25" />
      <rect x="32" y="60" width="60" height="6" rx="2" fill="currentColor" fillOpacity="0.25" />
      <rect x="32" y="78" width="34" height="28" rx="4" fill={color} fillOpacity="0.25" />
      <rect x="72" y="78" width="34" height="28" rx="4" fill="currentColor" fillOpacity="0.15" />
      {/* pen tool line */}
      <path
        className="p-illus-draw"
        d="M20 118 C 60 90, 110 130, 160 70"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* pencil */}
      <g transform="translate(155 60) rotate(35)">
        <rect x="0" y="-4" width="30" height="8" rx="1.5" fill={color} />
        <polygon points="30,-4 40,0 30,4" fill="currentColor" />
        <rect x="-6" y="-4" width="6" height="8" fill="currentColor" fillOpacity="0.5" />
      </g>
    </svg>
  );
}

export function BuildArt({ color, ...p }: Props) {
  return (
    <svg viewBox="0 0 200 140" {...p}>
      <rect
        x="20"
        y="20"
        width="160"
        height="100"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <g fill="currentColor" fillOpacity="0.4">
        <circle cx="32" cy="32" r="3" />
        <circle cx="42" cy="32" r="3" />
        <circle cx="52" cy="32" r="3" />
      </g>
      {/* code brackets */}
      <g stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path className="p-illus-draw" d="M72 55 L58 75 L72 95" />
        <path className="p-illus-draw" d="M128 55 L142 75 L128 95" />
        <path className="p-illus-draw" d="M92 100 L108 50" />
      </g>
      {/* typing dots */}
      <g fill={color}>
        <circle cx="82" cy="110" r="2.5">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="110" r="2.5">
          <animate
            attributeName="opacity"
            values="0.2;1;0.2"
            dur="1.2s"
            begin="0.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="118" cy="110" r="2.5">
          <animate
            attributeName="opacity"
            values="0.2;1;0.2"
            dur="1.2s"
            begin="0.4s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}

export function LaunchArt({ color, ...p }: Props) {
  return (
    <svg viewBox="0 0 200 140" {...p}>
      {/* stars */}
      <g fill="currentColor" fillOpacity="0.4">
        <circle cx="30" cy="30" r="1.5" />
        <circle cx="60" cy="18" r="1" />
        <circle cx="170" cy="40" r="1.5" />
        <circle cx="150" cy="20" r="1" />
        <circle cx="185" cy="80" r="1" />
      </g>
      {/* trajectory */}
      <path
        className="p-illus-draw"
        d="M20 125 C 60 110, 90 90, 110 65"
        fill="none"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeDasharray="3 4"
        strokeLinecap="round"
      />
      {/* rocket */}
      <g transform="translate(105 55) rotate(-35)">
        <path d="M0 -22 C 8 -14, 8 6, 0 14 C -8 6, -8 -14, 0 -22 Z" fill={color} />
        <circle cy="-6" r="4" fill="#0a0a0a" />
        <path d="M-6 6 L-14 14 L-4 12 Z" fill="currentColor" fillOpacity="0.6" />
        <path d="M6 6 L14 14 L4 12 Z" fill="currentColor" fillOpacity="0.6" />
        {/* flame */}
        <path d="M-4 14 Q 0 30 4 14 Z" fill="#F38020">
          <animate
            attributeName="d"
            values="M-4 14 Q 0 30 4 14 Z;M-4 14 Q 0 24 4 14 Z;M-4 14 Q 0 30 4 14 Z"
            dur="0.35s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
}

export function IterateArt({ color, ...p }: Props) {
  return (
    <svg viewBox="0 0 200 140" {...p}>
      <g transform="translate(100 70)">
        {/* outer orbit */}
        <circle
          r="48"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeDasharray="2 5"
        />
        {/* refresh arrows */}
        <g fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path className="p-illus-draw" d="M -34 -6 A 34 34 0 0 1 30 -14" />
          <path d="M 22 -22 L 30 -14 L 22 -6" fill={color} />
          <path className="p-illus-draw" d="M 34 6 A 34 34 0 0 1 -30 14" />
          <path d="M -22 22 L -30 14 L -22 6" fill={color} />
        </g>
        {/* core */}
        <circle r="8" fill={color} />
        <circle r="8" fill="none" stroke={color} strokeOpacity="0.4">
          <animate attributeName="r" values="8;18;8" dur="2.4s" repeatCount="indefinite" />
          <animate
            attributeName="stroke-opacity"
            values="0.6;0;0.6"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}

export const illustrations = [DiscoverArt, DesignArt, BuildArt, LaunchArt, IterateArt];
