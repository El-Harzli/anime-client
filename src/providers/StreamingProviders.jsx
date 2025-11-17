import { EpisodeListProvider } from '@context/episodeListContext';
import { AnimeServersProvider } from '@context/animeServersContext';
import { AnimeSourcesProvider } from '@context/animeSourcesContext';
import { PlayerOptionsProvider } from '@context/playerOptionsContext';
import { AnimeOverviewProvider } from '@context/AnimeOverviewContext';

export function StreamingProviders({ children }) {
  return (
    <EpisodeListProvider>
      <AnimeServersProvider>
        <AnimeSourcesProvider>
          <PlayerOptionsProvider>
            <AnimeOverviewProvider>{children}</AnimeOverviewProvider>
          </PlayerOptionsProvider>
        </AnimeSourcesProvider>
      </AnimeServersProvider>
    </EpisodeListProvider>
  );
}
