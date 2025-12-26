'use client';

export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-ink-700 rounded h-2 overflow-hidden">
      <div
        className="h-2 rounded bg-brand-500 transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
