// components/MotivationBanner.jsx
const quotes = [
  'Small steps, big results.',
  'Consistency beats intensity.',
  'Do the next right thing.',
  'Your future self is watching.',
];

export default function MotivationBanner({ streak }) {
  const quote = quotes[streak % quotes.length];
  const milestone = [7, 14, 21, 30].includes(streak);
  return (
    <div className="p-5 rounded-xl bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--accent)] text-white shadow">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-bold">{quote}</div>
          <div className="mt-1 text-sm">Streak: {streak} days</div>
        </div>
        {milestone && <div className="text-sm font-semibold">Milestone unlocked! Keep going 🔥</div>}
      </div>
    </div>
  );
}
