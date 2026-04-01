interface Props { value: number; max?: number; color?: string; label?: string; }

export default function ProgressBar({ value, max = 100, color = 'bg-indigo-500', label }: Props) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

