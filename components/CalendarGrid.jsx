// components/CalendarGrid.jsx
import React from 'react';

export default function CalendarGrid({ days, onSelect }) {
  return (
    <div className="grid grid-cols-8 gap-3">
      {days.map((d) => {
        const percent =
          Math.round(Object.values(d.checkboxes).filter(Boolean).length * 25);
        return (
          <button
            key={d.day}
            onClick={() => onSelect(d.day)}
            className="p-3 rounded-lg bg-white shadow hover:shadow-md border"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">Day {d.day}</span>
              <span className="text-xs text-gray-500">{d.date}</span>
            </div>
            <div className="mt-2 text-sm text-gray-700">{d.phase}</div>
            <div className="mt-3 w-full bg-gray-200 rounded h-2">
              <div
                className="h-2 rounded bg-[color:var(--brand)]"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-gray-600">{percent}%</div>
          </button>
        );
      })}
    </div>
  );
}
