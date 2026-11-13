// Reference data for the reading. Pure data, no logic.

export const ELEMENT_COLORS = {
    Fire: '#f2936b',
    Earth: '#a5cf8f',
    Air: '#a6d8f7',
    Water: '#8aa5f8',
};

// Ordered from Aries. `until` is the last day of the sign: [month, day].
export const WESTERN_SIGNS = [
    {
        name: 'Aries', glyph: '♈', symbol: 'The Ram', from: [3, 21], until: [4, 19],
        element: 'Fire', modality: 'Cardinal', ruler: 'Mars',
        traits: ['Bold', 'Driven', 'Direct'],
        blurb: 'First through the door. You start things, say the brave thing, and trust momentum to sort out the rest.',
    },
    {
        name: 'Taurus', glyph: '♉', symbol: 'The Bull', from: [4, 20], until: [5, 20],
        element: 'Earth', modality: 'Fixed', ruler: 'Venus',
        traits: ['Steady', 'Sensual', 'Loyal'],
        blurb: 'Slow to move and impossible to push. You build things that last and know the worth of comfort done well.',
    },
    {
        name: 'Gemini', glyph: '♊', symbol: 'The Twins', from: [5, 21], until: [6, 20],
        element: 'Air', modality: 'Mutable', ruler: 'Mercury',
        traits: ['Curious', 'Quick', 'Adaptable'],
        blurb: 'Two minds, one conversation. You collect ideas and people, and connect them faster than anyone can follow.',
    },
    {
        name: 'Cancer', glyph: '♋', symbol: 'The Crab', from: [6, 21], until: [7, 22],
        element: 'Water', modality: 'Cardinal', ruler: 'the Moon',
        traits: ['Intuitive', 'Protective', 'Tender'],
        blurb: 'A soft heart behind a careful shell. You remember everything, and you make wherever you are feel like home.',
    },
    {
        name: 'Leo', glyph: '♌', symbol: 'The Lion', from: [7, 23], until: [8, 22],
        element: 'Fire', modality: 'Fixed', ruler: 'the Sun',
        traits: ['Radiant', 'Generous', 'Proud'],
        blurb: 'You warm the room you walk into. Loyalty and a big heart come as naturally to you as taking the stage.',
    },
    {
        name: 'Virgo', glyph: '♍', symbol: 'The Maiden', from: [8, 23], until: [9, 22],
        element: 'Earth', modality: 'Mutable', ruler: 'Mercury',
        traits: ['Precise', 'Thoughtful', 'Devoted'],
        blurb: 'You notice what everyone else missed. Care, for you, is practical: the detail fixed, the problem quietly solved.',
    },
    {
        name: 'Libra', glyph: '♎', symbol: 'The Scales', from: [9, 23], until: [10, 22],
        element: 'Air', modality: 'Cardinal', ruler: 'Venus',
        traits: ['Diplomatic', 'Graceful', 'Fair'],
        blurb: 'You see every side and look for the balance point. Beauty and fairness matter to you in equal measure.',
    },
    {
        name: 'Scorpio', glyph: '♏', symbol: 'The Scorpion', from: [10, 23], until: [11, 21],
        element: 'Water', modality: 'Fixed', ruler: 'Pluto',
        traits: ['Intense', 'Perceptive', 'Resolute'],
        blurb: 'Still water, very deep. You read what goes unsaid, commit completely, and never do anything by halves.',
    },
    {
        name: 'Sagittarius', glyph: '♐', symbol: 'The Archer', from: [11, 22], until: [12, 21],
        element: 'Fire', modality: 'Mutable', ruler: 'Jupiter',
        traits: ['Adventurous', 'Candid', 'Optimistic'],
        blurb: 'Always aiming past the horizon. You chase meaning, tell the truth, and assume the next road is a good one.',
    },
    {
        name: 'Capricorn', glyph: '♑', symbol: 'The Sea-Goat', from: [12, 22], until: [1, 19],
        element: 'Earth', modality: 'Cardinal', ruler: 'Saturn',
        traits: ['Ambitious', 'Disciplined', 'Wry'],
        blurb: 'You play the long game. Patient, capable and drily funny, you climb steadily while others sprint and stall.',
    },
    {
        name: 'Aquarius', glyph: '♒', symbol: 'The Water-Bearer', from: [1, 20], until: [2, 18],
        element: 'Air', modality: 'Fixed', ruler: 'Uranus',
        traits: ['Original', 'Idealistic', 'Independent'],
        blurb: 'A step ahead and slightly apart. You think in futures, question the rules, and care about the whole crowd.',
    },
    {
        name: 'Pisces', glyph: '♓', symbol: 'The Fish', from: [2, 19], until: [3, 20],
        element: 'Water', modality: 'Mutable', ruler: 'Neptune',
        traits: ['Dreamy', 'Empathic', 'Imaginative'],
        blurb: 'You feel the whole room at once. Imagination is your native country, and compassion is how you travel.',
    },
];

// Ordered from the Rat; index = (year - 4) mod 12.
export const CHINESE_ANIMALS = [
    { name: 'Rat', hanzi: '鼠', traits: ['Resourceful', 'Sharp', 'Charming'] },
    { name: 'Ox', hanzi: '牛', traits: ['Dependable', 'Patient', 'Strong'] },
    { name: 'Tiger', hanzi: '虎', traits: ['Brave', 'Magnetic', 'Restless'] },
    { name: 'Rabbit', hanzi: '兔', traits: ['Gentle', 'Elegant', 'Alert'] },
    { name: 'Dragon', hanzi: '龍', traits: ['Confident', 'Visionary', 'Lucky'] },
    { name: 'Snake', hanzi: '蛇', traits: ['Wise', 'Discreet', 'Intuitive'] },
    { name: 'Horse', hanzi: '馬', traits: ['Spirited', 'Free', 'Warm'] },
    { name: 'Goat', hanzi: '羊', traits: ['Kind', 'Artistic', 'Calm'] },
    { name: 'Monkey', hanzi: '猴', traits: ['Clever', 'Playful', 'Inventive'] },
    { name: 'Rooster', hanzi: '雞', traits: ['Observant', 'Honest', 'Proud'] },
    { name: 'Dog', hanzi: '狗', traits: ['Loyal', 'Just', 'Sincere'] },
    { name: 'Pig', hanzi: '豬', traits: ['Generous', 'Easygoing', 'Earnest'] },
];

// Heavenly-stem elements, indexed by floor((year mod 10) / 2).
export const CHINESE_ELEMENTS = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];

// Index 0 = January.
export const BIRTHSTONES = [
    { name: 'Garnet', color: '#b3263f', meaning: 'Protection and lasting devotion' },
    { name: 'Amethyst', color: '#9a6bd6', meaning: 'Clarity and a quiet mind' },
    { name: 'Aquamarine', color: '#7fd8d6', meaning: 'Courage and calm waters' },
    { name: 'Diamond', color: '#dce8f7', meaning: 'Strength that does not yield' },
    { name: 'Emerald', color: '#2faa72', meaning: 'Renewal and patient wisdom' },
    { name: 'Pearl', color: '#efe6d6', meaning: 'Sincerity and quiet grace' },
    { name: 'Ruby', color: '#d81b4a', meaning: 'Passion and vitality' },
    { name: 'Peridot', color: '#aecd3f', meaning: 'Warmth and good fortune' },
    { name: 'Sapphire', color: '#2f5fd0', meaning: 'Truth and loyalty' },
    { name: 'Opal', color: '#b5e4e0', meaning: 'Imagination and hope' },
    { name: 'Topaz', color: '#f0a436', meaning: 'Friendship and resilience' },
    { name: 'Turquoise', color: '#35c4bf', meaning: 'Protection and safe travels' },
];

// Index 0 = January. `petals` shapes the drawn bloom.
export const BIRTH_FLOWERS = [
    { name: 'Carnation', color: '#e8688a', petals: 10, meaning: 'Devotion and admiration' },
    { name: 'Violet', color: '#8463d8', petals: 5, meaning: 'Faithfulness and modesty' },
    { name: 'Daffodil', color: '#f3cf45', petals: 6, meaning: 'New beginnings' },
    { name: 'Daisy', color: '#f4f0e4', petals: 14, meaning: 'Innocence and cheer' },
    { name: 'Lily of the Valley', color: '#e9f1df', petals: 6, meaning: 'The return of happiness' },
    { name: 'Rose', color: '#dc3f5c', petals: 8, meaning: 'Love in all its forms' },
    { name: 'Larkspur', color: '#7686e6', petals: 5, meaning: 'An open, light heart' },
    { name: 'Gladiolus', color: '#f07d6e', petals: 6, meaning: 'Strength of character' },
    { name: 'Aster', color: '#a183e6', petals: 16, meaning: 'Wisdom and patience' },
    { name: 'Marigold', color: '#f09c2a', petals: 12, meaning: 'Warmth and creativity' },
    { name: 'Chrysanthemum', color: '#e8b440', petals: 18, meaning: 'Joy and long life' },
    { name: 'Narcissus', color: '#f6efd4', petals: 6, meaning: 'Hope and good wishes' },
];

// Keyed by life path number. 33 shares The Lovers (3 + 3 = 6).
export const TAROT = {
    1: { numeral: 'I', name: 'The Magician', desc: 'You are a manifestor, with the willpower and the tools to turn a vision into something real.' },
    2: { numeral: 'II', name: 'The High Priestess', desc: 'You carry deep intuition, and you are a keeper of what is hidden, sensed and not yet spoken.' },
    3: { numeral: 'III', name: 'The Empress', desc: 'You embody creativity and abundance, and things tend to grow wherever you put your care.' },
    4: { numeral: 'IV', name: 'The Emperor', desc: 'You are a natural builder of order, bringing structure, steadiness and authority to what you lead.' },
    5: { numeral: 'V', name: 'The Hierophant', desc: 'You are a seeker and a teacher, drawn to wisdom, tradition and the meaning behind the ritual.' },
    6: { numeral: 'VI', name: 'The Lovers', desc: 'You are guided by love and harmony, and by the weight of choosing what truly aligns with you.' },
    7: { numeral: 'VII', name: 'The Chariot', desc: 'You have the drive to overcome any obstacle, winning through focus, discipline and sheer direction.' },
    8: { numeral: 'VIII', name: 'Strength', desc: 'You hold a quiet courage, the patient and gentle kind of power that tames what force cannot.' },
    9: { numeral: 'IX', name: 'The Hermit', desc: 'You carry a lantern inward, finding truth in solitude and then lighting the way for others.' },
    11: { numeral: 'XI', name: 'Justice', desc: 'You see clearly and weigh truly. Fairness, honesty and consequence are the compass you live by.' },
    22: { numeral: '0', name: 'The Fool', desc: 'You hold limitless potential, and a leap of faith is how your largest visions become real.' },
    33: { numeral: 'VI', name: 'The Lovers', desc: 'You are guided by love on a grand scale, a heart that teaches, heals and chooses devotion.' },
};

export const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
