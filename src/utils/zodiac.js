
// Western Zodiac Data
const WESTERN_ZODIAC = [
    { sign: "Capricorn", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { sign: "Aquarius", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { sign: "Pisces", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { sign: "Aries", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { sign: "Taurus", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { sign: "Gemini", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    { sign: "Cancer", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    { sign: "Leo", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { sign: "Virgo", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { sign: "Libra", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    { sign: "Scorpio", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    { sign: "Sagittarius", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
];

// Chinese Zodiac Animals (Offset 0 = Rat = 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020)
// Logic: (Year - 4) % 12
const CHINESE_ZODIAC = [
    "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
    "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
];

// Birthstones and Flowers by Month (0-indexed logic in code, strict 1-12 mapping)
const MONTHLY_DATA = [
    { month: 1, stone: "Garnet", flower: "Carnation" },
    { month: 2, stone: "Amethyst", flower: "Violet" },
    { month: 3, stone: "Aquamarine", flower: "Daffodil" },
    { month: 4, stone: "Diamond", flower: "Daisy" },
    { month: 5, stone: "Emerald", flower: "Lily of the Valley" },
    { month: 6, stone: "Pearl", flower: "Rose" },
    { month: 7, stone: "Ruby", flower: "Larkspur" },
    { month: 8, stone: "Peridot", flower: "Gladiolus" },
    { month: 9, stone: "Sapphire", flower: "Aster" },
    { month: 10, stone: "Opal", flower: "Marigold" },
    { month: 11, stone: "Topaz", flower: "Chrysanthemum" },
    { month: 12, stone: "Turquoise", flower: "Narcissus" },
];

const TAROT_MAJOR_ARCANA = {
    1: { name: "The Magician", desc: "You are a manifestor with pure willpower and the ability to turn visions into reality." },
    2: { name: "The High Priestess", desc: "You possess deep intuition and are a guardian of hidden knowledge and mysteries." },
    3: { name: "The Empress", desc: "You embody creativity, abundance, and the nurturing power of nature itself." },
    4: { name: "The Emperor", desc: "You are a natural leader with a strong sense of structure, authority, and stability." },
    5: { name: "The Hierophant", desc: "You are a seeker of wisdom, tradition, and spiritual meaning in the established order." },
    6: { name: "The Lovers", desc: "You are guided by love, harmony, and the importance of making aligned choices." },
    7: { name: "The Chariot", desc: "You have the drive and determination to overcome any obstacle through focus and control." },
    8: { name: "Strength", desc: "You possess inner courage, patience, and the gentle power to tame the wild." },
    9: { name: "The Hermit", desc: "You shine a light of introspection, seeking truth through solitude and inner guidance." }
};


// Lunar New Year Dates (1920-2040)
// Format: YYYY: "MM-DD" of the start of the new year
const LUNAR_NEW_YEAR_DATES = {
    1920: "02-20", 1921: "02-08", 1922: "01-28", 1923: "02-16", 1924: "02-05",
    1925: "01-24", 1926: "02-13", 1927: "02-02", 1928: "01-23", 1929: "02-10",
    1930: "01-30", 1931: "02-17", 1932: "02-06", 1933: "01-26", 1934: "02-14",
    1935: "02-04", 1936: "01-24", 1937: "02-11", 1938: "01-31", 1939: "02-19",
    1940: "02-08", 1941: "01-27", 1942: "02-15", 1943: "02-05", 1944: "01-25",
    1945: "02-13", 1946: "02-02", 1947: "01-22", 1948: "02-10", 1949: "01-29",
    1950: "02-17", 1951: "02-06", 1952: "01-27", 1953: "02-14", 1954: "02-03",
    1955: "01-24", 1956: "02-12", 1957: "01-31", 1958: "02-18", 1959: "02-08",
    1960: "01-28", 1961: "02-15", 1962: "02-05", 1963: "01-25", 1964: "02-13",
    1965: "02-02", 1966: "01-21", 1967: "02-09", 1968: "01-30", 1969: "02-17",
    1970: "02-06", 1971: "01-27", 1972: "02-15", 1973: "02-03", 1974: "01-23",
    1975: "02-11", 1976: "01-31", 1977: "02-18", 1978: "02-07", 1979: "01-28",
    1980: "02-16", 1981: "02-05", 1982: "01-25", 1983: "02-13", 1984: "02-02",
    1985: "02-20", 1986: "02-09", 1987: "01-29", 1988: "02-17", 1989: "02-06",
    1990: "01-27", 1991: "02-15", 1992: "02-04", 1993: "01-23", 1994: "02-10",
    1995: "01-31", 1996: "02-19", 1997: "02-07", 1998: "01-28", 1999: "02-16",
    2000: "02-05", 2001: "01-24", 2002: "02-12", 2003: "02-01", 2004: "01-22",
    2005: "02-09", 2006: "01-29", 2007: "02-18", 2008: "02-07", 2009: "01-26",
    2010: "02-14", 2011: "02-03", 2012: "01-23", 2013: "02-10", 2014: "01-31",
    2015: "02-19", 2016: "02-08", 2017: "01-28", 2018: "02-16", 2019: "02-05",
    2020: "01-25", 2021: "02-12", 2022: "02-01", 2023: "01-22", 2024: "02-10",
    2025: "01-29", 2026: "02-17", 2027: "02-06", 2028: "01-26", 2029: "02-13",
    2030: "02-03", 2031: "01-23", 2032: "02-11", 2033: "01-31", 2034: "02-19",
    2035: "02-08", 2036: "01-28", 2037: "02-15", 2038: "02-04", 2039: "01-24",
    2040: "02-12"
};

/**
 * Calculates all profile data from a date string (YYYY-MM-DD)
 * @param {string} dateString 
 * @returns {object} Profile data
 */
export function calculateProfile(dateString) {
    const date = new Date(dateString);
    const [yearStr, monthStr, dayStr] = dateString.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr); // 1-12
    const day = parseInt(dayStr);

    // 1. Western Zodiac
    let westernSign = "Capricorn"; // Default/Fallback
    for (const z of WESTERN_ZODIAC) {
        if (z.sign === "Capricorn") continue;
        if (
            (month === z.startMonth && day >= z.startDay) ||
            (month === z.endMonth && day <= z.endDay)
        ) {
            westernSign = z.sign;
            break;
        }
    }
    if (
        (month === 12 && day >= 22) ||
        (month === 1 && day <= 19)
    ) {
        westernSign = "Capricorn";
    }

    // 2. Chinese Zodiac with Lunar New Year Logic
    let chineseYear = year;
    const mmdd = `${monthStr}-${dayStr}`;

    // If born in Jan or Feb, check against LNY date
    if (month === 1 || month === 2) {
        const lnyDate = LUNAR_NEW_YEAR_DATES[year];
        if (lnyDate) {
            // String comparison works for MM-DD format
            if (mmdd < lnyDate) {
                chineseYear = year - 1;
            }
        }
    }

    const chineseOffset = (chineseYear - 4) % 12;
    const safeOffset = chineseOffset < 0 ? chineseOffset + 12 : chineseOffset;
    const chineseSign = CHINESE_ZODIAC[safeOffset];

    // 3. Birthstone & Flower (Based on month only)
    const monthData = MONTHLY_DATA.find(d => d.month === month);
    const stone = monthData.stone;
    const flower = monthData.flower;

    // 4. Tarot (Life Path)
    let digits = dateString.replace(/-/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);

    while (sum > 9) {
        sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0);
    }
    const tarot = TAROT_MAJOR_ARCANA[sum] || { name: "Unknown", desc: "Mystery awaits." };

    const result = {
        westernSign,
        chineseSign,
        birthStone: stone,
        birthFlower: flower,
        lifePathNumber: sum,
        tarotCard: tarot.name,
        tarotDesc: tarot.desc
    };

    console.log("Calculated Profile:", result);

    return result;
}
