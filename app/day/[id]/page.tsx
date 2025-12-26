'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { DayItem } from '../../dashboard/page';
import Link from 'next/link';

export default function DayPage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [dayData, setDayData] = useState<DayItem | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (u) => {
      if (!u) return;
      setUser(u);
      const ref = doc(db, 'users', u.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const plan = snap.data().plan as DayItem[];
        const day = plan.find((d) => d.day === Number(id));
        setDayData(day || null);
      }
    });
  }, [id]);

  const toggle = async (
    subject: 'physics' | 'chemistry' | 'maths',
    key: keyof DayItem['checkboxes']['physics']
  ) => {
    if (!user || !dayData) return;
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    const plan = snap.data().plan as DayItem[];
    const index = plan.findIndex((d) => d.day === dayData.day);

    // ✅ Toggle only the subject-specific checkbox
    plan[index].checkboxes[subject][key] = !plan[index].checkboxes[subject][key];

    await setDoc(ref, { plan });
    setDayData(plan[index]);
  };

  if (!dayData) return <div className="p-6 text-center">Loading day...</div>;

  return (
    <div className="min-h-screen p-6">
      <Link href="/dashboard" className="text-sm text-indigo-600 underline mb-4 block">
        ← Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold text-indigo-600 mb-2">
        📅 Day {dayData.day} — {dayData.date}
      </h1>
      <div className="text-sm text-gray-600 mb-4">{dayData.phase}</div>

      {(['physics', 'chemistry', 'maths'] as const).map((subject) => (
        <div key={subject} className="border rounded p-3 shadow mb-4">
          <div className="font-semibold text-gray-800 capitalize">{subject}</div>
          <div className="text-sm text-gray-700 mb-2">{dayData.topics[subject]}</div>
          <div className="text-xs text-gray-500 mb-2">{dayData.pyqTargets[subject]}</div>

          <div className="flex gap-3 text-sm">
            {(['syllabus', 'revision', 'pyq', 'samplePaper'] as const).map((key) => (
              <label key={key} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={dayData.checkboxes[subject][key]}
                  onChange={() => toggle(subject, key)}
                />
                {key}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
