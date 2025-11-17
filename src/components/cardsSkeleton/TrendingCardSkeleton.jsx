import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TrendingCardSkeleton({ index }) {
  const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-base').trim();
  const highlightColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-highlight').trim();
  return (
    <div className="relative">
      <article className="relative flex gap-1 h-50 md:h-55 lg:h-60 xl:h-65 w-full">
        {/* Left side — vertical title + index (desktop) */}
        <div className="hidden sm:flex flex-col-reverse gap-4 items-center">
          {/* Index number placeholder */}
          <Skeleton width={20} height={16} baseColor={baseColor} highlightColor={highlightColor} />
          {/* Vertical title placeholder */}
          <div className="vertical-shimmer w-[14px] h-[160px]"></div>

        </div>

        {/* Index badge (mobile only) */}
        <div className="absolute size-7 bg-white text-black text-center font-bold flex items-center justify-center sm:hidden z-1">
          {String(index).padStart(2, '0')}
        </div>

        {/* Image placeholder */}
        <div className="w-full h-full">
          <Skeleton className="h-full w-full" baseColor={baseColor} highlightColor={highlightColor} />
        </div>
      </article>
    </div>
  );
}

export default TrendingCardSkeleton;
