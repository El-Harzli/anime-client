import React from 'react';

function OverviewSkeleton() {
  return (
    <div className="pt-8 flex flex-col md:flex-row 2xl:flex-col w-full gap-5 animate-pulse">
      {/* Right Side Card */}
      <div className="max-w-[400px] min-w-[320px] max-h-fit mx-auto bg-black/30 md:order-2 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between text-white p-3">
          <div className="h-4 w-16 bg-gray-500/30 rounded"></div>
          <div className="h-4 w-20 bg-gray-500/30 rounded"></div>
        </div>
        <div className="my-3 h-4 w-3/4 mx-auto bg-gray-500/30 rounded"></div>
        <div className="grid grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="px-2 py-4 flex flex-col items-center gap-2">
              <div className="h-8 w-8 bg-gray-500/30 rounded-full"></div>
              <div className="h-3 w-10 bg-gray-500/30 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Left Side Overview */}
      <div className="flex gap-x-4 2xl:flex-col">
        <div className="w-25 md:w-30 2xl:w-25 shrink-0 mb-7">
          <div className="aspect-[3/4] bg-gray-500/30 rounded-md"></div>
        </div>

        <div className="flex-1">
          <div className="h-6 bg-gray-500/30 w-3/4 rounded mb-4"></div>
          <div className="flex gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-5 w-14 bg-gray-500/30 rounded-full"></div>
            ))}
          </div>
          <div className="space-y-2 mb-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-3 bg-gray-500/30 rounded w-full"></div>
            ))}
          </div>
          <div className="h-6 w-24 bg-gray-500/30 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}

export default OverviewSkeleton;
