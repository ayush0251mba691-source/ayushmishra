export function VegBadge({ isVeg, size = 'sm' }: { isVeg: boolean; size?: 'sm' | 'md' }) {
  const boxSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5';

  if (isVeg) {
    return (
      <span
        title="100% Vegetarian"
        className={`inline-flex items-center justify-center border border-emerald-600 bg-white rounded-sm ${boxSize} shrink-0`}
      >
        <span className={`rounded-full bg-emerald-600 ${dotSize}`} />
      </span>
    );
  }

  return (
    <span
      title="Non-Vegetarian"
      className={`inline-flex items-center justify-center border border-red-700 bg-white rounded-sm ${boxSize} shrink-0`}
    >
      <span className={`rounded-full bg-red-700 ${dotSize}`} />
    </span>
  );
}
