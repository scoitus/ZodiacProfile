import { calculateProfile } from './utils/zodiac.js';

const testCases = [
    {
        date: '1990-10-12',
        expected: {
            westernSign: 'Libra',
            chineseSign: 'Horse',
            birthStone: 'Opal',
            birthFlower: 'Marigold',
            lifePathNumber: 5,
            tarotCard: 'The Hierophant'
        }
    },
    {
        date: '2000-01-01',
        expected: {
            westernSign: 'Capricorn',
            chineseSign: 'Rabbit', // Before LNY 2000 (Feb 5), so it's 1999 (Rabbit), NOT Dragon
            birthStone: 'Garnet',
            birthFlower: 'Carnation',
            lifePathNumber: 4,
            tarotCard: 'The Emperor'
        }
    },
    {
        date: '2020-01-24', // Before 2020 LNY (Jan 25)
        expected: {
            chineseSign: 'Pig' // 2019
        }
    },
    {
        date: '2020-01-26', // After 2020 LNY
        expected: {
            chineseSign: 'Rat' // 2020
        }
    }
];

let failed = false;

testCases.forEach(({ date, expected }) => {
    console.log(`Testing ${date}...`);
    const result = calculateProfile(date);

    for (const [key, value] of Object.entries(expected)) {
        if (result[key] !== value) {
            console.error(`Mismatch for ${key}: expected ${value}, got ${result[key]}`);
            failed = true;
        }
    }
    if (!failed) console.log('PASS');
});

if (failed) process.exit(1);
