import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function AddBookPage() {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const addBook = async (e) => {
        e.preventDefault();
        if (!title || !author) return;

        await fetch("/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, author })
        });

        router.push("/books");
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`${darkMode ? 'bg-[#3E2723] text-white' : 'bg-gradient-to-br from-[#FBE9E7] via-[#EFEBE9] to-[#FBE9E7]'} min-h-screen flex flex-col`}>
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
            <main className={`flex-grow w-full max-w-4xl mx-auto ${darkMode ? 'bg-[#4E342E]' : 'bg-[#FFFFFF]/80'} backdrop-blur-lg mt-10 rounded-3xl shadow-2xl px-6 py-10`}>
                <h1 className={`text-4xl font-extrabold mb-8 text-center border-4 ${darkMode ? 'border-white text-white' : 'border-[#4E342E] text-[#4E342E]'} rounded-xl p-4`}>
                    ➕ Tambah Buku Baru
                </h1>
                <form onSubmit={addBook} className="space-y-8">
                    {/* Judul */}
                    <div className={`border-2 ${darkMode ? 'border-[#D7CCC8]' : 'border-[#6D4C41]'} rounded-xl p-4`}>
                        <label htmlFor="title" className="block text-lg font-semibold mb-2">Judul Buku</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Masukkan judul buku"
                            className="w-full p-3 rounded-lg bg-transparent border border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-[#A1887F] dark:text-white"
                        />
                    </div>

                    {/* Penulis */}
                    <div className={`border-2 ${darkMode ? 'border-[#D7CCC8]' : 'border-[#6D4C41]'} rounded-xl p-4`}>
                        <label htmlFor="author" className="block text-lg font-semibold mb-2">Penulis</label>
                        <input
                            id="author"
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Masukkan nama penulis"
                            className="w-full p-3 rounded-lg bg-transparent border border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-[#A1887F] dark:text-white"
                        />
                    </div>

                    {/* Tombol Submit */}
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#A1887F] to-[#D7CCC8] text-white px-6 py-3 rounded-xl shadow-lg border-2 border-[#6D4C41] hover:from-[#8D6E63] hover:to-[#BCAAA4] transform hover:scale-105 transition-all duration-300 dark:border-[#D7CCC8]"
                        >
                            Simpan Buku
                        </button>
                    </div>
                </form>
            </main>

            {/* Footer */}
            <footer className={`${darkMode ? 'bg-[#4E342E] text-white' : 'bg-[#D7CCC8]/80'} backdrop-blur shadow-inner mt-12 py-5 rounded-t-2xl`}>
                <div className="text-center text-sm">
                    © {new Date().getFullYear()} MyLibrary. All rights reserved by Aulia XI Sija 2.
                </div>
            </footer>
        </div>
    );
}
