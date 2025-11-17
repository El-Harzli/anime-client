/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useAnime } from '@context/AnimeContext';
import TitledGridSection from '@components/layouts/TitledGridSection';
import ContinueWatching from '@components/widgets/ContinueWatching';

function FeaturedSection() {
  const { animeData, loading, error } = useAnime();

  const [latestEpisode, setLatestEpisode] = useState();
  const [newAnime, setNewAnime] = useState();
  const [topUpcoming, setTopUpcoming] = useState();

  useEffect(() => {
    if (animeData) {
      setLatestEpisode(animeData.latestEpisode);
      setNewAnime(animeData.newlyAdded);
      setTopUpcoming(animeData.topUpcoming);
    }
  }, [animeData]);

  return (
    <div>
      <ContinueWatching showAll={false} />

      <TitledGridSection
        title="Latest Episodes"
        animeData={latestEpisode}
        endpoint="/recently-updated"
        loading={loading}
      />
      <TitledGridSection title="New On H!Anime" animeData={newAnime} endpoint="/recently-added" loading={loading} />
      <TitledGridSection title="Top Upcoming" animeData={topUpcoming} endpoint="/top-upcoming" loading={loading} />
    </div>
  );
}

export default FeaturedSection;
