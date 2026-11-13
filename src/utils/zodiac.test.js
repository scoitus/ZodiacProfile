import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    calculateProfile, validateDate, daysInMonth,
    intlChineseYear, lunarNewYear, LUNAR_NEW_YEAR_DATES,
} from './zodiac.js';

const pick = (profile, keys) => Object.fromEntries(keys.map((k) => [k, profile[k]]));

test('full reading for known dates', () => {
    const keys = ['westernSign', 'chineseSign', 'birthStone', 'birthFlower', 'lifePathNumber', 'tarotCard'];
    assert.deepEqual(pick(calculateProfile('1990-10-12'), keys), {
        westernSign: 'Libra', chineseSign: 'Horse', birthStone: 'Opal',
        birthFlower: 'Marigold', lifePathNumber: 5, tarotCard: 'The Hierophant',
    });
    // Before Lunar New Year 2000 (Feb 5), so still the Rabbit year of 1999.
    assert.deepEqual(pick(calculateProfile('2000-01-01'), keys), {
        westernSign: 'Capricorn', chineseSign: 'Rabbit', birthStone: 'Garnet',
        birthFlower: 'Carnation', lifePathNumber: 4, tarotCard: 'The Emperor',
    });
});

test('every western sign boundary', () => {
    const boundaries = [
        ['01-19', 'Capricorn'], ['01-20', 'Aquarius'], ['02-18', 'Aquarius'], ['02-19', 'Pisces'],
        ['03-20', 'Pisces'], ['03-21', 'Aries'], ['04-19', 'Aries'], ['04-20', 'Taurus'],
        ['05-20', 'Taurus'], ['05-21', 'Gemini'], ['06-20', 'Gemini'], ['06-21', 'Cancer'],
        ['07-22', 'Cancer'], ['07-23', 'Leo'], ['08-22', 'Leo'], ['08-23', 'Virgo'],
        ['09-22', 'Virgo'], ['09-23', 'Libra'], ['10-22', 'Libra'], ['10-23', 'Scorpio'],
        ['11-21', 'Scorpio'], ['11-22', 'Sagittarius'], ['12-21', 'Sagittarius'], ['12-22', 'Capricorn'],
        ['12-31', 'Capricorn'], ['01-01', 'Capricorn'],
    ];
    for (const [mmdd, sign] of boundaries) {
        assert.equal(calculateProfile(`1995-${mmdd}`).westernSign, sign, mmdd);
    }
});

test('cusp days name the neighbouring sign', () => {
    assert.equal(calculateProfile('1995-03-20').western.cuspWith, 'Aries');
    assert.equal(calculateProfile('1995-03-21').western.cuspWith, 'Pisces');
    assert.equal(calculateProfile('1995-12-22').western.cuspWith, 'Sagittarius');
    assert.equal(calculateProfile('1995-04-05').western.cuspWith, null);
});

test('chinese zodiac respects Lunar New Year', () => {
    const before = calculateProfile('2020-01-24').chinese;
    assert.equal(before.animal.name, 'Pig');
    assert.equal(before.beforeNewYear, true);
    assert.equal(calculateProfile('2020-01-25').chineseSign, 'Rat');
    assert.equal(calculateProfile('2020-01-26').chineseSign, 'Rat');
});

test('chinese element and polarity', () => {
    const horse = calculateProfile('1990-10-12').chinese;
    assert.deepEqual([horse.element, horse.animal.name, horse.polarity], ['Metal', 'Horse', 'Yang']);
    const dragon = calculateProfile('2024-06-01').chinese;
    assert.deepEqual([dragon.element, dragon.animal.name], ['Wood', 'Dragon']);
    const rabbit = calculateProfile('2000-01-01').chinese;
    assert.deepEqual([rabbit.element, rabbit.polarity, rabbit.year], ['Earth', 'Yin', 1999]);
});

test('platform Chinese calendar stays within a day of the verified table', () => {
    const dayOfYear = ([m, d]) => (m - 1) * 31 + d;
    let exact = 0;
    const years = Object.keys(LUNAR_NEW_YEAR_DATES).map(Number);
    for (const year of years) {
        const [m, d] = LUNAR_NEW_YEAR_DATES[year].split('-').map(Number);
        let found = null;
        for (let offset = 0; offset < 33 && !found; offset++) {
            const date = new Date(Date.UTC(year, 0, 20 + offset, 12));
            const md = [date.getUTCMonth() + 1, date.getUTCDate()];
            if (intlChineseYear(year, ...md) === year) found = md;
        }
        assert.ok(found, `${year} resolved`);
        const drift = Math.abs(dayOfYear(found) - dayOfYear([m, d]));
        assert.ok(drift <= 1, `${year} drifts by ${drift} days`);
        if (drift === 0) exact++;
    }
    assert.ok(exact / years.length > 0.95);
});

test('years past the table still honour Lunar New Year', () => {
    assert.deepEqual(lunarNewYear(1912), [2, 18]);
    assert.deepEqual(lunarNewYear(2050), [1, 23]);
    assert.equal(calculateProfile('1912-02-17').chineseSign, 'Pig');
    assert.equal(calculateProfile('1912-02-18').chineseSign, 'Rat');
    assert.equal(calculateProfile('2050-01-22').chineseSign, 'Snake');
    assert.equal(calculateProfile('2050-01-23').chineseSign, 'Horse');
});

test('life path keeps master numbers', () => {
    // 11 + 2 + (2+0+0+7=9) = 22
    const p = calculateProfile('2007-11-02');
    assert.equal(p.lifePathNumber, 22);
    assert.equal(p.lifePath.isMaster, true);
    assert.equal(p.tarotCard, 'The Fool');
    // Every valid date maps to a card.
    for (let y = 1900; y <= 2100; y += 7) {
        for (let m = 1; m <= 12; m++) {
            for (let d = 1; d <= daysInMonth(m, y); d++) {
                const iso = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                assert.ok(calculateProfile(iso).tarotCard, iso);
            }
        }
    }
});

test('validation', () => {
    assert.equal(validateDate(1990, 10, 12), null);
    assert.equal(validateDate(2024, 2, 29), null);
    assert.match(validateDate(2023, 2, 29), /only has 28 days/);
    assert.match(validateDate(1800, 1, 1), /between 1900 and 2100/);
    assert.match(validateDate(NaN, 1, 1), /month, day and year/);
    assert.equal(calculateProfile('2023-02-30'), null);
    assert.equal(calculateProfile(''), null);
    assert.equal(calculateProfile('not-a-date'), null);
});
