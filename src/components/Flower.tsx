export default function Flower({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={className}>
      <g fill="currentColor">
        <ellipse cx="50" cy="30" rx="13" ry="20" />
        <ellipse cx="50" cy="30" rx="13" ry="20" transform="rotate(72 50 50)" />
        <ellipse
          cx="50"
          cy="30"
          rx="13"
          ry="20"
          transform="rotate(144 50 50)"
        />
        <ellipse
          cx="50"
          cy="30"
          rx="13"
          ry="20"
          transform="rotate(216 50 50)"
        />
        <ellipse
          cx="50"
          cy="30"
          rx="13"
          ry="20"
          transform="rotate(288 50 50)"
        />
        <circle cx="50" cy="50" r="9" fill="#fbbf24" />
      </g>
    </svg>
  );
}