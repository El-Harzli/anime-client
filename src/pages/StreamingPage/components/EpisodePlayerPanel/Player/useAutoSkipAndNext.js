function useAutoSkipAndNext() {
  const setupAutoSkip = (art, playerOptions, animeSources) => {
    if (!playerOptions.autoSkipIntro) return;
    const { intro, outro } = animeSources;

    art.on('video:timeupdate', () => {
      if (intro?.start && intro?.end && art.currentTime >= intro.start && art.currentTime < intro.end) {
        art.currentTime = intro.end;
      }
      if (outro?.start && outro?.end && art.currentTime >= outro.start && art.currentTime < outro.end) {
        art.currentTime = outro.end;
      }
    });
  };

  const setupAutoNext = (art, playerOptions, animeEpisodeList, currentEpisode, setSearchParams) => {
    if (!playerOptions.autoNext) return;
    art.on('video:ended', () => {
      const currentIndex = animeEpisodeList?.findIndex((ep) => ep.episodeId === currentEpisode?.episodeId);
      const nextEpisode = animeEpisodeList[currentIndex + 1];
      if (nextEpisode) setSearchParams({ ep: nextEpisode.episodeId });
    });
  };

  return { setupAutoSkip, setupAutoNext };
}

export default useAutoSkipAndNext;
