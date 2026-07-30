interface MiyuCatProps {
  opacity?: number
  width?:   number
  height?:  number
}

export default function MiyuCat({ opacity = 0.28, width = 190, height = 230 }: MiyuCatProps) {
  return (
    <svg
      width={width} height={height}
      viewBox="0 0 190 230"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, filter: 'blur(0.3px)', display: 'block' }}
    >
      <polygon points="48,72 28,22 78,58"   fill="#F7C46A" />
      <polygon points="142,72 162,22 112,58" fill="#F7C46A" />
      <polygon points="52,66 38,34 72,58"   fill="#E8736A" opacity="0.45" />
      <polygon points="138,66 152,34 118,58" fill="#E8736A" opacity="0.45" />
      <ellipse cx="95" cy="92" rx="44" ry="40" fill="#F7C46A" />
      <path d="M76 88 Q82 82 88 88" stroke="#1A0F00" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M102 88 Q108 82 114 88" stroke="#1A0F00" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="95" cy="98" rx="3.5" ry="2.2" fill="#E8736A" opacity="0.65" />
      <path d="M91,101 Q95,104 99,101" stroke="#1A0F00" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
      <line x1="58" y1="96"  x2="80"  y2="99"  stroke="#1A0F00" strokeWidth="0.9" opacity="0.22" />
      <line x1="58" y1="102" x2="80"  y2="102" stroke="#1A0F00" strokeWidth="0.9" opacity="0.22" />
      <line x1="110" y1="99"  x2="132" y2="96"  stroke="#1A0F00" strokeWidth="0.9" opacity="0.22" />
      <line x1="110" y1="102" x2="132" y2="102" stroke="#1A0F00" strokeWidth="0.9" opacity="0.22" />
      <ellipse cx="95" cy="182" rx="52" ry="45" fill="#F7C46A" />
      <rect x="78" y="126" width="34" height="24" rx="8" fill="#F7C46A" />
      <path d="M142,200 C178,188 190,150 172,126 C163,114 151,128 162,140 C171,150 167,182 142,195" fill="#F7C46A" />
      <ellipse cx="73"  cy="221" rx="19" ry="9.5" fill="#F7C46A" />
      <ellipse cx="117" cy="221" rx="19" ry="9.5" fill="#F7C46A" />
      <ellipse cx="66" cy="223" rx="4" ry="2.5" fill="#1A0F00" opacity="0.1" />
      <ellipse cx="73" cy="224" rx="4" ry="2.5" fill="#1A0F00" opacity="0.1" />
      <ellipse cx="80" cy="223" rx="4" ry="2.5" fill="#1A0F00" opacity="0.1" />
      <path d="M89,167 C89,163.5 92.5,161 95,164.5 C97.5,161 101,163.5 101,167 C101,171.5 95,176 95,176 C95,176 89,171.5 89,167Z" fill="#E8736A" opacity="0.75" />
      <path d="M74,132 Q95,126 116,132" stroke="#E8736A" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
      <circle cx="95" cy="131" r="4" fill="#F2A93B" opacity="0.6" />
    </svg>
  )
}