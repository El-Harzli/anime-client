/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';

const EpisodeListContext = createContext();

export const EpisodeListProvider = ({ children }) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [animeEpisodeList, setAnimeEpisodeList] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isEpisodeListLoading, setIsEpisodeListLoading] = useState(true);
  const [episodeListError, setEpisodeListError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    const fetchAnimeEpisodes = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/watch/${id}`;
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch anime episodes');
        const { data } = await res.json();
        setAnimeEpisodeList(data);
        // If no ?ep= in URL, set first episode
        if (!searchParams.get('ep') && data.length > 0) {
          setSearchParams({ ep: data[0].episodeId });
        }
      } catch (err) {
        if (err.name !== 'AbortError') setEpisodeListError(err.message);
      } finally {
        setIsEpisodeListLoading(false);
      }
    };
    fetchAnimeEpisodes();
    return () => controller.abort();
  }, [id]);
  // }, [id, searchParams, setSearchParams]);

  useEffect(() => {
    if (!searchParams || animeEpisodeList.length === 0) return;
    const currentEpId = searchParams.get('ep');
    const matchedEpisode = animeEpisodeList.find((e) => e.episodeId === currentEpId);
    setCurrentEpisode(matchedEpisode || null);
  }, [searchParams, animeEpisodeList]);

  return (
    <EpisodeListContext.Provider value={{ animeEpisodeList, currentEpisode, isEpisodeListLoading, episodeListError }}>
      {children}
    </EpisodeListContext.Provider>
  );
};

export const useEpisodeListContext = () => {
  return useContext(EpisodeListContext);
};
