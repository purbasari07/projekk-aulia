import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BookForm from '../../components/BookFrom';
import Link from 'next/link';

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const _getBookById = async () => {
    if (id) {
      const res = await fetch(`/api/books/${id}`);
      const data = await res.json();
      setBook(data);
    }
  };

  useEffect(() => {
    _getBookById();
    console.log(book, "ini book");
  }, [id]);

  const updateBook = async (data) => {
    await fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    router.push('/books');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!book) return <p>Loading...</p>;

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
      <main className={`flex-grow w-full max-w-7xl mx-auto ${darkMode ? 'bg-[#4E342E]' : 'bg-[#FFFFFF]/80'} backdrop-blur-lg mt-10 rounded-3xl shadow-2xl px-4 sm:px-10 py-12`}>
        <h1 className={`text-5xl font-extrabold mb-6 text-center ${darkMode ? 'text-white' : 'text-[#4E342E]'} drop-shadow-lg`}>
          ✏️ Edit Buku
        </h1>

        {/* Book Edit Form */}
        <div className="space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-xl font-medium text-gray-700 dark:text-white">Judul Buku</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={book.title}
              className="mt-2 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-[#6D4C41] dark:text-white"
            />
          </div>

          {/* Author Input */}
          <div>
            <label htmlFor="author" className="block text-xl font-medium text-gray-700 dark:text-white">Penulis</label>
            <input
              type="text"
              id="author"
              name="author"
              defaultValue={book.author}
              className="mt-2 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-[#6D4C41] dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={() => {
                const title = document.getElementById('title').value;
                const author = document.getElementById('author').value;
                updateBook({ title, author });
              }}
              className="w-full py-3 mt-6 bg-[#6D4C41] text-white text-lg rounded-md hover:bg-[#5D4037] transition"
            >
              Submit
            </button>
          </div>
        </div>
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
