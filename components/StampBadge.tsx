export default function StampBadge({ className = '' }: { className?: string }) {
  const r = 44
  const cx = 60
  const cy = 60

  // Full circle path starting from top, going clockwise
  const topX = cx
  const topY = cy - r
  const botX = cx
  const botY = cy + r

  // Two semicircles to form a full circle (SVG can't do a single-arc full circle)
  const pathD = `M ${topX},${topY} A ${r},${r} 0 0,1 ${botX},${botY} A ${r},${r} 0 0,1 ${topX},${topY}`

  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer dashed ring */}
      <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
      {/* Inner ring */}
      <circle cx="60" cy="60" r="36" stroke="currentColor" strokeWidth="1" opacity="0.3"/>

      {/* Circular text */}
      <defs>
        <path id="tc" d={pathD} />
      </defs>
      <text fontSize="7.5" fontWeight="800" letterSpacing="2.8" fill="currentColor" opacity="0.85"
        style={{ fontFamily: 'inherit' }}>
        <textPath href="#tc" startOffset="5%">SW UK · EST 2024 · REPAIRS · SALES</textPath>
      </text>

      {/* Centre crosshair */}
      <line x1="54" y1="60" x2="66" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
      <line x1="60" y1="54" x2="60" y2="66" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.5"/>
    </svg>
  )
}
