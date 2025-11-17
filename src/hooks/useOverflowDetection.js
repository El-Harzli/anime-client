import { useState, useEffect, useRef } from 'react';

function useOverflowDetection(showPreviewCard) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    if (!showPreviewCard) {
      setIsOverflowing(false);
      return;
    }

    let animationFrameId;

    const checkOverflow = () => {
      // ✅ Guard against null (can happen if unmounted too quickly)
      if (!previewRef.current) return;

      const rect = previewRef.current.getBoundingClientRect();
      const isOverflowingRight = rect.right > window.innerWidth;
      setIsOverflowing(isOverflowingRight);
    };

    animationFrameId = requestAnimationFrame(checkOverflow);

    return () => cancelAnimationFrame(animationFrameId);
  }, [showPreviewCard]);

  return { isOverflowing, previewRef };
}

export default useOverflowDetection;
