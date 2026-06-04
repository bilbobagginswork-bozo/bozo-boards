export default function WaveDivider({ fill = '#2BD9C6', bg = 'transparent' }: { fill?: string; bg?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none" style={{ background: bg }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
