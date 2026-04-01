interface Props { correct: boolean; explanation: string; }

export default function FeedbackPanel({ correct, explanation }: Props) {
  return (
    <div className={`rounded-xl p-4 border mt-4 ${
      correct
        ? 'bg-emerald-900/30 border-emerald-500/40 text-emerald-300'
        : 'bg-rose-900/30 border-rose-500/40 text-rose-300'
    }`}>
      <div className="flex items-center gap-2 mb-2 font-bold text-base">
        {correct ? '✅ Correct!' : '❌ Incorrect'}
      </div>
      <p className="text-sm leading-relaxed opacity-90">{explanation}</p>
    </div>
  );
}

