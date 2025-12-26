'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard');
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Study Planner</h1>
      <p className="mt-2">Welcome! Let's build your Class 12 board prep site step by step made by DINU.</p>
      <button
        onClick={handleClick}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Let's Go 🚀
      </button>
    </div>
  );
}
