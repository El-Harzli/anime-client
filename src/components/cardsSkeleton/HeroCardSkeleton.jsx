import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function HeroCardSkeleton() {
  const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-base').trim();
  const highlightColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-highlight').trim();
  return (
    <div className="relative w-full h-full">
      {/* Background image placeholder */}
      <div className="absolute top-0 right-0 w-full h-full lg:w-9/10 xl:w-8/10 2xl:w-7/10">
        <div className="overflow-hidden relative w-full h-full after:content-[''] after:absolute after:inset-[0] after:z-1 after:pointer-events-none after:[background:radial-gradient(transparent,rgb(32,31,49)_80%,rgb(32,31,49)_85%,rgb(32,31,49)_100%)]">
          <Skeleton height="100%" baseColor={baseColor} highlightColor={highlightColor} />
        </div>
      </div>

      {/* Text and info section */}
      <div className="absolute bottom-3 left-0 w-full z-1 ps-4 pe-20 md:ps-10 md:w-1/2 md:pe-0">
        <Skeleton width={100} height={16} baseColor={baseColor} highlightColor={highlightColor} className="mb-3" />
        <div className="md:hidden ">
          <Skeleton width="70%" height={22} baseColor={baseColor} highlightColor={highlightColor} className="mb-6 " />
        </div>
        <div className="hidden md:block xl:hidden ">
          <Skeleton width="90%" height={40} baseColor={baseColor} highlightColor={highlightColor} className="mb-6 " />
        </div>
        <div className="hidden xl:block ">
          <Skeleton width="90%" height={50} baseColor={baseColor} highlightColor={highlightColor} className="mb-6 " />
        </div>

        {/* Info row */}
        <div className="hidden md:flex mb-4 justify-start items-center gap-4">
          <Skeleton width={50} height={20} baseColor={baseColor} highlightColor={highlightColor} />
          <Skeleton width={50} height={20} baseColor={baseColor} highlightColor={highlightColor} />
          <Skeleton width={100} height={20} baseColor={baseColor} highlightColor={highlightColor} />
          <Skeleton width={30} height={20} baseColor={baseColor} highlightColor={highlightColor} />
          <Skeleton width={90} height={20} baseColor={baseColor} highlightColor={highlightColor} />
        </div>

        {/* Description */}
        <div className="hidden md:block mb-8">
          <Skeleton count={1} baseColor={baseColor} highlightColor={highlightColor} className="mb-2" />
          <Skeleton count={1} baseColor={baseColor} highlightColor={highlightColor} className="mb-2" />
          <div className="hidden xl:block">
            <Skeleton count={1} baseColor={baseColor} highlightColor={highlightColor} className="mb-2" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-start gap-3">
          <Skeleton
            width={120}
            height={40}
            baseColor={baseColor}
            highlightColor={highlightColor}
            className="!rounded-3xl"
          />
          <Skeleton
            width={100}
            height={40}
            baseColor={baseColor}
            highlightColor={highlightColor}
            className="!rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroCardSkeleton;
