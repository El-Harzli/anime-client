import Hls from 'hls.js';
import { setupQualitySelector } from './qualitySetting';

function useHlsHandler() {
  function setupHls(video, url, art) {
    if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1,
        maxBufferLength: 30,
        maxBufferSize: 30 * 1000 * 1000,
        maxMaxBufferLength: 30,
      });
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => setupQualitySelector(hls, art));
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    }
  }
  return { setupHls };
}

export default useHlsHandler;
