import { useEffect } from 'react';
import Artplayer from 'artplayer';
import useHlsHandler from './useHlsHandler';
import { setupQualitySelector } from './qualitySetting';
import { setupSubtitleSettings } from './subtitleSetting';
import useContinueWatching from './useContinueWatching';
import useAutoSkipAndNext from './useAutoSkipAndNext';

function useArtPlayer({
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
}) {
  const { setupHls } = useHlsHandler();
  const { setupContinueWatching, restoreContinueWatching } = useContinueWatching();
  const { setupAutoSkip, setupAutoNext } = useAutoSkipAndNext();

  useEffect(() => {
    if (!animeSources?.sources?.[0]?.file || isSourcesloading || isOverviewLoading || overviewError) return;

    const videoUrl = animeSources.sources[0].file;
    const videoType = animeSources.sources[0].type;
    const proxiedUrl = `${import.meta.env.VITE_API_URL}/proxy?url=${encodeURIComponent(videoUrl)}`;
    const subtitleTracks = animeSources.tracks?.filter((t) => t.kind === 'captions') || [];
    const isSubbed = currentServer?.type === 'sub';
    const episodeId = animeSources?.id || videoUrl;

    const art = new Artplayer({
      container: artRef.current,
      url: proxiedUrl,
      type: videoType,
      theme: '#ffbade',
      setting: true,
      hotkey: true,
      pip: true,
      fullscreen: true,
      fullscreenWeb: true,
      autoplay: playerOptions.autoPlay,
      miniProgressBar: true,
      mutex: true,
      highlight: [
        { time: animeSources?.intro?.start, text: 'Start Intro' },
        { time: animeSources?.intro?.end, text: 'End Intro' },
        { time: animeSources?.outro?.start, text: 'Start Outro' },
        { time: animeSources?.outro?.end, text: 'End Outro' },
      ],
      customType: {
        hls(video, url) {
          setupHls(video, url, art);
        },
        ts(video, url) {
          video.src = url;
        },
      },
    });

    // Features
    if (isSubbed && subtitleTracks.length > 0) {
      setupSubtitleSettings(art, subtitleTracks, episodeId);
    }

    restoreContinueWatching(art, animeId, currentEpisode);
    setupContinueWatching(art, animeId, animeOverview, currentEpisode);

    setupAutoSkip(art, playerOptions, animeSources);
    setupAutoNext(art, playerOptions, animeEpisodeList, currentEpisode, setSearchParams);

    return () => {
      try {
        art.destroy(false);
      } catch (err) {
        console.error('Error destroying Artplayer:', err.message);
      }
    };
  }, [animeSources]);
}

export default useArtPlayer;
