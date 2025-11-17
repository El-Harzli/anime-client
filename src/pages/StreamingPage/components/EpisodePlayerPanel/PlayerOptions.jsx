import { IoMdExpand } from 'react-icons/io';
import { BiCollapse } from 'react-icons/bi';

import { FaLightbulb } from 'react-icons/fa';
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from 'react-icons/tb';
import { useSearchParams } from 'react-router';
import { useEpisodeListContext } from '@context/episodeListContext';
import { usePlayerOptions } from '@context/playerOptionsContext';

import Skeleton from 'react-loading-skeleton';
import { useEffect } from 'react';

function PlayerOptions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { playerOptions, setPlayerOptions } = usePlayerOptions();
  const { animeEpisodeList, currentEpisode, isEpisodeListLoading } = useEpisodeListContext();

  const currentIndex = animeEpisodeList?.findIndex((ep) => ep.episodeId === currentEpisode?.episodeId);
  const nextEpisode = animeEpisodeList[currentIndex + 1];
  const previousEpisode = animeEpisodeList[currentIndex - 1];

  const handleGoNextEpisode = () => {
    if (nextEpisode) {
      setSearchParams({ ep: nextEpisode.episodeId });
    }
  };
  const handleGoPreviousEpisode = () => {
    if (previousEpisode) {
      setSearchParams({ ep: previousEpisode.episodeId });
    }
  };

  // 👇 Automatically collapse player on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1536) {
        setPlayerOptions((prev) => ({ ...prev, expandPlayer: false }));
      }
    };

    // Run once on mount
    handleResize();

    // Listen for resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setPlayerOptions]);

  return (
    <div className="py-3 px-4 bg-black/40 text-white text-xs flex flex-wrap gap-x-2 gap-y-3">
      <div className="flex gap-x-4 flex-wrap justify-start gap-y-3">
        <div
          onClick={() => setPlayerOptions((prev) => ({ ...prev, expandPlayer: !prev.expandPlayer }))}
          className=" justify-start items-center gap-x-1.5 cursor-pointer hidden 2xl:flex"
        >
          {playerOptions.expandPlayer ? (
            <>
              <BiCollapse className="text-sm" />
              <span>Collapse</span>
            </>
          ) : (
            <>
              <IoMdExpand className="text-sm" />
              <span>Expand</span>
            </>
          )}
        </div>
        {/* <div
          onClick={() => setPlayerOptions((prev) => ({ ...prev, light: !prev.light }))}
          className="flex justify-start items-center gap-x-1.5 cursor-pointer"
        >
          <FaLightbulb />
          <span>Light</span>
          <span className={`${playerOptions.light ? 'text-secondary ' : 'text-red-500'} font-medium`}>
            {playerOptions.light ? 'On' : 'Off'}
          </span>
        </div> */}
        <div
          onClick={() => setPlayerOptions((prev) => ({ ...prev, autoPlay: !prev.autoPlay }))}
          className="flex justify-start items-center gap-x-1.5 cursor-pointer"
        >
          <span className="min-w-fit whitespace-nowrap">Auto Play</span>
          <span className={`${playerOptions.autoPlay ? 'text-secondary ' : 'text-red-500'} font-medium`}>
            {playerOptions.autoPlay ? 'On' : 'Off'}
          </span>
        </div>
        <div
          onClick={() => setPlayerOptions((prev) => ({ ...prev, autoNext: !prev.autoNext }))}
          className="flex justify-start items-center gap-x-1.5 cursor-pointer"
        >
          <span className="min-w-fit whitespace-nowrap">Auto Next</span>
          <span className={`${playerOptions.autoNext ? 'text-secondary ' : 'text-red-500'} font-medium`}>
            {playerOptions.autoNext ? 'On' : 'Off'}
          </span>
        </div>
        <div
          onClick={() => setPlayerOptions((prev) => ({ ...prev, autoSkipIntro: !prev.autoSkipIntro }))}
          className="flex justify-start items-center gap-x-1.5 cursor-pointer"
        >
          <span className="min-w-fit whitespace-nowrap">Auto Skip Intro</span>
          <span className={`${playerOptions.autoSkipIntro ? 'text-secondary ' : 'text-red-500'} font-medium`}>
            {playerOptions.autoSkipIntro ? 'On' : 'Off'}
          </span>
        </div>
      </div>
      <div className="flex gap-x-4 ms-auto">
        {isEpisodeListLoading ? (
          <Skeleton width={150} height={'1.5rem'} baseColor="#ffffff10" highlightColor="#000000" className="mx-auto" />
        ) : (
          <>
            {previousEpisode && (
              <div onClick={handleGoPreviousEpisode} className="flex justify-start items-center gap-x-1.5 cursor-pointer">
                <TbPlayerTrackPrevFilled />
                <span className='leading-tight'>Prev</span>
              </div>
            )}

            {nextEpisode && (
              <div onClick={handleGoNextEpisode} className="flex justify-start items-center gap-x-1.5 cursor-pointer">
                <span className='leading-tight'>Next</span>
                <TbPlayerTrackNextFilled />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerOptions;
