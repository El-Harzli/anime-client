import { createContext, useContext, useEffect, useState } from 'react';
import { useAnimeServers } from './animeServersContext';

const AnimeSourcesContext = createContext();

export const AnimeSourcesProvider = ({ children }) => {
  const { currentServer } = useAnimeServers();
  const [animeSources, setAnimeSources] = useState(null);
  const [isSourcesloading, setIsSourcesLoading] = useState(false);
  const [sourcesError, setSourcesError] = useState(null);

  useEffect(() => {
    if (!currentServer) return;
    const controller = new AbortController();
    const fetchSources = async () => {
      setIsSourcesLoading(true);
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/sources/${currentServer?.id}`;
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch sources');
        const { data } = await res.json();
        setAnimeSources(data);
      } catch (err) {
        if (err.name !== 'AbortError') setSourcesError(err.message);
      } finally {
        setIsSourcesLoading(false);
      }
    };
    fetchSources();
    return () => controller.abort();
  }, [currentServer]);

  return (
    <AnimeSourcesContext.Provider value={{ currentServer, animeSources, isSourcesloading, sourcesError }}>
      {children}
    </AnimeSourcesContext.Provider>
  );
};

export const useAnimeSources = () => {
  return useContext(AnimeSourcesContext);
};
