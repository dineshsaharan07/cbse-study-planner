'use client';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 shadow hover:scale-105 transition"
    >
      {dark ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}
