'use client';
import { DayItem } from '../app/dashboard/page';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function TopicProgressChart({ plan }: { plan: DayItem[] }) {
  const labels = plan.map((d) => `Day ${d.day}`);

  const physics = plan.map((d) => Object.values(d.checkboxes.physics).filter(Boolean).length);
  const chemistry = plan.map((d) => Object.values(d.checkboxes.chemistry).filter(Boolean).length);
  const maths = plan.map((d) => Object.values(d.checkboxes.maths).filter(Boolean).length);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">📊 Subject-wise Progress</h2>
      <Bar
        data={{
          labels,
          datasets: [
            { label: 'Physics', data: physics, backgroundColor: '#f87171' },
            { label: 'Chemistry', data: chemistry, backgroundColor: '#34d399' },
            { label: 'Maths', data: maths, backgroundColor: '#60a5fa' },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: { beginAtZero: true, max: 4 },
          },
        }}
      />
    </div>
  );
}
