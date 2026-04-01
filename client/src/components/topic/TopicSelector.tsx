import { useState } from 'react';
import TopicBadge from './TopicBadge';
import Button from '../ui/Button';

const PRESET_TOPICS = [
  'MERN Stack', 'Angular', 'TypeScript', 'React Hooks', 'Node.js',
  'REST APIs', 'GraphQL', 'Docker', 'Kubernetes', 'AWS Basics',
  'Python', 'SQL & Databases', 'System Design', 'Git & GitHub', 'Data Structures',
];

interface Props {
  onSelect: (topic: string, count: number) => void;
  loading: boolean;
}

export default function TopicSelector({ onSelect, loading }: Props) {
  const [selected, setSelected] = useState('');
  const [custom, setCustom] = useState('');
  const [count, setCount] = useState(10);

  const activeTopic = custom.trim() || selected;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-400 text-sm mb-3">Choose a preset topic:</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_TOPICS.map((t) => (
            <TopicBadge
              key={t}
              topic={t}
              active={selected === t && !custom.trim()}
              onClick={() => { setSelected(t); setCustom(''); }}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-gray-400 text-sm mb-2">…or enter a custom topic:</p>
        <input
          type="text"
          value={custom}
          onChange={(e) => { setCustom(e.target.value); setSelected(''); }}
          placeholder="e.g. Vue.js, Machine Learning, Go lang…"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="text-gray-400 text-sm">Number of flashcards:</label>
        <input
          type="range" min={5} max={20} step={1} value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="accent-indigo-500 flex-1"
        />
        <span className="text-indigo-400 font-bold w-8 text-center">{count}</span>
      </div>

      <Button
        size="lg"
        loading={loading}
        disabled={!activeTopic}
        onClick={() => onSelect(activeTopic, count)}
        className="w-full"
      >
        🚀 Generate Flashcards
      </Button>
    </div>
  );
}

