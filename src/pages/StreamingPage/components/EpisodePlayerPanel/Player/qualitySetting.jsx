import { renderToStaticMarkup } from 'react-dom/server';
import { MdHighQuality } from 'react-icons/md';

export function setupQualitySelector(hls, art) {
  const cachedQuality = JSON.parse(localStorage.getItem('preferredQuality') || 'null');
  const levels = hls.levels;

  if (!levels || levels.length <= 1) {
    art.setting.add({
      icon: renderToStaticMarkup(<MdHighQuality className="text-xl" />),
      name: 'Quality',
      html: 'Quality',
      tooltip: 'Auto',
      selector: [{ html: 'Auto', levelIndex: -1, default: true }],
      onSelect: () => 'Auto',
    });
    hls.nextLevel = -1;
    return;
  }

  const qualities = [
    { html: 'Auto', levelIndex: -1, default: !cachedQuality || cachedQuality.level === -1 },
    ...levels.map((level, i) => ({
      html: `${level.height}p`,
      levelIndex: i,
      default: cachedQuality?.html === `${level.height}p`,
    })),
  ];

  const currentQuality = qualities.find((q) => q.default) || qualities[0];
  hls.nextLevel = cachedQuality ? cachedQuality.level : -1;

  if (!cachedQuality) {
    localStorage.setItem('preferredQuality', JSON.stringify({ html: 'Auto', level: -1 }));
  }

  art.setting.add({
    icon: renderToStaticMarkup(<MdHighQuality className="text-xl" />),
    name: 'Quality',
    html: 'Quality',
    tooltip: currentQuality.html,
    selector: qualities,
    onSelect(item) {
      hls.nextLevel = item.levelIndex;
      localStorage.setItem('preferredQuality', JSON.stringify({ html: item.html, level: item.levelIndex }));
      return item.html;
    },
  });
}
