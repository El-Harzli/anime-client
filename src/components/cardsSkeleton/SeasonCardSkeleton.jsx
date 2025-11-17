import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SeasonCardSkeleton() {
  const baseColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skeleton-base')
    .trim();
  const highlightColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skeleton-highlight')
    .trim();

  return (
    <div className="relative h-17 lg:h-15 px-3 py-2 rounded-md flex justify-center items-center overflow-hidden border-2 border-secondary">
      {/* Background placeholder */}
      <Skeleton
        width="100%"
        height="100%"
        baseColor={baseColor}
        highlightColor={highlightColor}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Overlay to simulate blur/dark tint */}
      <div className="absolute inset-0 rounded-md bg-black/40" />

      {/* Text placeholder */}
      <div className="relative z-10 w-10/12">
        <Skeleton
          width="100%"
          height={15}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>
    </div>
  );
}

export default SeasonCardSkeleton;
