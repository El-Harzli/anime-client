import { useState, useEffect } from 'react';

export function useResponsiveToastPosition() {
  const [toastPosition, setToastPosition] = useState('bottom-right');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 996px)');
    const handleChange = (e) => setToastPosition(e.matches ? 'bottom-center' : 'bottom-right');

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return toastPosition;
}
