'use client';
import { auth } from '../../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function LoginPage() {
  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded-xl shadow w-[320px] text-center">
        <h2 className="text-xl font-bold mb-3">Login</h2>
        <button onClick={signInGoogle} className="px-4 py-2 rounded bg-[color:var(--brand)] text-white">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
