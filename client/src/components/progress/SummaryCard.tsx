import ProgressBar from '../ui/ProgressBar';
import { Recommendation } from '../../types';
import { scoreLabel } from '../../utils/formatters';

interface Props {
  topic: string;
  known: number;
  total: number;
  quizScore: number;
  quizTotal: number;
  recommendation: Recommendation | null;
  loadingRec: boolean;
}

export default function SummaryCard({ topic, known, total, quizScore, quizTotal, recommendation, loadingRec }: Props) {
  const masteryPct = total ? Math.round((known / total) * 100) : 0;
  const quizPct    = quizTotal ? Math.round((quizScore / quizTotal) * 100) : 0;

  const masteryColor =
    masteryPct >= 80 ? 'bg-emerald-500' : masteryPct >= 50 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-white">{masteryPct}%</p>
          <p className="text-gray-400 text-sm mt-1">Flashcard Mastery</p>
          <p className="text-gray-500 text-xs">{known} / {total} cards known</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-white">{quizPct}%</p>
          <p className="text-gray-400 text-sm mt-1">Quiz Score</p>
          <p className="text-gray-500 text-xs">{scoreLabel(quizScore, quizTotal)}</p>
        </div>
      </div>

      <ProgressBar value={known} max={total} label="Cards Mastered" color={masteryColor} />

      {/* Recommendations */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
        <h3 className="text-lg font-bold text-white">🤖 AI Recommendations</h3>
        {loadingRec ? (
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <span className="w-5 h-5 border-2 border-indigo-500/40 border-t-indigo-400 rounded-full animate-spin" />
            Generating personalised feedback…
          </div>
        ) : recommendation ? (
          <>
            {recommendation.weakAreas.length > 0 && (
              <div>
                <p className="text-rose-400 font-semibold text-sm mb-2">⚠️ Areas to Improve</p>
                <ul className="list-disc list-inside space-y-1">
                  {recommendation.weakAreas.map((w, i) => (
                    <li key={i} className="text-gray-300 text-sm">{w}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <p className="text-indigo-400 font-semibold text-sm mb-2">💡 Study Tips</p>
              <ul className="list-disc list-inside space-y-1">
                {recommendation.tips.map((tip, i) => (
                  <li key={i} className="text-gray-300 text-sm">{tip}</li>
                ))}
              </ul>
            </div>
            {recommendation.nextTopics.length > 0 && (
              <div>
                <p className="text-emerald-400 font-semibold text-sm mb-2">🚀 Study Next</p>
                <div className="flex flex-wrap gap-2">
                  {recommendation.nextTopics.map((t, i) => (
                    <span key={i} className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-sm">No recommendations available.</p>
        )}
      </div>
    </div>
  );
}

