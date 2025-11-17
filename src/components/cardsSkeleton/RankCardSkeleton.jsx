import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function RankCardSkeleton() {
  const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-base').trim();
  const highlightColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-highlight').trim();

  return (
    <article className="flex py-5 h-30 gap-6 justify-start items-center w-full">
      {/* Poster skeleton */}
      <div className="h-20 w-15 relative shrink-0">
        <Skeleton className="h-full w-full rounded-md" baseColor={baseColor} highlightColor={highlightColor} />
      </div>

      {/* Text + badges skeleton */}
      <div className="flex flex-col flex-1 gap-2 w-full">
        {/* Title skeleton */}
        <Skeleton height={16} width="80%" baseColor={baseColor} highlightColor={highlightColor} />

        {/* Badges skeleton */}
        <div className="flex gap-2 mt-2">
          <Skeleton height={20} width={40} baseColor={baseColor} highlightColor={highlightColor} borderRadius={4} />
          <Skeleton height={20} width={40} baseColor={baseColor} highlightColor={highlightColor} borderRadius={4} />
        </div>
      </div>
    </article>
  );
}

export default RankCardSkeleton;
