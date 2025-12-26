'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import confetti from 'canvas-confetti';
import ProgressChart from '../../components/ProgressChart';
import TopicProgressChart from '../../components/TopicProgressChart';
import DailyProgressChart from '../../components/DailyProgressChart';
import DarkModeToggle from '../../components/DarkModeToggle';
import Link from 'next/link';
import Card from '../../components/ui/Card';
import Text from '../../components/ui/Text';
import ProgressBar from '../../components/ui/ProgressBar';
export type DayItem = {
  day: number;
  date: string;
  phase: string;
  topics: {
    physics: string;
    chemistry: string;
    maths: string;
  };
  pyqTargets: {
    physics: string;
    chemistry: string;
    maths: string;
  };
  checkboxes: {
    physics: { syllabus: boolean; revision: boolean; pyq: boolean; samplePaper: boolean };
    chemistry: { syllabus: boolean; revision: boolean; pyq: boolean; samplePaper: boolean };
    maths: { syllabus: boolean; revision: boolean; pyq: boolean; samplePaper: boolean };
  };
};

function generatePlan(startDate: Date, length = 40): DayItem[] {
  const physicsChapters = [
    "Electric Charges & Fields", "Electrostatics", "Current Electricity", "Magnetic Effects of Current",
    "Electromagnetic Induction", "Alternating Current", "Electromagnetic Waves", "Ray Optics",
    "Wave Optics", "Dual Nature of Radiation", "Atoms", "Nuclei", "Semiconductors"
  ];

  const chemistryChapters = [
    "Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics", "Surface Chemistry",
    "Isolation of Elements", "The p-Block Elements", "The d-Block Elements", "Coordination Compounds",
    "Haloalkanes and Haloarenes", "Alcohols, Phenols and Ethers", "Aldehydes, Ketones and Carboxylic Acids",
    "Amines", "Biomolecules", "Polymers", "Chemistry in Everyday Life"
  ];

  const mathsChapters = [
    "Relations and Functions", "Inverse Trigonometric Functions", "Matrices", "Determinants",
    "Continuity and Differentiability", "Application of Derivatives", "Integrals",
    "Application of Integrals", "Differential Equations", "Vectors", "Three Dimensional Geometry",
    "Probability", "Linear Programming"
  ];

  return Array.from({ length }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    return {
      day: i + 1,
      date: date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      phase: i < 20 ? 'Core + PYQ' : 'Revision + Mock',
      topics: {
        physics: physicsChapters[i % physicsChapters.length],
        chemistry: chemistryChapters[i % chemistryChapters.length],
        maths: mathsChapters[i % mathsChapters.length],
      },
      pyqTargets: {
        physics: 'Solve 5 PYQ',
        chemistry: 'Solve 5 PYQ',
        maths: 'Solve 5 PYQ',
      },
      checkboxes: {
        physics: { syllabus: false, revision: false, pyq: false, samplePaper: false },
        chemistry: { syllabus: false, revision: false, pyq: false, samplePaper: false },
        maths: { syllabus: false, revision: false, pyq: false, samplePaper: false },
      },
    };
  });
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [plan, setPlan] = useState<DayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setPlan([]);
        setLoading(false);
        return;
      }
      setUser(u);

      const ref = doc(db, 'users', u.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        const today = new Date();
        const newPlan = generatePlan(today, 40);
        await setDoc(ref, { plan: newPlan, startDate: today.toISOString() });
        setPlan(newPlan);
      } else {
        const data = snap.data();
        setPlan(data.plan || []);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (
      plan.length > 0 &&
      plan.every((d) =>
        ['physics', 'chemistry', 'maths'].every((sub) =>
          Object.values(d.checkboxes[sub as keyof typeof d.checkboxes]).every(Boolean)
        )
      )
    ) {
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
    }

    const s = plan.reduce((acc, d) => {
      const done =
        Object.values(d.checkboxes.physics).every(Boolean) &&
        Object.values(d.checkboxes.chemistry).every(Boolean) &&
        Object.values(d.checkboxes.maths).every(Boolean);
      return acc + (done ? 1 : 0);
    }, 0);
    setStreak(s);
  }, [plan]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center">
        <Text>Loading dashboard...</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <Text size="xl" weight="bold">📊 Study Dashboard</Text>
        <div className="flex gap-3">
          <DarkModeToggle />
          <button
            onClick={() => signOut(auth)}
            className="px-3 py-1.5 rounded-md bg-red-500 text-white text-sm shadow hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Streak */}
      <Text weight="semibold" className="mb-4 text-indigo-600 dark:text-indigo-400">
        🔥 Current Streak: {streak} days
      </Text>

      {/* Banner */}
      <Card className="mb-6">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white p-6 rounded-xl text-center">
          <h2 className="text-xl font-bold">Day {plan.length > 0 ? plan[0].day : 1}</h2>
          <p className="mt-2">Every small step counts — tick your boxes today 🔥</p>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <Text size="lg" weight="bold">📈 Overall Progress</Text>
          <ProgressChart plan={plan} />
        </Card>
        <Card>
          <Text size="lg" weight="bold">📊 Subject-wise Progress</Text>
          <TopicProgressChart plan={plan} />
        </Card>
      </div>

      <Card className="mt-6">
        <Text size="lg" weight="bold">🎯 Today's Completion</Text>
        <DailyProgressChart plan={plan} />
      </Card>

      {/* Day cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {plan.map((d) => {
          const totalChecks =
            Object.values(d.checkboxes.physics).filter(Boolean).length +
            Object.values(d.checkboxes.chemistry).filter(Boolean).length +
            Object.values(d.checkboxes.maths).filter(Boolean).length;
          const percent = Math.round((totalChecks / 12) * 100);

          return (
            <Link key={d.day} href={`/day/${d.day}`} className="block">
              <Card className="hover:shadow-lg transition">
                <div className="flex justify-between text-sm">
                  <Text weight="semibold">Day {d.day}</Text>
                  <Text size="sm" className="text-gray-500 dark:text-gray-400">{d.date}</Text>
                </div>
                <div className="mt-2 text-xs text-ink-900 dark:text-gray-200 space-y-1">
                  <div><span className="font-semibold">Physics:</span> {d.topics.physics}</div>
                  <div><span className="font-semibold">Chemistry:</span> {d.topics.chemistry}</div>
                  <div><span className="font-semibold">Maths:</span> {d.topics.maths}</div>
                </div>
                 
                {/* Progress bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 dark:bg-ink-700 rounded h-2 overflow-hidden">
                    <div
                      className="h-2 rounded bg-brand-500 transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {percent}% complete
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
