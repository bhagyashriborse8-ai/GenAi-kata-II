import { QuizQuestion } from '../../types';
import MultipleChoice from './MultipleChoice';
import ShortAnswer from './ShortAnswer';
import FeedbackPanel from './FeedbackPanel';
import Button from '../ui/Button';

interface Props {
  question: QuizQuestion;
  isAnswered: boolean;
  evaluating: boolean;
  feedback: { correct: boolean; explanation: string } | null;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  isLast: boolean;
}

export default function QuizCard({ question, isAnswered, evaluating, feedback, onAnswer, onNext, isLast }: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      {question.type === 'multiple-choice' ? (
        <MultipleChoice
          question={question.question}
          options={question.options || []}
          correctAnswer={question.correctAnswer}
          disabled={isAnswered}
          onAnswer={onAnswer}
        />
      ) : (
        <ShortAnswer
          question={question.question}
          disabled={isAnswered}
          loading={evaluating}
          onAnswer={onAnswer}
        />
      )}

      {feedback && <FeedbackPanel correct={feedback.correct} explanation={feedback.explanation} />}

      {isAnswered && (
        <Button onClick={onNext} className="w-full mt-2">
          {isLast ? '🏁 See Results' : 'Next Question →'}
        </Button>
      )}
    </div>
  );
}

