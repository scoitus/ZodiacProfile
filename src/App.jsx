import { useEffect, useRef, useState } from 'react';
import BirthForm from './components/BirthForm';
import Reading from './components/Reading';
import { Sky, ZodiacWheel } from './components/Sky';
import { calculateProfile, validateDate } from './utils/zodiac';

const EMPTY = { month: '', day: '', year: '' };

export default function App() {
    const [fields, setFields] = useState(EMPTY);
    const [error, setError] = useState('');
    const [profile, setProfile] = useState(null);
    const monthRef = useRef(null);
    const headingRef = useRef(null);
    const returning = useRef(false);

    // Move focus with the view so keyboard and screen-reader users follow along.
    useEffect(() => {
        if (profile) {
            window.scrollTo(0, 0);
            headingRef.current?.focus({ preventScroll: true });
        } else if (returning.current) {
            window.scrollTo(0, 0);
            monthRef.current?.focus({ preventScroll: true });
        }
    }, [profile]);

    const handleChange = (next) => {
        setFields(next);
        if (error) setError('');
    };

    const handleSubmit = () => {
        const [year, month, day] = [fields.year, fields.month, fields.day].map((v) => (v === '' ? NaN : Number(v)));
        const problem = validateDate(year, month, day);
        if (problem) {
            setError(problem);
            return;
        }
        const pad = (n) => String(n).padStart(2, '0');
        setProfile(calculateProfile(`${year}-${pad(month)}-${pad(day)}`));
    };

    const handleReset = () => {
        returning.current = true;
        setProfile(null);
    };

    return (
        <>
            <Sky />
            <div className="relative z-10 flex min-h-dvh flex-col px-4 py-10 sm:px-6 sm:py-14">
                {profile ? (
                    <main key="reading" className="my-auto">
                        <Reading data={profile} onReset={handleReset} headingRef={headingRef} />
                    </main>
                ) : (
                    <main key="form" className="relative my-auto">
                        <ZodiacWheel className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[min(165vw,56rem)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-50 [mask-image:radial-gradient(closest-side,transparent_38%,#000_78%)]" />
                        <header className="reveal mb-10 text-center">
                            <p className="eyebrow mb-5">A reading written in your birth date</p>
                            <h1 className="gilded font-display text-7xl font-medium italic leading-none sm:text-8xl">Astralis</h1>
                            <p className="mx-auto mt-6 max-w-md font-display text-[1.375rem] leading-snug text-ivory/85">
                                Your sun sign, Chinese zodiac, birthstone, birth flower and tarot birth card, from a single date.
                            </p>
                        </header>
                        <div className="reveal" style={{ '--d': '0.15s' }}>
                            <BirthForm ref={monthRef} value={fields} onChange={handleChange} onSubmit={handleSubmit} error={error} />
                        </div>
                    </main>
                )}
            </div>
        </>
    );
}
