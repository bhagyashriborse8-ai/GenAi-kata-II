import ProgressBar from '../ui/ProgressBar';

interface Props {
  topic: string;
  current: number;
  total: number;
  score: number;
}

export default function SessionProgress({ topic, current, total, score }: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-indigo-400 font-semibold truncate max-w-[60%]">📚 {topic}</span>
        <span className="text-emerald-400 font-bold">Score: {score} / {current}</span>
      </div>
      <ProgressBar value={current} max={total} label={`Question ${current} of ${total}`} />
    </div>
  );
}

