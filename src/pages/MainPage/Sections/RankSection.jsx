/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import { useAnime } from "@context/animeContext";
import AnimeRankList from "@components/layouts/AnimeRankList";

function RankSection() {
  const { animeData, loading, error } = useAnime();

  const [latestCompleted, setLatestCompleted] = useState();
  const [mostFavorite, setMostFavorite] = useState();
  const [mostPopular, setMostPopular] = useState();
  const [topAiring, setTopAiring] = useState();

  useEffect(() => {
    if (animeData) {
      setLatestCompleted(animeData?.recentlyCompleted);
      setTopAiring(animeData?.topAiring);
      setMostPopular(animeData?.mostPopular);
      setMostFavorite(animeData?.mostFavorite);
    }
  }, [animeData]);

  return (
    <section className="pt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8 xl:gap-10 xl:grid-cols-4 my-container mb-7 md:mb-10">
      <AnimeRankList title="Top Airing" animeData={topAiring} endpoint="/top-airing" />
      <AnimeRankList title="Most Popular" animeData={mostPopular} endpoint="/most-popular" />
      <AnimeRankList title="Most Favorite" animeData={mostFavorite} endpoint="/most-favorite" />
      <AnimeRankList title="Latest completed" animeData={latestCompleted} endpoint="/completed" />
    </section>
  );
}

export default RankSection;
