import React from 'react';

const ICONS = {
    // Western
    "Capricorn": "♑", "Aquarius": "♒", "Pisces": "♓", "Aries": "♈",
    "Taurus": "♉", "Gemini": "♊", "Cancer": "♋", "Leo": "♌",
    "Virgo": "♍", "Libra": "♎", "Scorpio": "♏", "Sagittarius": "♐",
    // Chinese
    "Rat": "🐀", "Ox": "🐂", "Tiger": "🐅", "Rabbit": "🐇", "Dragon": "🐉",
    "Snake": "🐍", "Horse": "🐎", "Goat": "🐐", "Monkey": "🐒", "Rooster": "🐓",
    "Dog": "🐕", "Pig": "🐖",
    // Stones (Generic fallback for specific colors)
    "Garnet": "🔴", "Amethyst": "🟣", "Aquamarine": "💠", "Diamond": "💎",
    "Emerald": "💚", "Pearl": "⚪", "Ruby": "🔻", "Peridot": "🟢",
    "Sapphire": "🔵", "Opal": "🌈", "Topaz": "✴️", "Turquoise": "🔹",
    // Flowers
    "Carnation": "🌺", "Violet": "💜", "Daffodil": "🌼", "Daisy": "💮",
    "Lily of the Valley": "🌿", "Rose": "🌹", "Larkspur": "🌸", "Gladiolus": "💐",
    "Aster": "🌻", "Marigold": "🏵️", "Chrysanthemum": "🍂", "Narcissus": "🥀"
};

export default function ProfileCard({ data, onReset }) {
    if (!data) return null;

    const items = [
        { label: "Western Sign", value: data.westernSign, icon: ICONS[data.westernSign] || "✨" },
        { label: "Birthstone", value: data.birthStone, icon: ICONS[data.birthStone] || "💎" },
        { label: "Birth Flower", value: data.birthFlower, icon: ICONS[data.birthFlower] || "🌸" },
        { label: "Chinese Zodiac", value: data.chineseSign, icon: ICONS[data.chineseSign] || "🐉" },
        { label: "Life Path Tarot", value: data.tarotCard, icon: "🃏" },
    ];

    return (
        <div className="w-full max-w-2xl mx-auto mt-12 animate-slide-up">
            <div className="relative group">
                {/* Glow effect behind the card */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-1000"></div>

                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
                    {/* Subtle gloss shine */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                    <h2 className="text-3xl md:text-4xl font-serif italic text-center text-white mb-2 tracking-wide drop-shadow-md">
                        Cosmic Blueprint
                    </h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-8 opacity-50"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {items.map((item, index) => (
                            <div
                                key={item.label}
                                className={`flex flex-col items-center justify-center p-6 rounded-xl bg-black/20 border border-white/5 hover:bg-white/5 transition-all duration-300 hover:border-white/20 group/item ${index === 4 ? 'md:col-span-2' : ''}`}
                            >
                                <div className="text-4xl mb-3 transform group-hover/item:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                                    {item.icon}
                                </div>
                                <div className="text-xs text-purple-200/70 uppercase tracking-widest mb-1 font-sans">{item.label}</div>
                                <div className="text-xl md:text-2xl font-serif text-white">{item.value}</div>

                                {item.label === "Life Path Tarot" && (
                                    <div className="mt-4 text-center max-w-sm">
                                        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-200 text-xs font-mono mb-2">
                                            NUMBER {data.lifePathNumber}
                                        </div>
                                        <p className="text-sm font-serif italic text-purple-100/80 leading-relaxed">
                                            "{data.tarotDesc}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={onReset}
                            className="px-6 py-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-sm tracking-widest uppercase font-sans"
                        >
                            Check Another Date
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
