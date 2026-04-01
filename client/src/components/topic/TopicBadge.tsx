interface Props { topic: string; onClick?: () => void; active?: boolean; }

export default function TopicBadge({ topic, onClick, active }: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
        active
          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30'
          : 'bg-white/5 border-white/10 text-gray-300 hover:border-indigo-500/50 hover:text-white'
      }`}
    >
      {topic}
    </button>
  );
}

