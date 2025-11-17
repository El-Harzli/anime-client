import React, { useRef } from 'react';
import { useParams, useSearchParams } from 'react-router';

import { useAnimeSources } from '@context/animeSourcesContext';
import { useEpisodeListContext } from '@context/episodeListContext';
import { usePlayerOptions } from '@context/playerOptionsContext';
import { useAnimeOverview } from '@context/AnimeOverviewContext';

import useArtPlayer from './useArtPlayer';

function VideoPlayer() {
  const artRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: animeId } = useParams();

  const { currentServer, animeSources, isSourcesloading } = useAnimeSources();
  const { animeEpisodeList, currentEpisode } = useEpisodeListContext();
  const { playerOptions } = usePlayerOptions();
  const { animeOverview, isOverviewLoading, overviewError } = useAnimeOverview();

  useArtPlayer({
    artRef,
    animeId,
    animeSources,
    currentServer,
    animeEpisodeList,
    currentEpisode,
    animeOverview,
    playerOptions,
    isSourcesloading,
    isOverviewLoading,
    overviewError,
    setSearchParams,
  });

  return <div ref={artRef} className="w-full aspect-video" />;
}

export default VideoPlayer;
