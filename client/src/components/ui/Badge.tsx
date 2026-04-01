type Color = 'indigo' | 'emerald' | 'rose' | 'amber' | 'sky';

interface Props { label: string; color?: Color; }

const colors: Record<Color, string> = {
  indigo:  'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  emerald: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  rose:    'bg-rose-500/20 text-rose-300 border border-rose-500/30',
  amber:   'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  sky:     'bg-sky-500/20 text-sky-300 border border-sky-500/30',
};

export default function Badge({ label, color = 'indigo' }: Props) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors[color]}`}>
      {label}
    </span>
  );
}

