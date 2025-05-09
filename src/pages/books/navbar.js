import Link from 'next/link';
import { useState } from 'react';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'bg-[#3E2723] text-white' : 'bg-[#FBE9E7] text-[#3E2723]'} min-h-screen flex flex-col transition-colors duration-500`}>

      {/* Hero Section */}
      <div className="relative flex-grow flex items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-[#4E342E] via-[#3E2723] to-[#1B0B08]' : 'bg-gradient-to-br from-[#FBE9E7] via-[#EFEBE9] to-[#FBE9E7]'} opacity-90 blur-sm`}></div>
        <div className={`absolute w-[600px] h-[600px] ${darkMode ? 'bg-[#6D4C41]' : 'bg-[#D7CCC8]'} rounded-full opacity-20 blur-3xl animate-pulse -top-20 -left-40`}></div>
        <div className={`absolute w-[400px] h-[400px] ${darkMode ? 'bg-[#FFCCBC]' : 'bg-[#FFAB91]'} rounded-full opacity-10 blur-2xl animate-pulse -bottom-32 -right-32`}></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-xl tracking-tight animate-fadeIn">
            <span className={`${darkMode ? 'text-[#FFCCBC]' : 'text-[#6D4C41]'}`}>MyLibrary</span>
          </h1>
          <p className={`text-lg md:text-xl mb-10 leading-relaxed animate-fadeIn delay-200 ${darkMode ? 'text-[#D7CCC8]' : 'text-[#5D4037]'}`}>
            Dunia buku digitalmu dimulai di sini. 
          </p>
          <div className="flex justify-center gap-6 animate-fadeIn delay-300">
            <Link
              href="/books"
              className={`px-6 py-3 rounded-full font-semibold shadow-xl transition transform hover:scale-110 duration-300 ${
                darkMode ? 'bg-[#6D4C41] text-white hover:bg-[#5D4037]' : 'bg-[#6D4C41] text-white hover:bg-[#5D4037]'
              }`}
            >
              📚 Lihat Koleksi
            </Link>
            <Link
              href="/books/add"
              className={`px-6 py-3 rounded-full font-semibold shadow-xl transition transform hover:scale-110 duration-300 ${
                darkMode ? 'bg-gradient-to-r from-[#A1887F] to-[#D7CCC8] text-black' : 'bg-gradient-to-r from-[#A1887F] to-[#D7CCC8] text-black'
              }`}
            >
              ➕ Tambah Buku
            </Link>
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          className="absolute top-6 right-6 bg-[#6D4C41] hover:bg-[#5D4037] text-white px-4 py-2 rounded-full shadow-lg transition duration-300 text-xl"
          title="Toggle Dark Mode"
        >
          {darkMode ? '☀' : '🌙'}
        </button>
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-[#4E342E] text-white' : 'bg-[#D7CCC8]/80'} backdrop-blur shadow-inner mt-12 py-5 rounded-t-2xl transition-colors duration-500`}>
                <div className="text-center text-sm">
                    © {new Date().getFullYear()} MyLibrary. All rights reserved by Aulia XI Sija 2.
                </div>
            </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}
