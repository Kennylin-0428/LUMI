const PROMISES = [
  ['CHOSEN WITH CARE', '認真挑選', '我們想挑選的，是孩子喜歡、大人也樂意搭配的鞋款。從外型到小細節，都多看一眼。'],
  ['A LITTLE GUIDANCE', '把選鞋說清楚', '整理款式特色與尺寸參考，希望讓你挑選時，多一點依據，少一點猜測。'],
  ['FOR EVERYDAY MOMENTS', '陪伴平常日子', '不一定要等到特別的日子。希望喜歡的鞋，也能成為出門散步、見朋友時的小小開心。'],
];

function PromiseDrawing({ index }) {
  return (
    <svg viewBox="0 0 200 140" fill="none" aria-hidden="true">
      <circle cx="100" cy="70" r="54" fill="currentColor" opacity=".07" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {index === 0 && (
          <>
            <path d="M49 65Q48 52 61 51L78 70Q90 80 107 72L127 66Q147 64 154 83Q158 99 138 102H63Q47 100 50 84Z" fill="#f8d4df" />
            <path d="M50 84Q48 66 61 58L78 76L73 92L51 92Z" fill="#b9dced" stroke="#8bb6cc" />
            <path d="M127 74Q147 70 154 85L153 92L126 95Q118 82 127 74Z" fill="#ffe5a4" stroke="#d5b77d" />
            <path d="M51 92Q104 100 153 89L149 98Q104 109 60 101Q53 100 51 92Z" fill="#d8e7cb" stroke="#a7bb99" />
            <path d="M68 63L79 75M77 61L88 73" stroke="#d08da6" strokeWidth="4" />
            <circle cx="91" cy="87" r="3" fill="#fff6d9" stroke="none" />
            <circle cx="119" cy="57" r="19" fill="#eaf6fc" fillOpacity=".95" stroke="#8bb6cc" />
            <circle cx="119" cy="57" r="14" stroke="#b0cfde" strokeWidth="1" />
            <path d="M133 71L147 85" strokeWidth="7" />
            <path d="M133 71L147 85" stroke="#f4cf83" strokeWidth="3.5" />
            <path d="M110 58L116 63L127 51" stroke="#92b394" />
            <path d="M60 27L63 34L71 35L65 40L67 47L60 43L53 47L55 40L49 35L57 34Z" fill="#ffe5a4" stroke="#d5b77d" />
            <circle cx="155" cy="49" r="4" fill="#b9dced" stroke="none" />
            <circle cx="42" cy="77" r="3" fill="#efb5c7" stroke="none" />
            <path d="M81 29L85 25M156 105L161 109" stroke="#a7bb99" strokeWidth="3" />
            <path d="M70 108Q99 119 130 108" opacity=".5" />
          </>
        )}
        {index === 1 && (
          <>
            <rect x="60" y="34" width="73" height="77" rx="12" fill="#fffaf0" transform="rotate(-6 96 72)" />
            <rect x="79" y="28" width="29" height="12" rx="6" fill="#f3d1dc" />
            <path d="M75 57L79 61L86 53M92 57H115M75 76L79 80L86 72M92 76H111" />
            <rect x="104" y="88" width="47" height="17" rx="5" fill="#f3d9b5" transform="rotate(-20 127 96)" />
            <path d="M114 94L116 99M123 91L125 96M132 88L134 93" />
          </>
        )}
        {index === 2 && (
          <>
            <path d="M39 111Q71 91 103 106Q131 117 164 101" strokeDasharray="2 6" />
            <circle cx="142" cy="35" r="10" fill="#ffe8b7" />
            <path d="M138 33V34M146 33V34M139 38Q142 41 145 38" stroke="#b99560" strokeWidth="1.3" />
            <ellipse cx="135" cy="37" rx="2" ry="1.3" fill="#efaeb6" stroke="none" />
            <ellipse cx="149" cy="37" rx="2" ry="1.3" fill="#efaeb6" stroke="none" />
            <path d="M142 18V14M155 23L159 19M160 35H165M129 23L125 19" stroke="#d7b67d" />
            <path d="M44 48Q41 38 51 36Q52 25 63 28Q71 28 73 38Q85 38 82 48Z" fill="#fffdf9" stroke="#bed4df" />
            <path d="M61 77Q60 65 71 64L84 78Q94 84 105 78L119 74Q137 72 143 87Q147 101 130 104H73Q58 102 60 90Z" fill="#f6d1dc" />
            <path d="M61 82Q59 70 71 67L84 81L78 96L62 95Z" fill="#bcddeb" />
            <path d="M120 78Q137 76 143 90L141 98L121 100Q114 87 120 78Z" fill="#ffe4a4" stroke="#d2b684" />
            <path d="M62 95Q100 101 143 93L139 101Q103 111 72 103Q64 102 62 95Z" fill="#d4e6c5" stroke="#a5b99a" />
            <path d="M75 73L84 83M83 71L92 81" stroke="#d596ad" strokeWidth="3" />
            <path d="M96 88Q99 91 102 88" stroke="#c38b9c" strokeWidth="1.3" />
            <path d="M43 105V93M43 99L37 95M43 102L49 97M158 99V87M158 93L153 89M158 96L163 91" stroke="#a5b99a" />
            {[{ x: 43, y: 91, color: '#f4bacd' }, { x: 158, y: 85, color: '#c6d9f1' }].map(({ x, y, color }) => (
              <g key={x} strokeWidth=".8">
                {[0, 72, 144, 216, 288].map((angle) => (
                  <ellipse key={angle} cx={x} cy={y - 4} rx="2.8" ry="4" transform={`rotate(${angle} ${x} ${y})`} fill={color} />
                ))}
                <circle cx={x} cy={y} r="2.3" fill="#ffe6a8" stroke="none" />
              </g>
            ))}
            <circle cx="97" cy="42" r="2.5" fill="#f3b6c8" stroke="none" />
            <path d="M109 49C102 42 97 51 109 57C121 51 116 42 109 49Z" fill="#efbdce" stroke="none" />
          </>
        )}
        <path d="M43 39V49M38 44H48M159 83V91M155 87H163" opacity=".6" />
      </g>
    </svg>
  );
}

export default function PromiseCards() {
  return (
    <div className="series-details promise-details">
      {PROMISES.map(([label, title, desc], index) => (
        <article className="series-detail" key={title}>
          <div className="series-detail-top">
            <span className="series-detail-number">0{index + 1}</span>
            <span className="series-detail-label">{label}</span>
          </div>
          <div className="series-detail-art"><PromiseDrawing index={index} /></div>
          <h3>{title}</h3>
          <p>{desc}</p>
          <span className="series-detail-signature" aria-hidden="true">LUMI · with a little care</span>
        </article>
      ))}
    </div>
  );
}
