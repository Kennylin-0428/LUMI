const LABELS = {
  baby: ['PLAYFUL LITTLE DETAILS', 'EASY ON & OFF', 'PLAYFUL PALETTE'],
  princess: ['FLORAL DETAILS', 'ELEGANT SILHOUETTE', 'SWEET PALETTE'],
};

function LittleFace({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="-10" cy="4" rx="4" ry="2.5" fill="#efaeb6" stroke="none" opacity=".65" />
      <ellipse cx="10" cy="4" rx="4" ry="2.5" fill="#efaeb6" stroke="none" opacity=".65" />
      <path d="M-5 0V1M5 0V1M-3 5Q0 8 3 5" />
    </g>
  );
}

function DetailDrawing({ seriesKey, index }) {
  const princess = seriesKey === 'princess';
  return (
    <svg viewBox="0 0 200 140" fill="none" aria-hidden="true">
      {princess && index === 2 && (
        <defs>
          <linearGradient id="princess-pearl-swatch" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fffdfb" />
            <stop offset=".45" stopColor="#f5f2f5" />
            <stop offset=".65" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e3e4ee" />
          </linearGradient>
        </defs>
      )}
      <circle cx="100" cy="70" r="54" fill="currentColor" opacity=".07" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {index === 0 && (princess ? (
          <g stroke="#ce8e9f" strokeWidth="1.2">
            <path d="M71 115Q43 99 51 72M129 115Q157 99 149 72" />
            <path d="M53 95Q39 89 43 81Q54 82 53 95M50 81Q39 71 46 64Q56 69 50 81M147 95Q161 89 157 81Q146 82 147 95M150 81Q161 71 154 64Q144 69 150 81" fill="#f9dfe5" />
            <path d="M83 30L79 16L91 23L100 10L109 23L121 16L117 30Z" fill="#f7cad7" />
            <path d="M85 34H115M90 28H110" />
            {[79, 100, 121].map((x) => <circle key={x} cx={x} cy={x === 100 ? 9 : 15} r="2.3" fill="#fffaf1" />)}
            <path d="M92 80L78 113L91 108L98 118L105 86M108 80L122 113L109 108L102 118L95 86" fill="#fce0e6" />
            <path d="M96 71C77 49 54 44 57 64C49 85 70 97 96 82ZM104 71C123 49 146 44 143 64C151 85 130 97 104 82Z" fill="#f7c6d3" />
            <path d="M91 72Q72 54 62 59Q60 72 88 77M109 72Q128 54 138 59Q140 72 112 77" fill="#fff0f3" strokeWidth=".8" />
            <path d="M62 79Q75 88 91 80M138 79Q125 88 109 80M87 99L91 88M113 99L109 88" stroke="#dfa3b2" strokeWidth=".8" />
            <ellipse cx="100" cy="79" rx="9" ry="12" fill="#f0b6c6" />
            {[70, 78, 86].map((y) => (
              <g key={y}>
                <circle cx="100" cy={y} r="3.8" fill="#fffdfb" stroke="#e5c7ce" strokeWidth=".7" />
                <circle cx="99" cy={y - 1} r="1.1" fill="white" stroke="none" />
              </g>
            ))}
            <path d="M100 115V122M96 119H104" />
          </g>
        ) : (
          <>
            <path d="M54 62Q53 48 67 48L82 68Q93 76 106 70L126 64Q146 61 154 81Q159 99 139 102H64Q48 100 51 85Z" fill="#d6e9f4" />
            <path d="M53 91Q104 99 154 87M105 78L108 84L115 85L110 90L111 97L105 94L99 97L100 90L95 85L102 84Z" />
            <LittleFace x={78} y={80} />
            <path d="M65 26L68 33L76 34L70 39L72 47L65 43L58 47L60 39L54 34L62 33Z M137 40Q147 29 152 38Q156 45 140 53Q126 44 132 39Q135 37 137 40Z" fill="#ffe7b0" />
          </>
        ))}
        {index === 1 && (princess ? (
          <>
            <path d="M49 62Q51 48 63 48L78 70Q91 82 108 71L124 60Q148 55 157 76Q164 94 141 100H61Q46 97 49 82Z" fill="#f5d4e0" />
            <path d="M51 88Q99 96 157 85M57 100V106H73V101M113 70Q138 68 143 86" />
            <LittleFace x={128} y={79} />
            <path d="M79 68Q65 48 74 45Q87 43 89 61Q102 47 108 54Q112 64 91 68Z" fill="#fff0c9" />
            <circle cx="89" cy="66" r="4" fill="#fff8eb" />
            <path d="M88 39V54M81 46H95M135 29V39M130 34H140" opacity=".6" />
          </>
        ) : (
          <>
            <path d="M55 70L63 54L83 71Q94 79 108 72L127 66Q148 64 154 84Q157 100 138 103H64Q49 101 52 85Z" fill="#d6e9f4" />
            <ellipse cx="77" cy="66" rx="12" ry="6" transform="rotate(38 77 66)" fill="#b4d0e4" />
            <LittleFace x={125} y={82} />
            <path d="M53 92Q102 100 154 89M81 30V49M74 42L81 49L88 42M112 45Q127 30 143 43M143 43L134 42M143 43L142 34" />
          </>
        ))}
      </g>
      {index === 2 && (princess ? ['url(#princess-pearl-swatch)', '#e8b6c8'] : ['#caba9f', '#a8cbe2', '#e9b2c1', '#f4ead6']).map((color, n, colors) => (
        <rect key={color} x={100 - colors.length * 17 + n * 34} y={44 + (n % 2) * 14} width="39" height="52" rx="19" fill={color} stroke="white" strokeWidth="3" transform={`rotate(${n % 2 ? 12 : -12} ${119 - colors.length * 17 + n * 34} 70)`} />
      ))}
      {index < 2 && (
        <g fill={princess ? '#efc0cf' : '#b9d8e9'}>
          <path d="M36 53C27 43 19 56 36 65C53 56 45 43 36 53Z" />
          <circle cx="164" cy="106" r="4" />
          <circle cx="45" cy="84" r="2.5" />
        </g>
      )}
      <path d="M155 24V34M150 29H160M41 108V116M37 112H45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}

export default function SeriesDetails({ seriesKey, features }) {
  return (
    <div className={`series-details ${seriesKey}`}>
      {features.map(([, title, desc], index) => (
        <article className="series-detail" key={title}>
          <div className="series-detail-top">
            <span className="series-detail-number">0{index + 1}</span>
            <span className="series-detail-label">{LABELS[seriesKey][index]}</span>
          </div>
          <div className="series-detail-art"><DetailDrawing seriesKey={seriesKey} index={index} /></div>
          <h3>{title}</h3>
          <p>{desc}</p>
          <span className="series-detail-signature" aria-hidden="true">LUMI · little lovely details</span>
        </article>
      ))}
    </div>
  );
}
