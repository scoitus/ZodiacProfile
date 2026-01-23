import React, { useState } from 'react';
import DatePicker from './components/DatePicker';
import ProfileCard from './components/ProfileCard';
import { calculateProfile } from './utils/zodiac';

function App() {
  const [date, setDate] = useState('');
  const [profile, setProfile] = useState(null);
  const [viewState, setViewState] = useState('input'); // 'input' | 'result'

  const handleReveal = () => {
    if (date) {
      const data = calculateProfile(date);
      setProfile(data);
      setViewState('result');
    }
  };

  const handleReset = () => {
    setViewState('input');
    // Optional: keep date or clear it. Let's keep it for convenience, or clear if user wants "Another".
    // Request implies stepping back. Let's not clear date, just view.
    // But standard UX for "Check Another" usually implies "Reset". Let's clear profile but keep date input for editing? 
    // User said "flips back to input state". 
    // Let's clear profile after a delay to smooth transition if we wanted, but immediate is fine for React state.
    setProfile(null);
    setDate('');
  };

  // Generate stars for background
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 3 + 2}s`
  }));

  return (
    <div className="min-h-screen w-full bg-[#090b1e] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1b2735] via-[#090a0f] to-[#000000] flex items-center justify-center p-4 font-sans text-gray-100 overflow-hidden relative">

      {/* Star Background */}
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration
          }}
        />
      ))}

      <div className="w-full max-w-4xl relative z-10 transition-all duration-700 ease-in-out">
        <header className={`mb-12 text-center transition-all duration-700 ${viewState === 'result' ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'}`}>
          <h1 className="text-5xl md:text-7xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse">
            Astralis
          </h1>
          <p className="text-purple-200/60 text-sm tracking-[0.3em] font-light uppercase">
            Unlock the Secrets of your Birth
          </p>
        </header>

        <main className="w-full relative">
          <div className={`transition-all duration-700 transform absolute w-full ${viewState === 'input' ? 'opacity-100 translate-y-0 relative z-10' : 'opacity-0 -translate-y-10 pointer-events-none absolute'}`}>
            <DatePicker
              value={date}
              onChange={(d) => setDate(d)}
              onReveal={handleReveal}
            />
          </div>

          <div className={`transition-all duration-1000 transform ${viewState === 'result' ? 'opacity-100 translate-y-0 relative z-10' : 'opacity-0 translate-y-20 pointer-events-none absolute w-full'}`}>
            {profile && <ProfileCard data={profile} onReset={handleReset} />}
          </div>
        </main>

        <footer className={`mt-20 text-center text-white/10 text-xs tracking-widest font-serif transition-opacity duration-700 ${viewState === 'result' ? 'opacity-0' : 'opacity-100'}`}>
          ✨ {new Date().getFullYear()} ASTRALIS • PROSPER THROUGH STARS ✨
        </footer>
      </div>
    </div>
  );
}

export default App;
