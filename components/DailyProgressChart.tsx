'use client';
import { DayItem } from '../app/dashboard/page';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DailyProgressChart({ plan }: { plan: DayItem[] }) {
  // Guard: if plan is not loaded yet or empty, show a placeholder
  if (!Array.isArray(plan) || plan.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">🎯 Today's Completion</h2>
        <div className="text-sm text-gray-600 dark:text-gray-300">No data yet. Complete some tasks to see progress.</div>
      </div>
    );
  }

  // Choose the current day card (you can change this to latest completed or by date)
  const latest = plan[0];

  // Extra guard: ensure structure exists
  const physicsChecks = latest?.checkboxes?.physics ?? { syllabus: false, revision: false, pyq: false, samplePaper: false };
  const chemistryChecks = latest?.checkboxes?.chemistry ?? { syllabus: false, revision: false, pyq: false, samplePaper: false };
  const mathsChecks = latest?.checkboxes?.maths ?? { syllabus: false, revision: false, pyq: false, samplePaper: false };

  const total =
    Object.values(physicsChecks).filter(Boolean).length +
    Object.values(chemistryChecks).filter(Boolean).length +
    Object.values(mathsChecks).filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
        🎯 Today's Completion — Day {latest.day} ({latest.date})
      </h2>
      <Doughnut
        data={{
          labels: ['Completed', 'Remaining'],
          datasets: [
            {
              data: [total, 12 - total],
              backgroundColor: ['#10b981', '#e5e7eb'],
              borderWidth: 0,
            },
          ],
        }}
        options={{
          plugins: {
            legend: { display: true, position: 'bottom' },
          },
          cutout: '70%',
        }}
      />
      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Completed {total} of 12 tasks across Physics, Chemistry, and Maths.
      </div>
    </div>
  );
}
