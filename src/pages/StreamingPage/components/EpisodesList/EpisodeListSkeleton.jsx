import React from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function EpisodeListSkeleton({ count = 8 }) {
  const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-base').trim();
  const highlightColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-highlight').trim();

  return (
    <div className="w-full flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`flex gap-x-5 xl:gap-x-3 items-center justify-start w-full py-3 px-5 xl:p-3 rounded ${
            i % 2 === 0 ? 'bg-white/10' : 'bg-white/5'
          }`}
        >
          {/* Episode number */}
          <Skeleton width={24} height={16} baseColor="#ffffff10" highlightColor="#ffffff30" />
          {/* Episode title */}
          <Skeleton containerClassName="w-[80%]" width="80%" height={16} baseColor="#ffffff10" highlightColor="#ffffff30" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex gap-x-5 xl:gap-x-3 items-center justify-start w-full py-3 px-5 xl:p-3 bg-white/5 animate-pulse rounded">
        <span className="w-6 h-4 bg-white/20 rounded"></span>
        <span className="w-[80%] h-4 bg-white/20 rounded"></span>
      </div>
    </div>
  );
}

export default EpisodeListSkeleton;
