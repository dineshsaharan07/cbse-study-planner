'use client';
import { useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  // Google Sign-In
  const signInGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Redirect handled below in onAuthStateChanged
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  // Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard'); // ✅ Redirect after login
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded-xl shadow w-[320px] text-center">
        <h2 className="text-xl font-bold mb-3">Login</h2>
        <button
          onClick={signInGoogle}
          className="px-4 py-2 rounded bg-[color:var(--brand)] text-white hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
