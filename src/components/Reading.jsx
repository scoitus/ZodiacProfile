import { ELEMENT_COLORS, MONTH_NAMES } from '../data/almanac';
import { Constellation, Gem, Bloom, Seal, TarotCard } from './Art';

const shortDate = ([month, day]) => `${MONTH_NAMES[month - 1].slice(0, 3)} ${day}`;
const article = (word) => (/^[aeiou]/i.test(word) ? 'an' : 'a');

function Traits({ items }) {
    return (
        <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[0.9375rem] text-mist">
            {items.map((trait, i) => (
                <li key={trait} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-gold-400/70" />}
                    {trait}
                </li>
            ))}
        </ul>
    );
}

function Card({ eyebrow, title, art, delay, children }) {
    return (
        <section className="panel reveal flex flex-col items-center p-6 text-center sm:p-7" style={{ '--d': delay }}>
            <div className="mb-5 size-24">{art}</div>
            <p className="eyebrow mb-2">{eyebrow}</p>
            <h3 className="font-display text-[1.75rem] font-medium leading-tight text-ivory">{title}</h3>
            <div className="mt-3 space-y-3">{children}</div>
        </section>
    );
}

export default function Reading({ data, onReset, headingRef }) {
    const { date, western, chinese, stone, flower, lifePath, tarot } = data;
    const elementColor = ELEMENT_COLORS[western.element];
    const [m, d, y] = lifePath.parts;

    return (
        <article className="mx-auto w-full max-w-5xl">
            <header className="reveal mb-8 text-center sm:mb-10">
                <p className="eyebrow mb-3">Your reading</p>
                <h1 ref={headingRef} tabIndex={-1} className="font-display text-4xl font-medium leading-tight text-ivory outline-none sm:text-5xl">
                    {date.label}
                </h1>
                <p className="mt-2 font-display text-xl italic text-mist">born on {article(date.weekday)} {date.weekday}</p>
            </header>

            {/* Sun sign */}
            <section className="panel reveal overflow-hidden p-6 sm:p-10" style={{ '--d': '0.1s' }}>
                <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
                    <div className="relative w-56 shrink-0 sm:w-64">
                        <Constellation sign={western} color={elementColor} className="w-full" />
                        <span
                            aria-hidden="true"
                            className="glyph absolute -bottom-3 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-gold-300/60 bg-night-900 text-xl text-gold-300"
                        >
                            {western.glyph}&#xFE0E;
                        </span>
                    </div>

                    <div className="text-center md:text-left">
                        <p className="eyebrow mb-2">Sun sign · {western.symbol}</p>
                        <h2 className="gilded font-display text-6xl font-medium leading-none sm:text-7xl">{western.name}</h2>
                        <p className="mt-3 text-[0.9375rem] tracking-wide text-mist">
                            {shortDate(western.from)} – {shortDate(western.until)}
                        </p>
                        <p className="mt-5 max-w-xl font-display text-[1.375rem] leading-snug text-ivory/90">{western.blurb}</p>
                        <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                            <span className="chip">
                                <span>Element</span>
                                <span className="flex items-center gap-2">
                                    <span aria-hidden="true" className="size-2 rounded-full" style={{ background: elementColor }} />
                                    {western.element}
                                </span>
                            </span>
                            <span className="chip"><span>Quality</span>{western.modality}</span>
                            <span className="chip"><span>Ruled by</span>{western.ruler}</span>
                        </div>
                        <div className="mt-5 flex justify-center md:justify-start">
                            <Traits items={western.traits} />
                        </div>
                        {western.cuspWith && (
                            <p className="mt-5 max-w-xl border-l border-gold-300/40 pl-4 text-left text-[0.9375rem] leading-relaxed text-mist">
                                Born on the cusp. The Sun changes sign at a slightly different moment each year, so depending on
                                your birth time and place you may be {article(western.cuspWith)} {western.cuspWith}.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
                <Card
                    eyebrow="Chinese zodiac" delay="0.25s"
                    title={`${chinese.element} ${chinese.animal.name}`}
                    art={<Seal hanzi={chinese.animal.hanzi} className="size-full" />}
                >
                    <Traits items={chinese.animal.traits} />
                    <p className="text-[0.9375rem] leading-relaxed text-mist">
                        {chinese.polarity} year of the {chinese.animal.name}
                        {chinese.beforeNewYear && chinese.newYear && (
                            <>. You were born before Lunar New Year ({shortDate(chinese.newYear)}), so you belong to {chinese.year}</>
                        )}
                        .
                    </p>
                </Card>

                <Card eyebrow="Birthstone" title={stone.name} delay="0.35s" art={<Gem color={stone.color} className="size-full" />}>
                    <p className="font-display text-xl italic leading-snug text-ivory/85">{stone.meaning}</p>
                    <p className="text-[0.9375rem] text-mist">The stone of {MONTH_NAMES[date.month - 1]}</p>
                </Card>

                <Card eyebrow="Birth flower" title={flower.name} delay="0.45s" art={<Bloom color={flower.color} petals={flower.petals} className="size-full" />}>
                    <p className="font-display text-xl italic leading-snug text-ivory/85">{flower.meaning}</p>
                    <p className="text-[0.9375rem] text-mist">The bloom of {MONTH_NAMES[date.month - 1]}</p>
                </Card>
            </div>

            {/* Tarot */}
            <section className="panel reveal mt-5 p-6 sm:p-10" style={{ '--d': '0.55s' }}>
                <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
                    <TarotCard numeral={tarot.numeral} name={tarot.name} />
                    <div className="text-center md:text-left">
                        <p className="eyebrow mb-2">Tarot birth card</p>
                        <h2 className="font-display text-4xl font-medium leading-tight text-ivory sm:text-5xl">{tarot.name}</h2>
                        <p className="mt-4 max-w-xl font-display text-[1.375rem] italic leading-snug text-ivory/90">{tarot.desc}</p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            <span className="chip">
                                <span>Life path</span>
                                <span className="font-display text-lg font-semibold leading-none text-gold-200">{lifePath.number}</span>
                            </span>
                            {lifePath.isMaster && <span className="chip"><span>Master number</span>Rare</span>}
                        </div>
                        <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">
                            Month {m.value} → {m.reduced}, day {d.value} → {d.reduced}, year {y.value} → {y.reduced}.{' '}
                            {m.reduced} + {d.reduced} + {y.reduced} = {lifePath.total}
                            {lifePath.total !== lifePath.number && <>, which reduces to {lifePath.number}</>}.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="reveal mt-10 flex flex-col items-center gap-5 text-center" style={{ '--d': '0.7s' }}>
                <button type="button" onClick={onReset} className="btn-ghost">
                    <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M16 10H4M9 5l-5 5 5 5" />
                    </svg>
                    Read another date
                </button>
                <p className="text-sm text-mist/80">For reflection and delight, not prediction.</p>
            </footer>
        </article>
    );
}
