import { createContext, useContext, useEffect, useState } from 'react';

const PlayerOptionsContext = createContext();

const defaultPlayerOptions = {
  expandPlayer: false,
  light: true,
  autoPlay: true,
  autoNext: true,
  autoSkipIntro: true,
};

export const PlayerOptionsProvider = ({ children }) => {
  const [playerOptions, setPlayerOptions] = useState(() => {
    const stored = localStorage.getItem('playerOptions');
    return stored ? JSON.parse(stored) : defaultPlayerOptions;
  });

  useEffect(() => {
    localStorage.setItem('playerOptions', JSON.stringify(playerOptions));
  }, [playerOptions]);

  return (
    <PlayerOptionsContext.Provider value={{ playerOptions, setPlayerOptions }}>
      {children}
    </PlayerOptionsContext.Provider>
  );
};

export const usePlayerOptions = () => {
  return useContext(PlayerOptionsContext);
};
