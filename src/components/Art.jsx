import { CONSTELLATIONS } from '../data/constellations';

/** Sun-sign medallion: the constellation drawn inside a gilded ring. */
export function Constellation({ sign, color, className = '' }) {
    const { stars, paths } = CONSTELLATIONS[sign.name];
    // Constellations live in a 100-unit box; centre it in the 200-unit medallion.
    const at = ([x, y]) => [38 + x * 1.24, 34 + y * 1.24];

    return (
        <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`The constellation ${sign.name}`}>
            <defs>
                <radialGradient id="medallion-fill">
                    <stop offset="0" stopColor={color} stopOpacity="0.2" />
                    <stop offset="0.7" stopColor={color} stopOpacity="0.04" />
                    <stop offset="1" stopColor={color} stopOpacity="0" />
                </radialGradient>
                <radialGradient id="star-glow">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
                    <stop offset="0.3" stopColor={color} stopOpacity="0.45" />
                    <stop offset="1" stopColor={color} stopOpacity="0" />
                </radialGradient>
            </defs>

            <circle cx="100" cy="100" r="98" fill="url(#medallion-fill)" />
            <circle cx="100" cy="100" r="98" fill="none" stroke="#e3c58a" strokeOpacity="0.55" />
            <circle cx="100" cy="100" r="92" fill="none" stroke="#e3c58a" strokeOpacity="0.2" strokeDasharray="1 5" />

            <g fill="none" stroke="#f4eee1" strokeOpacity="0.55" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
                {paths.map((path, i) => (
                    <polyline key={i} className="draw" pathLength="1" points={path.map((s) => at(stars[s]).join(',')).join(' ')} />
                ))}
            </g>

            {stars.map((star, i) => {
                const [x, y] = at(star);
                const bright = Boolean(star[2]);
                return (
                    <g key={i} className="pop" style={{ '--d': `${0.3 + i * 0.07}s` }}>
                        <circle cx={x} cy={y} r={bright ? 11 : 7} fill="url(#star-glow)" />
                        <circle cx={x} cy={y} r={bright ? 2.6 : 1.7} fill="#fff" />
                    </g>
                );
            })}
        </svg>
    );
}

/** Faceted gemstone tinted with the birthstone's colour. */
export function Gem({ color, className = '' }) {
    const facets = [
        ['32,22 68,22 64,42 36,42', 0.5],
        ['32,22 36,42 12,42', 0.8],
        ['68,22 88,42 64,42', 0.62],
        ['12,42 36,42 50,90', 0.95],
        ['36,42 64,42 50,90', 0.72],
        ['64,42 88,42 50,90', 0.45],
    ];
    return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true" style={{ filter: `drop-shadow(0 0 14px ${color}66)` }}>
            {facets.map(([points, opacity]) => (
                <polygon key={points} points={points} fill={color} fillOpacity={opacity} stroke="#fff" strokeOpacity="0.5" strokeWidth="0.6" strokeLinejoin="round" />
            ))}
            <polygon points="32,22 68,22 64,42 36,42" fill="#fff" fillOpacity="0.28" />
            <polygon points="38,25 50,25 46,38 40,38" fill="#fff" fillOpacity="0.4" />
        </svg>
    );
}

/** Stylised bloom: two rings of petals around a gilded centre. */
export function Bloom({ color, petals, className = '' }) {
    const rx = Math.max(4, Math.min(13, 96 / petals));
    const step = 360 / petals;
    const ring = (offset) => Array.from({ length: petals }, (_, i) => i * step + offset);
    return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true" style={{ filter: `drop-shadow(0 0 14px ${color}55)` }}>
            {ring(0).map((angle) => (
                <ellipse key={angle} cx="50" cy="27" rx={rx} ry="21" fill={color} fillOpacity="0.45" stroke={color} strokeWidth="0.7" transform={`rotate(${angle} 50 50)`} />
            ))}
            {ring(step / 2).map((angle) => (
                <ellipse key={angle} cx="50" cy="35" rx={rx * 0.7} ry="13" fill={color} fillOpacity="0.75" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.5" transform={`rotate(${angle} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="7" fill="#e3c58a" />
            <circle cx="50" cy="50" r="3.2" fill="#a98443" />
        </svg>
    );
}

/** Round seal carrying the animal's Chinese character. */
export function Seal({ hanzi, className = '' }) {
    return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true" style={{ filter: 'drop-shadow(0 0 14px #e3c58a44)' }}>
            <circle cx="50" cy="50" r="46" fill="#c8402f" fillOpacity="0.16" stroke="#e3c58a" strokeOpacity="0.7" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e3c58a" strokeOpacity="0.3" strokeDasharray="1 4" />
            <text x="50" y="52" fontSize="46" fill="#f3e3bd" textAnchor="middle" dominantBaseline="central" lang="zh-Hant" style={{ fontFamily: '"Songti TC", "Noto Serif CJK TC", "Noto Serif TC", "PMingLiU", serif' }}>
                {hanzi}
            </text>
        </svg>
    );
}

/** Tarot card that flips face-up as the reading appears. */
export function TarotCard({ numeral, name }) {
    const rays = Array.from({ length: 24 }, (_, i) => i * 15);
    return (
        <div className="tarot" role="img" aria-label={`Tarot card: ${name}`}>
            <div className="tarot-inner">
                <div className="tarot-face tarot-back">
                    <svg viewBox="0 0 100 160" className="h-full w-full" aria-hidden="true">
                        <circle cx="50" cy="80" r="20" fill="#0a0c26" stroke="#e3c58a" strokeOpacity="0.6" />
                        <path d="M50 64c1 9.500 6.500 15 16 16-9.500 1-15 6.500-16 16-1-9.500-6.500-15-16-16 9.500-1 15-6.500 16-16z" fill="#e3c58a" />
                    </svg>
                </div>
                <div className="tarot-face flex flex-col items-center justify-between px-3 py-5 text-center">
                    <div className="font-display text-2xl leading-none text-gold-300">{numeral}</div>
                    <svg viewBox="0 0 100 100" className="w-[78%]" aria-hidden="true">
                        {rays.map((angle, i) => (
                            <line key={angle} x1="50" y1={i % 2 ? 14 : 6} x2="50" y2="26" stroke="#e3c58a" strokeOpacity={i % 2 ? 0.45 : 0.85} strokeWidth="0.9" strokeLinecap="round" transform={`rotate(${angle} 50 50)`} />
                        ))}
                        <circle cx="50" cy="50" r="19" fill="none" stroke="#e3c58a" strokeOpacity="0.8" />
                        <path d="M50 35c1 9 5.500 14 15 15-9.500 1-14 6-15 15-1-9-5.500-14-15-15 9.500-1 14-6 15-15z" fill="#f3e3bd" />
                    </svg>
                    <div className="font-display text-[1.05rem] font-medium leading-tight text-ivory">{name}</div>
                </div>
            </div>
        </div>
    );
}
