export function getWatchUrl(animeId) {
  try {
    const storedData = localStorage.getItem('continueWatching');
    if (!storedData) return `/watch/${animeId}`;

    const continueWatching = JSON.parse(storedData);
    const animeEntry = continueWatching[animeId];

    if (animeEntry && animeEntry.episode) {
      return `/watch/${animeId}?ep=${animeEntry.episode}`;
    }

    return `/watch/${animeId}`;
  } catch (error) {
    console.error('Error reading continueWatching:', error);
    return `/watch/${animeId}`;
  }
}
