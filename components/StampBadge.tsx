export default function StampBadge({ className = '' }: { className?: string }) {
  const text = 'SOUTH WEST UK • EST. 2024 • REPAIRS • SALES • '
  const r = 46
  const circumference = 2 * Math.PI * r

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer dashed ring */}
      <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
      {/* Inner ring */}
      <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="1" opacity="0.3"/>

      {/* Circular text path */}
      <defs>
        <path id="textcircle" d={`M 60,${60 - r} A ${r},${r} 0 1,1 ${60 - 0.001},${60 - r}`} />
      </defs>
      <text fontSize="8.5" fontWeight="700" letterSpacing="2.5" fill="currentColor" opacity="0.7"
        style={{ fontFamily: 'inherit', textTransform: 'uppercase' }}>
        <textPath href="#textcircle" startOffset="0%">{text}</textPath>
      </text>

      {/* Centre crosshair */}
      <line x1="54" y1="60" x2="66" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
      <line x1="60" y1="54" x2="60" y2="66" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.5"/>
    </svg>
  )
}
