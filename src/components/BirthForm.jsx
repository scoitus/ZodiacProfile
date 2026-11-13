import { forwardRef } from 'react';
import { MONTH_NAMES } from '../data/almanac';
import { daysInMonth, MIN_YEAR, MAX_YEAR } from '../utils/zodiac';

const Label = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="mb-2 block text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-mist">
        {children}
    </label>
);

const BirthForm = forwardRef(function BirthForm({ value, onChange, onSubmit, error }, monthRef) {
    const { month, day, year } = value;
    const yearNumber = year.length === 4 ? Number(year) : null;
    const dayCount = month ? daysInMonth(Number(month), yearNumber) : 31;
    const set = (key) => (e) => onChange({ ...value, [key]: e.target.value });

    return (
        <form
            noValidate
            onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
            className="panel mx-auto w-full max-w-xl p-6 sm:p-8"
        >
            <fieldset>
                <legend className="eyebrow mx-auto mb-6 text-center">Your date of birth</legend>
                <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 sm:grid-cols-[1.7fr_1fr_1.15fr] sm:gap-3">
                    <div>
                        <Label htmlFor="birth-month">Month</Label>
                        <select id="birth-month" ref={monthRef} className="field" value={month} onChange={set('month')} required autoComplete="bday-month">
                            <option value="">Month</option>
                            {MONTH_NAMES.map((name, i) => <option key={name} value={i + 1}>{name}</option>)}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="birth-day">Day</Label>
                        <select id="birth-day" className="field" value={day} onChange={set('day')} required autoComplete="bday-day">
                            <option value="">Day</option>
                            {Array.from({ length: Math.max(dayCount, Number(day) || 0) }, (_, i) => (
                                <option key={i} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="birth-year">Year</Label>
                        <input
                            id="birth-year" className="field" type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4}
                            placeholder="Year" autoComplete="bday-year" required
                            aria-describedby={error ? 'birth-error' : undefined} aria-invalid={error ? true : undefined}
                            value={year}
                            onChange={(e) => onChange({ ...value, year: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                        />
                    </div>
                </div>
            </fieldset>

            <p id="birth-error" role="alert" className="mt-4 min-h-6 text-center text-[0.9375rem] text-[#ffb4a3]">
                {error}
            </p>

            <div className="mt-2 flex justify-center">
                <button type="submit" className="btn-gold w-full sm:w-auto">
                    Reveal my reading
                    <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 10h12M11 5l5 5-5 5" />
                    </svg>
                </button>
            </div>
            <p className="sr-only">Years from {MIN_YEAR} to {MAX_YEAR} are supported.</p>
        </form>
    );
});

export default BirthForm;
