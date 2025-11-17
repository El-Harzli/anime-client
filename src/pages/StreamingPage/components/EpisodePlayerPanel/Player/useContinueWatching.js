function useContinueWatching() {
  const restoreContinueWatching = (art, animeId, currentEpisode) => {
    art.on('ready', () => {
      const savedProgress = JSON.parse(localStorage.getItem('continueWatching') || '{}')[animeId];
      if (savedProgress && savedProgress.episode === currentEpisode?.episodeId) {
        art.currentTime = savedProgress.currentTime;
      }
    });
  };

  const setupContinueWatching = (art, animeId, animeOverview, currentEpisode) => {
    art.on('video:timeupdate', () => {
      if (art.currentTime > 5 && Math.floor(art.currentTime) % 10 === 0) {
        const saved = JSON.parse(localStorage.getItem('continueWatching') || '{}');
        saved[animeId] = {
          animeId,
          episode: currentEpisode?.episodeId,
          latestEpisodeWatched: currentEpisode?.number,
          currentTime: art.currentTime,
          duration: art.duration,
          lastUpdated: Date.now(),
          episodes: animeOverview.details.episodes,
          poster: animeOverview.details.poster,
          title: animeOverview.details.title,
        };
        localStorage.setItem('continueWatching', JSON.stringify(saved));
      }
    });

    art.on('video:ended', () => {
      const saved = JSON.parse(localStorage.getItem('continueWatching') || '{}');
      if (saved[animeId]) {
        delete saved[animeId];
        localStorage.setItem('continueWatching', JSON.stringify(saved));
      }
    });
  };

  return { setupContinueWatching, restoreContinueWatching };
}

export default useContinueWatching;
