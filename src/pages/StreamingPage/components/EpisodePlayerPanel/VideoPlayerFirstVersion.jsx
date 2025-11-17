import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import Hls from 'hls.js';
import { MdSubtitles, MdHighQuality } from 'react-icons/md';
import { renderToStaticMarkup } from 'react-dom/server';
import { useParams, useSearchParams } from 'react-router';

import { useAnimeSources } from '@context/animeSourcesContext';
import { useEpisodeListContext } from '@context/episodeListContext';
import { usePlayerOptions } from '@context/playerOptionsContext';
import { useAnimeOverview } from '@context/AnimeOverviewContext';

import 'react-loading-skeleton/dist/skeleton.css';

function VideoPlayer() {
  const artRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { id: animeId } = useParams();
  const { currentServer, animeSources, isSourcesloading } = useAnimeSources();
  const { animeEpisodeList, currentEpisode } = useEpisodeListContext();
  const { playerOptions } = usePlayerOptions();
  const { animeOverview, isOverviewLoading, overviewError } = useAnimeOverview();

  useEffect(() => {
    // Exit early if data not ready
    if (!animeSources?.sources?.[0]?.file || isSourcesloading || isOverviewLoading || overviewError) return;

    const videoUrl = animeSources.sources[0].file;
    const videoType = animeSources.sources[0].type;
    const episodeId = animeSources?.id || videoUrl;
    const proxiedUrl = `${import.meta.env.VITE_API_URL}/proxy?url=${encodeURIComponent(videoUrl)}`;

    const subtitleTracks = animeSources.tracks?.filter((t) => t.kind === 'captions') || [];
    const defaultSubtitle = subtitleTracks.find((t) => t.default) || subtitleTracks[0];

    const cachedQuality = JSON.parse(localStorage.getItem('preferredQuality') || 'null');
    const cachedSubtitle = JSON.parse(localStorage.getItem(`preferredSubtitles:${episodeId}`) || 'null');

    const isSubbed = currentServer?.type === 'sub';
    const isSmallScreen = window.innerWidth < 640;
    const subtitleFontSize = isSmallScreen ? '16px' : '22px';
    const subtitleMargin = isSmallScreen ? '20px' : '32px';

    let hlsInstance;

    // --- Artplayer base configuration ---
    const artOptions = {
      container: artRef.current,
      url: proxiedUrl,
      type: videoType,
      theme: '#ffbade',
      setting: true,
      hotkey: true,
      pip: true,
      fullscreen: true,
      fullscreenWeb: true,
      autoplay: playerOptions.autoPlay,
      miniProgressBar: true,
      mutex: true,
      highlight: [
        { time: animeSources?.intro?.start, text: 'Start Intro' },
        { time: animeSources?.intro?.end, text: 'End Intro' },
        { time: animeSources?.outro?.start, text: 'Start Outro' },
        { time: animeSources?.outro?.end, text: 'End Outro' },
      ],
      customType: {
        hls(video, url) {
          if (Hls.isSupported()) {
            hlsInstance = new Hls({
              startLevel: -1,
              maxBufferLength: 30,
              maxBufferSize: 30 * 1000 * 1000,
              maxMaxBufferLength: 30,
              bufferPrioritize: 'buffered',
            });
            hlsInstance.loadSource(url);
            hlsInstance.attachMedia(video);

            hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
              const levels = hlsInstance.levels;

              if (levels && levels.length > 1) {
                const qualities = [
                  { html: 'Auto', levelIndex: -1, default: !cachedQuality || cachedQuality.level === -1 },
                  ...levels.map((level, i) => ({
                    html: `${level.height}p`,
                    levelIndex: i,
                    default: cachedQuality?.html === `${level.height}p`,
                  })),
                ];

                // Set initial quality
                hlsInstance.nextLevel = cachedQuality ? cachedQuality.level : -1;
                if (!cachedQuality) {
                  localStorage.setItem('preferredQuality', JSON.stringify({ html: 'Auto', level: -1 }));
                }

                const currentQuality = qualities.find((q) => q.default) || qualities[0];

                art.setting.add({
                  icon: renderToStaticMarkup(<MdHighQuality className="text-xl" />),
                  name: 'Quality',
                  html: 'Quality',
                  tooltip: currentQuality.html,
                  selector: qualities,
                  onSelect(item) {
                    hlsInstance.nextLevel = item.levelIndex;
                    localStorage.setItem(
                      'preferredQuality',
                      JSON.stringify({ html: item.html, level: item.levelIndex })
                    );
                    return item.html;
                  },
                });
              } else {
                hlsInstance.nextLevel = -1;
                art.setting.add({
                  icon: renderToStaticMarkup(<MdHighQuality className="text-xl" />),
                  name: 'Quality',
                  html: 'Quality',
                  tooltip: 'Auto',
                  selector: [{ html: 'Auto', levelIndex: -1, default: true }],
                  onSelect: () => 'Auto',
                });
              }
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
          }
        },
        ts(video, url) {
          video.src = url;
        },
      },
    };

    // --- Subtitles base setup ---
    if (isSubbed && subtitleTracks.length > 0) {
      artOptions.subtitle = {
        url: cachedSubtitle?.file || defaultSubtitle?.file,
        escape: false,
        style: { fontSize: subtitleFontSize, 'margin-bottom': subtitleMargin },
      };
    }

    const art = new Artplayer(artOptions);

    // --- Continue Watching Restore ---
    art.on('ready', () => {
      const key = animeId;
      const savedProgress = JSON.parse(localStorage.getItem('continueWatching') || '{}')[key];

      if (savedProgress && savedProgress.episode === currentEpisode?.episodeId) {
        art.currentTime = savedProgress.currentTime;
      }
    });

    // --- Continue Watching Save ---
    art.on('video:timeupdate', () => {
      if (art.currentTime > 5 && Math.floor(art.currentTime) % 10 === 0) {
        const key = animeId;
        const saved = JSON.parse(localStorage.getItem('continueWatching') || '{}');

        saved[key] = {
          animeId,
          episode: currentEpisode?.episodeId,
          latestEpisodeWatched: currentEpisode?.number,
          currentTime: art.currentTime,
          duration: art.duration,
          lastUpdated: Date.now(),
          episodes: animeOverview.details.episodes,
          poster: animeOverview.details.poster,
          title: animeOverview.details.title,
        };

        localStorage.setItem('continueWatching', JSON.stringify(saved));
      }
    });

    // --- Continue Watching Delete ---
    art.on('video:ended', () => {
      const key = animeId;
      const saved = JSON.parse(localStorage.getItem('continueWatching') || '{}');

      if (saved[key]) {
        delete saved[key];
        localStorage.setItem('continueWatching', JSON.stringify(saved));
        console.log(`Progress for ${key} deleted (video ended).`);
      } else {
        console.log('No saved progress to delete.');
      }
    });

    // --- Auto-skip intro/outro ---
    if (playerOptions.autoSkipIntro) {
      const { intro, outro } = animeSources;

      if (intro?.end > 0) {
        art.on('video:timeupdate', () => {
          if (art.currentTime >= intro.start && art.currentTime < intro.end) {
            art.currentTime = intro.end;
          }
        });
      }

      if (outro?.start > 0) {
        art.on('video:timeupdate', () => {
          if (art.currentTime >= outro.start && art.currentTime < outro.end) {
            art.currentTime = outro.end;
          }
        });
      }
    }

    // --- Subtitle Settings ---
    if (isSubbed && subtitleTracks.length > 0) {
      // Subtitles selector
      art.setting.add({
        icon: renderToStaticMarkup(<MdSubtitles className="text-xl" />),
        name: 'Subtitles',
        html: 'Subtitles',
        tooltip: cachedSubtitle?.label || defaultSubtitle?.label || 'Off',
        selector: subtitleTracks.map((t) => ({
          html: t.label,
          url: t.file,
          default: cachedSubtitle?.label === t.label || (!cachedSubtitle && t.default),
        })),
        onSelect(item) {
          art.subtitle.switch(item.url, { name: item.html, escape: false });
          localStorage.setItem(`preferredSubtitles:${episodeId}`, JSON.stringify({ file: item.url, label: item.html }));
          return item.html;
        },
      });

      // Subtitle font style
      const cachedStyle = JSON.parse(localStorage.getItem('preferredSubtitleStyle') || 'null');
      const styleOptions = [
        { html: 'Extra Small', value: '18px' },
        { html: 'Small', value: '22px' },
        { html: 'Medium', value: '28px' },
        { html: 'Large', value: '34px' },
        { html: 'Extra Large', value: '38px' },
      ];

      art.setting.add({
        name: 'CC Font Style',
        html: 'CC Font Style',
        tooltip: cachedStyle?.html || 'Default',
        selector: styleOptions.map((s) => ({ ...s, default: cachedStyle?.value === s.value })),
        onSelect(item) {
          this.tooltip = item.html;
          art.template.$subtitle.style.fontSize = item.value;
          localStorage.setItem('preferredSubtitleStyle', JSON.stringify(item));
          return item.html;
        },
      });

      // Subtitle margin
      const cachedMargin = JSON.parse(localStorage.getItem('preferredSubtitleMargin') || 'null');
      const marginOptions = [5, 10, 15, 20, 25, 30].map((v) => ({ html: `${v}px`, value: `${v}px` }));

      art.setting.add({
        name: 'CC Margin Bottom',
        html: 'CC Margin Bottom',
        tooltip: cachedMargin?.html || '15px',
        selector: marginOptions.map((m) => ({ ...m, default: cachedMargin?.value === m.value })),
        onSelect(item) {
          this.tooltip = item.html;
          art.template.$subtitle.style.marginBottom = item.value;
          localStorage.setItem('preferredSubtitleMargin', JSON.stringify(item));
          return item.html;
        },
      });

      if (cachedStyle) art.template.$subtitle.style.fontSize = cachedStyle.value;
      if (cachedMargin) art.template.$subtitle.style.marginBottom = cachedMargin.value;
    }

    // --- Auto Next Episode ---
    art.on('video:ended', () => {
      if (!playerOptions.autoNext) return;
      const currentIndex = animeEpisodeList?.findIndex((ep) => ep.episodeId === currentEpisode?.episodeId);
      const nextEpisode = animeEpisodeList[currentIndex + 1];
      if (nextEpisode) setSearchParams({ ep: nextEpisode.episodeId });
    });

    // --- Cleanup ---
    return () => {
      try {
        if (hlsInstance) hlsInstance.destroy();
        if (art) art.destroy(false);
      } catch (err) {
        console.error('Error cleaning up Artplayer:', err.message);
      }
    };
  }, [
    animeSources?.sources,
    animeOverview,
    animeId,
    currentServer,
    currentEpisode,
    animeEpisodeList,
    isSourcesloading,
    isOverviewLoading,
    overviewError,
  ]);

  return <div ref={artRef} className="w-full aspect-video" />;
}

export default VideoPlayer;
