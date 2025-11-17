import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CastCardSkeleton() {
  const baseColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skeleton-base')
    .trim();
  const highlightColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skeleton-highlight')
    .trim();

  return (
    <article className="w-full rounded-md bg-white/15 backdrop-blur-md flex items-center justify-between py-3 px-2 gap-x-3">
      {/* Character info (left side) */}
      <div className="max-w-40 flex">
        <div className="flex justify-start items-center gap-x-2">
          {/* Character image */}
          <Skeleton
            circle
            width={40}
            height={40}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />

          {/* Character name and role */}
          <div className="text-xs flex flex-col gap-y-1">
            <Skeleton
              width={90}
              height={10}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <Skeleton
              width={70}
              height={10}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
        </div>
      </div>

      {/* Voice actor info (right side) */}
      <div className="max-w-40 flex">
        <div className="flex justify-end items-center gap-x-2">
          {/* Voice actor text */}
          <div className="text-xs flex flex-col gap-y-1">
            <Skeleton
              width={90}
              height={10}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <Skeleton
              width={70}
              height={10}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>

          {/* Voice actor image */}
          <Skeleton
            circle
            width={40}
            height={40}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div>
      </div>
    </article>
  );
}

export default CastCardSkeleton;
