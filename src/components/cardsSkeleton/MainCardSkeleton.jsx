import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function MainCardSkeleton() {
  const baseColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skeleton-base')
    .trim();
  const highlightColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skeleton-highlight')
    .trim();

  return (
    <article className="flex flex-col items-start w-full">
      {/* Poster skeleton */}
      <div className="relative w-full h-70"> 
        <Skeleton
          className="w-full h-full rounded-md"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />

        {/* Episode badges skeleton */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          <Skeleton height={20} width={40} baseColor={baseColor} highlightColor={highlightColor} borderRadius={6} />
          <Skeleton height={20} width={40} baseColor={baseColor} highlightColor={highlightColor} borderRadius={6} />
        </div>


      </div>

      {/* Title skeleton */}
      <div className="flex flex-col justify-start w-full gap-1 py-2">
        <Skeleton height={16} width="80%" baseColor={baseColor} highlightColor={highlightColor} />
        
        {/* Meta info skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton height={14} width={40} baseColor={baseColor} highlightColor={highlightColor} />
          <Skeleton height={14} width={40} baseColor={baseColor} highlightColor={highlightColor} />
        </div>
      </div>
    </article>
  );
}

export default MainCardSkeleton;
