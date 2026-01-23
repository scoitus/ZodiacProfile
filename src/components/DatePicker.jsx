import React from 'react';

export default function DatePicker({ value, onChange, onReveal }) {
    return (
        <div className="flex flex-col items-center space-y-8 w-full max-w-md mx-auto z-10">
            <div className="w-full relative group">
                <label htmlFor="birthdate" className="block text-purple-200/80 text-xs font-sans uppercase tracking-[0.2em] text-center mb-3">
                    Select Your Origin Date
                </label>
                <div className="relative">
                    <input
                        type="date"
                        id="birthdate"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-500 text-center font-serif text-xl tracking-widest backdrop-blur-sm shadow-inner"
                        required
                    />
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-purple-400/30"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-purple-400/30"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-purple-400/30"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-purple-400/30"></div>
                </div>
            </div>

            <button
                onClick={onReveal}
                disabled={!value}
                className="relative px-12 py-4 group overflow-hidden rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="absolute inset-0 border border-purple-500/30 group-hover:border-purple-400/60 transition-colors duration-300"></div>
                <span className="relative font-serif italic text-xl text-white tracking-wider group-hover:text-purple-200 transition-colors duration-300">
                    Reveal Destiny
                </span>
            </button>
        </div>
    );
}
