import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function PromotionVideosCardSkeleton() {
  const baseColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skeleton-base')
    .trim();
  const highlightColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skeleton-highlight')
    .trim();

  return (
    <article className="flex flex-col rounded-md overflow-hidden">
      {/* Thumbnail placeholder */}
      <div className="w-full h-30 relative">
        <Skeleton
          height="100%"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />

        {/* Play icon placeholder */}
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="rounded-full"
            style={{
              width: '48px',
              height: '48px',
              background: `linear-gradient(90deg, ${baseColor}, ${highlightColor}, ${baseColor})`,
              opacity: 0.4,
              borderRadius: '50%',
            }}
          ></div>
        </div> */}
      </div>

      {/* Title placeholder */}
      <div className="bg-neutral-700 px-2 py-3 h-fit">
        <Skeleton
          width="100%"
          height={16}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>
    </article>
  );
}

export default PromotionVideosCardSkeleton;
