import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function AnimeOverviewSkeleton() {
  const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-base').trim();
  const highlightColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-highlight').trim();

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <div className="relative flex flex-col w-full px-1 mb-8 xl:flex-row py-7 sm:py-10 sm:px-4 lg:px-0 lg:py-13 2xl:px-20">
        {/* Background Blur */}


        {/* Poster + Info */}
        <div className="flex flex-col items-center justify-start w-full mb-5 sm:flex-row sm:items-start sm:gap-8 lg:gap-10 xl:gap-12 lg:px-10 xl:mb-0">
          {/* Poster */}
          <div className="w-40 md:w-45 shrink-0">
            <Skeleton height={240} borderRadius="0.75rem" />
          </div>

          {/* Info Section */}
          <div className="flex flex-col items-center sm:items-start w-full mt-6 sm:mt-0">
            {/* Title */}
            <div className="w-full mb-4 text-center sm:text-start">
              <Skeleton height={32} width="75%" borderRadius="0.5rem" />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-4 items-center">
              <Skeleton height={25} width={150} />
              <Skeleton height={20} width={40} />
              <Skeleton height={20} width={40} />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mb-4">
              <Skeleton height={38} width={110} className='!rounded-2xl' />
              <Skeleton height={38} width={110} className='!rounded-2xl' />
            </div>

            {/* Description */}
            <div className="hidden sm:block w-full space-y-2">
              <Skeleton count={3} height={14} width="90%" />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[37.5%] lg:px-10 xl:px-3">
          <div className="mb-3 text-sm space-y-3">
            {/* Japanese */}
            <div className="mb-2.5 flex items-center gap-3 w-full">
              <span className="text-neutral-300">Japanese:</span>
              <Skeleton height={14} width={250} borderRadius={4} className="ms-1" />
            </div>

            {/* Aired */}
            <div className="mb-2.5 flex items-center gap-3">
              <span className="text-neutral-300">Aired:</span>
              <Skeleton width={90} height={14} borderRadius={4} />
            </div>

            {/* Premiered */}
            <div className="mb-2.5 flex items-center gap-3">
              <span className="text-neutral-300">Premiered:</span>
              <Skeleton width={100} height={14} borderRadius={4} />
            </div>

            {/* Duration */}
            <div className="mb-2.5 flex items-center gap-3">
              <span className="text-neutral-300">Duration:</span>
              <Skeleton width={80} height={14} borderRadius={4} />
            </div>

            {/* Status */}
            <div className="mb-2.5 flex items-center gap-3">
              <span className="text-neutral-300">Status:</span>
              <Skeleton width={90} height={14} borderRadius={4} />
            </div>

            {/* MAL Score */}
            <div className="mb-2.5 flex items-center gap-3">
              <span className="text-neutral-300">MAL Score:</span>
              <Skeleton width={70} height={14} borderRadius={4} />
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 pt-3 border-y border-gray-700 py-3">
              <span className="text-neutral-300">Genres:</span>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} height={20} width={60} className='!rounded-2xl' />
              ))}
            </div>

            {/* Studios */}
            <div className="mb-2.5 flex items-center gap-3">
              <span className="text-neutral-300">Studios:</span>
              <Skeleton width={120} height={14} borderRadius={4} />
            </div>

            {/* Producers */}
            <div className="mb-2.5 flex items-center gap-3 flex-wrap">
              <span className="text-neutral-300">Producers:</span>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} width={80} height={14} borderRadius={4} className="me-1.5" /> 
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default AnimeOverviewSkeleton;
