'use client';
import { DayItem } from '../app/dashboard/page';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

export default function ProgressChart({ plan }: { plan: DayItem[] }) {
  const labels = plan.map((d) => `Day ${d.day}`);
  const data = plan.map((d) => {
    const total =
      Object.values(d.checkboxes.physics).filter(Boolean).length +
      Object.values(d.checkboxes.chemistry).filter(Boolean).length +
      Object.values(d.checkboxes.maths).filter(Boolean).length;
    return Math.round((total / 12) * 100); // 12 total checkboxes per day
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">📈 Overall Progress</h2>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: 'Completion %',
              data,
              borderColor: '#6366f1',
              backgroundColor: '#a5b4fc',
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: { beginAtZero: true, max: 100 },
          },
        }}
      />
    </div>
  );
}
