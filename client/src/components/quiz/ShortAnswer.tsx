import { useState } from 'react';
import Button from '../ui/Button';

interface Props {
  question: string;
  disabled: boolean;
  loading: boolean;
  onAnswer: (answer: string) => void;
}

export default function ShortAnswer({ question, disabled, loading, onAnswer }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value.trim()) return;
    onAnswer(value.trim());
  };

  return (
    <div className="space-y-4">
      <p className="text-xl font-semibold text-white leading-relaxed">{question}</p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        rows={4}
        placeholder="Type your answer here…"
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition resize-none disabled:opacity-50"
      />
      <Button
        onClick={handleSubmit}
        disabled={!value.trim() || disabled}
        loading={loading}
        className="w-full"
      >
        Submit Answer
      </Button>
    </div>
  );
}

