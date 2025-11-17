/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  // const API_URL = "http://localhost:3030/api/v1/home";

  const ENDPOINT = import.meta.env.VITE_API_URL + '/home';

  const [animeData, setAnimeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const fetchAnime = async () => {
      try {
        const res = await fetch(ENDPOINT, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch data');
        const { data } = await res.json();
        setAnimeData(data);
        requestAnimationFrame(() => setLoading(false));
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAnime();

    return () => {
      // console.log('Cleanup called. Abort fetching anime data...');
      controller.abort();
    };
  }, []);

  return <AnimeContext.Provider value={{ animeData, loading, error }}>{children}</AnimeContext.Provider>;
};

export const useAnime = () => {
  return useContext(AnimeContext);
};
