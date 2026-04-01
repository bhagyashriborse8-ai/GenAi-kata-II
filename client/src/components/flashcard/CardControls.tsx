interface Props {
  cardId: string;
  isKnown: boolean;
  isUnknown: boolean;
  onKnown: (id: string) => void;
  onUnknown: (id: string) => void;
}

export default function CardControls({ cardId, isKnown, isUnknown, onKnown, onUnknown }: Props) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onUnknown(cardId)}
        className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all border ${
          isUnknown
            ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-500/30'
            : 'bg-white/5 border-white/10 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/40'
        }`}
      >
        🔁 Still Learning
      </button>
      <button
        onClick={() => onKnown(cardId)}
        className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all border ${
          isKnown
            ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/30'
            : 'bg-white/5 border-white/10 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40'
        }`}
      >
        ✅ I Know This
      </button>
    </div>
  );
}

