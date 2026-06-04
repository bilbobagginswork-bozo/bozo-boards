'use client'
export default function WaveDivider({ fill = '#2BD9C6', bg = 'transparent' }: { fill?: string; bg?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none" style={{ background: bg }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={fill}>
          <animate
            attributeName="d"
            dur="4s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
            values="
              M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z;
              M0,40 C180,0 360,80 540,40 C720,0 900,80 1080,40 C1260,0 1380,60 1440,40 L1440,80 L0,80 Z;
              M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z
            "
          />
        </path>
      </svg>
    </div>
  )
}
