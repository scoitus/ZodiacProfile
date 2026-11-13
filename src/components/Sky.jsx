import { WESTERN_SIGNS } from '../data/almanac';

// Small deterministic PRNG so the sky is identical on every render and visit.
function mulberry32(seed) {
    return () => {
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const rand = mulberry32(1203);
const STARS = Array.from({ length: 140 }, (_, id) => {
    const size = rand() < 0.85 ? 1 + rand() * 0.8 : 2 + rand() * 0.9;
    return {
        id,
        twinkle: rand() < 0.35,
        style: {
            left: `${(rand() * 100).toFixed(2)}%`,
            top: `${(rand() * 100).toFixed(2)}%`,
            width: `${size.toFixed(2)}px`,
            height: `${size.toFixed(2)}px`,
            opacity: (0.25 + rand() * 0.6).toFixed(2),
            '--o': (0.4 + rand() * 0.6).toFixed(2),
            '--dur': `${(3 + rand() * 5).toFixed(1)}s`,
            '--delay': `${(-rand() * 8).toFixed(1)}s`,
        },
    };
});

export function Sky() {
    return (
        <div className="sky" aria-hidden="true">
            {STARS.map((s) => (
                <span key={s.id} className={s.twinkle ? 'star star-twinkle' : 'star'} style={s.style} />
            ))}
        </div>
    );
}

const polar = (r, deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [300 + r * Math.cos(a), 300 + r * Math.sin(a)];
};

/** Decorative zodiac wheel that turns slowly behind the landing screen. */
export function ZodiacWheel({ className = '' }) {
    return (
        <svg viewBox="0 0 600 600" className={className} aria-hidden="true" fill="none" stroke="#e3c58a">
            <g className="wheel">
                <circle cx="300" cy="300" r="296" strokeOpacity="0.35" />
                <circle cx="300" cy="300" r="290" strokeOpacity="0.15" />
                <circle cx="300" cy="300" r="244" strokeOpacity="0.35" />
                <circle cx="300" cy="300" r="170" strokeOpacity="0.14" strokeDasharray="2 7" />
                {WESTERN_SIGNS.map((sign, i) => {
                    const [x1, y1] = polar(244, i * 30);
                    const [x2, y2] = polar(296, i * 30);
                    const [gx, gy] = polar(270, i * 30 + 15);
                    return (
                        <g key={sign.name}>
                            <line x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity="0.35" />
                            <text
                                x={gx} y={gy} className="glyph" fontSize="24" fill="#e3c58a" fillOpacity="0.7" stroke="none"
                                textAnchor="middle" dominantBaseline="central" transform={`rotate(${i * 30 + 15} ${gx} ${gy})`}
                            >
                                {sign.glyph}&#xFE0E;
                            </text>
                        </g>
                    );
                })}
                {Array.from({ length: 72 }, (_, i) => {
                    const [x1, y1] = polar(i % 6 === 0 ? 232 : 238, i * 5);
                    const [x2, y2] = polar(244, i * 5);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity="0.3" />;
                })}
            </g>
        </svg>
    );
}
