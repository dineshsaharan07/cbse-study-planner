// components/DayView.jsx
export default function DayView({ dayData, onToggle }) {
  const { targets, checkboxes } = dayData;
  const items = [
    { key: 'syllabus', label: 'Syllabus' },
    { key: 'revision', label: 'Revision' },
    { key: 'pyq', label: 'PYQ Practice' },
    { key: 'samplePaper', label: 'Sample Paper' },
  ];
  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-bold text-lg">Targets</h3>
        <ul className="mt-2 text-sm text-gray-700">
          <li><strong>Maths:</strong> {targets.Maths}</li>
          <li><strong>Physics:</strong> {targets.Physics}</li>
          <li><strong>Chemistry:</strong> {targets.Chemistry}</li>
          <li><strong>English:</strong> {targets.English}</li>
        </ul>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-bold text-lg">Today’s tasks</h3>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {items.map((it) => (
            <label key={it.key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={checkboxes[it.key]}
                onChange={() => onToggle(it.key)}
                className="w-5 h-5 accent-[color:var(--brand)]"
              />
              <span className="text-sm">{it.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
