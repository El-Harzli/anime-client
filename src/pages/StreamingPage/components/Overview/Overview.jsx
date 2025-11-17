import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useAnimeOverview } from '@context/AnimeOverviewContext';
import DetailsBadges from '@components/shared/DetailsBadges';
import Button from '@components/shared/Button';
import { MdOutlineStar } from 'react-icons/md';
import { BsEmojiGrin, BsEmojiAngry, BsEmojiExpressionless } from 'react-icons/bs';
import OverviewSkeleton from './OverviewSkeleton';

function Overview() {
  const { id } = useParams();
  const { animeOverview, isOverviewLoading, overviewError } = useAnimeOverview();

  const [showDescription, setShowDescription] = useState(false);
  const descRef = useRef(null);

  return (
    <>
      {overviewError && <p className="text-red-500">{overviewError}</p>}
      {isOverviewLoading ? (
        <OverviewSkeleton />
      ) : (
        animeOverview && (
          <div className="pt-8 flex flex-col md:flex-row 2xl:flex-col w-full gap-5">
            <div className="w-full sm:max-w-[400px] sm:min-w-[320px] max-h-fit mx-auto bg-black/30 md:order-2 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between text-white p-3">
                <span className="flex items-center gap-2">
                  <MdOutlineStar className="text-yellow-300 text-lg" />
                  9.1
                </span>
                <p className="font-medium text-sm">Vote now</p>
              </div>
              <div className="text-white text-center my-3 text-sm">What do you think about this anime?</div>
              <div className="w-full grid grid-cols-3">
                <div className="w-full bg-white/85 hover:bg-white px-2 py-3 cursor-pointer flex flex-col items-center gap-1">
                  <BsEmojiAngry className="bg-yellow-300 rounded-full text-xl" />
                  <p className="font-semibold">Boring</p>
                </div>
                <div className="w-full bg-white/85 hover:bg-white px-2 py-3 cursor-pointer flex flex-col items-center gap-1">
                  <BsEmojiExpressionless className="bg-yellow-300 rounded-full text-xl" />
                  <p className="font-semibold">Okay</p>
                </div>
                <div className="w-full bg-white/85 hover:bg-white px-2 py-3 cursor-pointer flex flex-col items-center gap-1">
                  <BsEmojiGrin className="bg-yellow-300 rounded-full text-xl" />
                  <p className="font-semibold">Amazing</p>
                </div>
              </div>
            </div>
            <div className="flex gap-x-4 2xl:flex-col">
              <div className="w-25 md:w-30 2xl:w-25 shrink-0 mb-7">
                <img className="object-contain w-full" src={animeOverview?.details?.poster} alt="" />
              </div>
              <div>
                <h2
                  className="text-white font-medium leading-snug text-lg md:text-xl xl:text-2xl line-clamp-3 mb-4 cursor-pointer"
                >
                  {animeOverview?.details?.title}
                </h2>
                <DetailsBadges
                  rating={animeOverview?.details?.rating}
                  quality={animeOverview?.details?.quality}
                  sub={animeOverview?.details?.episodes?.sub}
                  dub={animeOverview?.details?.episodes?.dub}
                  type={animeOverview?.details?.type}
                  duration={animeOverview?.details?.duration}
                />
                <p
                  ref={descRef}
                  className="text-white text-sm leading-snug max-h-[6.875em] overflow-y-auto mb-5 2xl:pe-1"
                >
                  {showDescription
                    ? animeOverview?.details?.description
                    : animeOverview?.details?.description?.slice(0, 250) + '...'}
                  <span
                    className="text-[13px] font-semibold text-white transition-colors duration-300 cursor-pointer ps-2 hover:text-secondary"
                    onClick={() => setShowDescription((prev) => !prev)}
                  >
                    {showDescription ? '- Less' : '+ More'}
                  </span>
                </p>
                <Button
                  to={`/details/${id}`}
                  label="View details"
                  customCss="bg-white text-black text-xs w-fit px-1 py-1 rounded-2xl font-semibold"
                />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Overview;
