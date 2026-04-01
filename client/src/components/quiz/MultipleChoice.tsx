import { useState } from 'react';
import { shuffle } from '../../utils/shuffle';

interface Props {
  question: string;
  options: string[];
  correctAnswer: string;
  disabled: boolean;
  onAnswer: (answer: string) => void;
}

export default function MultipleChoice({ question, options, correctAnswer, disabled, onAnswer }: Props) {
  const [shuffled] = useState(() => shuffle(options));
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (opt: string) => {
    if (disabled || selected) return;
    setSelected(opt);
    onAnswer(opt);
  };

  return (
    <div className="space-y-4">
      <p className="text-xl font-semibold text-white leading-relaxed">{question}</p>
      <div className="grid grid-cols-1 gap-3">
        {shuffled.map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = opt === correctAnswer;
          let style = 'bg-white/5 border-white/10 text-gray-300 hover:border-indigo-500/50';
          if (selected) {
            if (isCorrect) style = 'bg-emerald-900/40 border-emerald-500 text-emerald-300';
            else if (isSelected) style = 'bg-rose-900/40 border-rose-500 text-rose-300';
            else style = 'bg-white/5 border-white/5 text-gray-500 opacity-50';
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
              className={`text-left px-5 py-3 rounded-xl border font-medium text-sm transition-all ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

