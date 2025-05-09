import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Booklist() {
    const [books, setBooks] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetch('/api/books')
            .then(res => res.json())
            .then(data => setBooks(data));
    }, []);

    const deleteBook = async (id) => {
        await fetch(`/api/books/${id}`, {
            method: 'DELETE'
        });
        setBooks(books.filter(b => b.id !== id));
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`${darkMode ? 'bg-[#3E2723] text-white' : 'bg-gradient-to-br from-[#FBE9E7] via-[#EFEBE9] to-[#FBE9E7]'} min-h-screen flex flex-col transition-colors duration-500`}>
            
           {/* Navbar */}
<nav className={`backdrop-blur ${darkMode ? 'bg-[#4E342E]' : 'bg-[#D7CCC8]/80'} shadow-lg px-6 py-4 sticky top-0 z-50 transition-colors duration-500`}>
    <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#6D4C41] dark:text-[#FFCCBC]">MyLibrary</Link>
        <div className="space-x-6 flex items-center">
            <Link href="/books/navbar" className={`hover:underline transition ${darkMode ? 'text-white' : 'text-[#4E342E]'}`}>
                Home
            </Link>
            <Link href="/books/add" className={`hover:underline transition ${darkMode ? 'text-white' : 'text-[#4E342E]'}`}>
                Tambah Buku
            </Link>
            <Link href="/categories" className={`hover:underline transition ${darkMode ? 'text-white' : 'text-[#4E342E]'}`}>
                Categories
            </Link>
            <button
                onClick={toggleDarkMode}
                className="ml-2 text-xl px-4 py-1 rounded-full bg-[#6D4C41] hover:bg-[#5D4037] text-white transition-all"
                title="Toggle Dark Mode"
            >
                {darkMode ? '☀' : '🌙'}
            </button>
        </div>
    </div>
</nav>

            {/* Main Content */}
            <main className={`flex-grow w-full max-w-7xl mx-auto ${darkMode ? 'bg-[#4E342E]' : 'bg-[#FFFFFF]/80'} backdrop-blur-lg mt-10 rounded-3xl shadow-2xl px-4 sm:px-10 py-12 transition-colors duration-500`}>
                <h1 className={`text-5xl font-extrabold mb-12 text-center ${darkMode ? 'text-white' : 'text-[#4E342E]'} drop-shadow-lg`}>
                    Daftar Buku
                </h1>
                <div className="mb-10 text-right">
                    <Link
                        href="/books/add"
                        className="bg-gradient-to-r from-[#A1887F] to-[#D7CCC8] text-white px-6 py-3 rounded-xl shadow-xl hover:from-[#8D6E63] hover:to-[#BCAAA4] transform hover:scale-105 transition-all duration-300"
                    >
                        + Tambah Buku
                    </Link>
                </div>
                <ul className="space-y-8">
                    {books.map(b => (
                        <li
                            key={b.id}
                            className={`border p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] ${darkMode ? 'bg-[#5D4037] text-white border-[#6D4C41]' : 'bg-white border-gray-200'}`}
                        >
                            <div className="flex justify-between items-center flex-wrap gap-4">
                                <div>
                                    <Link href={`/books/${b.id}`} className={`text-2xl font-semibold hover:underline transition ${darkMode ? 'text-white' : 'text-[#4E342E]'}`}>
                                        {b.title}
                                    </Link>
                                    <p className={`text-sm mt-1 ${darkMode ? 'text-[#D7CCC8]' : 'text-gray-500'}`}>oleh {b.author}</p>
                                </div>
                                <div className="flex gap-3">
                                    <Link
                                        href={`/books/${b.id}`}
                                        className="bg-gradient-to-r from-[#FFCCBC] to-[#D7CCC8] text-black px-4 py-2 rounded-lg shadow hover:from-[#FFAB91] hover:to-[#BCAAA4] transform hover:scale-105 transition-all duration-300"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteBook(b.id)}
                                        className="bg-gradient-to-r from-[#8D6E63] to-[#6D4C41] text-white px-4 py-2 rounded-lg shadow hover:from-[#6D4C41] hover:to-[#4E342E] transform hover:scale-105 transition-all duration-300"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>

            {/* Footer */}
            <footer className={`${darkMode ? 'bg-[#4E342E] text-white' : 'bg-[#D7CCC8]/80'} backdrop-blur shadow-inner mt-12 py-5 rounded-t-2xl transition-colors duration-500`}>
                <div className="text-center text-sm">
                    © {new Date().getFullYear()} MyLibrary. All rights reserved by Aulia XI Sija 2.
                </div>
            </footer>
        </div>
    );
}
