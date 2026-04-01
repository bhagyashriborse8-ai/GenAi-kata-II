import { useSession } from '../context/SessionContext';

export function useCardTracking() {
  const { cards, knownIds, unknownIds, markKnown, markUnknown } = useSession();

  const masteryPercent = cards.length
    ? Math.round((knownIds.size / cards.length) * 100)
    : 0;

  const remaining = cards.filter((c) => !knownIds.has(c.id) && !unknownIds.has(c.id));

  return { knownIds, unknownIds, markKnown, markUnknown, masteryPercent, remaining };
}

