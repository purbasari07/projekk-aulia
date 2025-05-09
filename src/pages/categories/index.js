import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addCategory = async () => {
    if (!newName.trim()) return;
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    });
    const data = await res.json();
    setCategories([...categories, data]);
    setNewName('');
  };

  const deleteCategory = async (id) => {
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    setCategories(categories.filter(c => c.id !== id));
  };

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEdit = async (id) => {
    if (!editingName.trim()) return;
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editingName }),
    });
    const updated = await res.json();
    setCategories(categories.map(c => c.id === id ? updated : c));
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className={`${darkMode ? 'bg-[#3E2723] text-white' : 'bg-gradient-to-br from-[#FBE9E7] via-[#EFEBE9] to-[#FBE9E7]'} min-h-screen flex flex-col transition-colors duration-500`}>

      {/* Navbar */}
      <nav className={`backdrop-blur ${darkMode ? 'bg-[#4E342E]' : 'bg-[#D7CCC8]/80'} shadow-lg px-6 py-4 sticky top-0 z-50 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#6D4C41] dark:text-[#FFCCBC]">MyLibrary</Link>
          <div className="space-x-6 flex items-center">
            <Link href="/books/navbar" className={`hover:underline transition ${darkMode ? 'text-white' : 'text-[#4E342E]'}`}>Home</Link>
            <Link href="/books/add" className={`hover:underline transition ${darkMode ? 'text-white' : 'text-[#4E342E]'}`}>Tambah Buku</Link>
            <Link href="/categories" className={`hover:underline transition ${darkMode ? 'text-white' : 'text-[#4E342E]'}`}>Categories</Link>
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
      <main className={`flex-grow w-full max-w-3xl mx-auto ${darkMode ? 'bg-[#4E342E]' : 'bg-[#FFFFFF]/80'} backdrop-blur-lg mt-10 rounded-3xl shadow-2xl px-4 sm:px-10 py-12 transition-colors duration-500`}>
        <h1 className={`text-4xl font-extrabold mb-4 text-center ${darkMode ? 'text-white' : 'text-[#4E342E]'} drop-shadow-lg`}>
          Kategori Buku
        </h1>
        <p className={`text-center mb-6 text-lg italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Ketik Fiksi / Non Fiksi
        </p>

        {/* Input Tambah */}
        <div className="flex gap-4 mb-8">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nama kategori baru"
            className="flex-1 px-4 py-2 rounded-xl shadow-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#A1887F]"
          />
          <button
            onClick={addCategory}
            className="bg-gradient-to-r from-[#A1887F] to-[#D7CCC8] text-white px-6 py-2 rounded-xl shadow-md hover:from-[#8D6E63] hover:to-[#BCAAA4] transition-all"
          >
            Tambah
          </button>
        </div>

        {/* List Kategori */}
        <ul className="space-y-6">
          {categories.map(c => (
            <li
              key={c.id}
              className={`p-4 rounded-2xl shadow-md flex justify-between items-center transition-all duration-300 transform hover:scale-[1.02] ${darkMode ? 'bg-[#5D4037] text-white border border-[#6D4C41]' : 'bg-white text-black border border-gray-300'}`}
            >
              {editingId === c.id ? (
                <>
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-1 mr-4 px-3 py-2 rounded-xl border text-black"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(c.id)}
                      className="bg-gradient-to-r from-[#FFCCBC] to-[#D7CCC8] text-black px-4 py-2 rounded-lg shadow hover:from-[#FFAB91] hover:to-[#BCAAA4]"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gradient-to-r from-[#8D6E63] to-[#6D4C41] text-white px-4 py-2 rounded-lg shadow hover:from-[#6D4C41] hover:to-[#4E342E]"
                    >
                      Batal
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="flex-1">{c.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(c.id, c.name)}
                      className="bg-gradient-to-r from-[#FFCCBC] to-[#D7CCC8] text-black px-4 py-2 rounded-lg shadow hover:from-[#FFAB91] hover:to-[#BCAAA4]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="bg-gradient-to-r from-[#8D6E63] to-[#6D4C41] text-white px-4 py-2 rounded-lg shadow hover:from-[#6D4C41] hover:to-[#4E342E]"
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
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
