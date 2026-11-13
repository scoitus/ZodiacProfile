import {
    WESTERN_SIGNS, CHINESE_ANIMALS, CHINESE_ELEMENTS,
    BIRTHSTONES, BIRTH_FLOWERS, TAROT, MONTH_NAMES,
} from '../data/almanac.js';

export const MIN_YEAR = 1900;
export const MAX_YEAR = 2100;

// Verified Lunar New Year dates ("MM-DD"), 1900-2040. Later years are
// resolved through the platform's Chinese calendar, which is astronomical
// and can differ from the official date by one day in rare years.
export const LUNAR_NEW_YEAR_DATES = {
    1900: '01-31', 1901: '02-19', 1902: '02-08', 1903: '01-29', 1904: '02-16',
    1905: '02-04', 1906: '01-25', 1907: '02-13', 1908: '02-02', 1909: '01-22',
    1910: '02-10', 1911: '01-30', 1912: '02-18', 1913: '02-06', 1914: '01-26',
    1915: '02-14', 1916: '02-03', 1917: '01-23', 1918: '02-11', 1919: '02-01',
    1920: '02-20', 1921: '02-08', 1922: '01-28', 1923: '02-16', 1924: '02-05',
    1925: '01-24', 1926: '02-13', 1927: '02-02', 1928: '01-23', 1929: '02-10',
    1930: '01-30', 1931: '02-17', 1932: '02-06', 1933: '01-26', 1934: '02-14',
    1935: '02-04', 1936: '01-24', 1937: '02-11', 1938: '01-31', 1939: '02-19',
    1940: '02-08', 1941: '01-27', 1942: '02-15', 1943: '02-05', 1944: '01-25',
    1945: '02-13', 1946: '02-02', 1947: '01-22', 1948: '02-10', 1949: '01-29',
    1950: '02-17', 1951: '02-06', 1952: '01-27', 1953: '02-14', 1954: '02-03',
    1955: '01-24', 1956: '02-12', 1957: '01-31', 1958: '02-18', 1959: '02-08',
    1960: '01-28', 1961: '02-15', 1962: '02-05', 1963: '01-25', 1964: '02-13',
    1965: '02-02', 1966: '01-21', 1967: '02-09', 1968: '01-30', 1969: '02-17',
    1970: '02-06', 1971: '01-27', 1972: '02-15', 1973: '02-03', 1974: '01-23',
    1975: '02-11', 1976: '01-31', 1977: '02-18', 1978: '02-07', 1979: '01-28',
    1980: '02-16', 1981: '02-05', 1982: '01-25', 1983: '02-13', 1984: '02-02',
    1985: '02-20', 1986: '02-09', 1987: '01-29', 1988: '02-17', 1989: '02-06',
    1990: '01-27', 1991: '02-15', 1992: '02-04', 1993: '01-23', 1994: '02-10',
    1995: '01-31', 1996: '02-19', 1997: '02-07', 1998: '01-28', 1999: '02-16',
    2000: '02-05', 2001: '01-24', 2002: '02-12', 2003: '02-01', 2004: '01-22',
    2005: '02-09', 2006: '01-29', 2007: '02-18', 2008: '02-07', 2009: '01-26',
    2010: '02-14', 2011: '02-03', 2012: '01-23', 2013: '02-10', 2014: '01-31',
    2015: '02-19', 2016: '02-08', 2017: '01-28', 2018: '02-16', 2019: '02-05',
    2020: '01-25', 2021: '02-12', 2022: '02-01', 2023: '01-22', 2024: '02-10',
    2025: '01-29', 2026: '02-17', 2027: '02-06', 2028: '01-26', 2029: '02-13',
    2030: '02-03', 2031: '01-23', 2032: '02-11', 2033: '01-31', 2034: '02-19',
    2035: '02-08', 2036: '01-28', 2037: '02-15', 2038: '02-04', 2039: '01-24',
    2040: '02-12',
};

const pad = (n) => String(n).padStart(2, '0');

export function daysInMonth(month, year) {
    // Without a year, allow Feb 29 so a leap-day birthday can still be picked.
    if (month === 2 && !year) return 29;
    return new Date(Date.UTC(year || 2000, month, 0)).getUTCDate();
}

/** Returns an error message for an invalid date, or null when it is usable. */
export function validateDate(year, month, day) {
    if (!month || !day || !year) return 'Enter the month, day and year you were born.';
    if (!Number.isInteger(year) || year < MIN_YEAR || year > MAX_YEAR) {
        return `Enter a year between ${MIN_YEAR} and ${MAX_YEAR}.`;
    }
    if (month < 1 || month > 12) return 'Choose a month.';
    if (day < 1 || day > daysInMonth(month, year)) {
        return `${MONTH_NAMES[month - 1]} ${year} only has ${daysInMonth(month, year)} days.`;
    }
    return null;
}

// --- Western zodiac -------------------------------------------------------

function westernSign(month, day) {
    const index = WESTERN_SIGNS.findIndex((s) => s.until[0] === month);
    const endsThisMonth = WESTERN_SIGNS[index];
    const next = WESTERN_SIGNS[(index + 1) % 12];
    const cutoff = endsThisMonth.until[1];
    const sign = day <= cutoff ? endsThisMonth : next;

    // The Sun changes sign at a slightly different moment each year, so the
    // two days either side of a boundary can fall in the neighbouring sign.
    let cuspWith = null;
    if (day === cutoff) cuspWith = next.name;
    else if (day === cutoff + 1) cuspWith = endsThisMonth.name;

    return { sign, cuspWith };
}

// --- Chinese zodiac -------------------------------------------------------

let chineseFormatter;
/** Chinese-calendar year for a civil date via Intl, or null if unsupported. */
export function intlChineseYear(year, month, day) {
    try {
        chineseFormatter ??= new Intl.DateTimeFormat('en-u-ca-chinese', { year: 'numeric', timeZone: 'UTC' });
        const part = chineseFormatter
            .formatToParts(new Date(Date.UTC(year, month - 1, day, 12)))
            .find((p) => p.type === 'relatedYear');
        const value = part ? Number(part.value) : NaN;
        return Number.isInteger(value) ? value : null;
    } catch {
        return null;
    }
}

/** Lunar New Year of a Gregorian year as [month, day], or null if unknown. */
export function lunarNewYear(year) {
    const known = LUNAR_NEW_YEAR_DATES[year];
    if (known) return known.split('-').map(Number);
    // It always falls between 21 January and 20 February.
    for (let offset = 0; offset < 33; offset++) {
        const d = new Date(Date.UTC(year, 0, 20 + offset, 12));
        const [m, dd] = [d.getUTCMonth() + 1, d.getUTCDate()];
        const cy = intlChineseYear(year, m, dd);
        if (cy === null) return null;
        if (cy === year) return [m, dd];
    }
    return null;
}

function chineseZodiac(year, month, day) {
    const lny = lunarNewYear(year);
    const beforeNewYear = lny ? month < lny[0] || (month === lny[0] && day < lny[1]) : false;
    const chineseYear = beforeNewYear ? year - 1 : year;
    const mod = (n, m) => ((n % m) + m) % m;

    return {
        animal: CHINESE_ANIMALS[mod(chineseYear - 4, 12)],
        element: CHINESE_ELEMENTS[Math.floor(mod(chineseYear, 10) / 2)],
        polarity: chineseYear % 2 === 0 ? 'Yang' : 'Yin',
        year: chineseYear,
        beforeNewYear,
        newYear: lny,
    };
}

// --- Life path ------------------------------------------------------------

const MASTER_NUMBERS = [11, 22, 33];
const digitSum = (n) => String(n).split('').reduce((a, c) => a + Number(c), 0);

function reduceNumber(n) {
    while (n > 9 && !MASTER_NUMBERS.includes(n)) n = digitSum(n);
    return n;
}

/**
 * Life path by the grouping method: reduce month, day and year separately,
 * add them, and reduce again, stopping early on master numbers 11, 22, 33.
 */
function lifePath(year, month, day) {
    const parts = [month, day, year].map((value) => ({ value, reduced: reduceNumber(value) }));
    const total = parts.reduce((a, p) => a + p.reduced, 0);
    const number = reduceNumber(total);
    return { number, isMaster: MASTER_NUMBERS.includes(number), parts, total };
}

// --- Public API -----------------------------------------------------------

/**
 * Builds the full reading for a birth date.
 * @param {string} dateString ISO date, "YYYY-MM-DD"
 * @returns {object|null} The reading, or null if the date is not valid.
 */
export function calculateProfile(dateString) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString ?? '');
    if (!match) return null;
    const [year, month, day] = match.slice(1).map(Number);
    if (validateDate(year, month, day)) return null;

    const { sign, cuspWith } = westernSign(month, day);
    const chinese = chineseZodiac(year, month, day);
    const path = lifePath(year, month, day);
    const tarot = TAROT[path.number];
    const stone = BIRTHSTONES[month - 1];
    const flower = BIRTH_FLOWERS[month - 1];
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'UTC' })
        .format(new Date(Date.UTC(year, month - 1, day, 12)));

    return {
        date: { iso: `${year}-${pad(month)}-${pad(day)}`, year, month, day, weekday, label: `${MONTH_NAMES[month - 1]} ${day}, ${year}` },
        western: { ...sign, cuspWith },
        chinese,
        stone,
        flower,
        lifePath: path,
        tarot,
        // Flat fields, kept for simple consumers and tests.
        westernSign: sign.name,
        chineseSign: chinese.animal.name,
        birthStone: stone.name,
        birthFlower: flower.name,
        lifePathNumber: path.number,
        tarotCard: tarot.name,
        tarotDesc: tarot.desc,
    };
}
