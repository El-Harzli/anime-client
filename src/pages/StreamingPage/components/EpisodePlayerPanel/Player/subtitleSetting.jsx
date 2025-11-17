import { renderToStaticMarkup } from 'react-dom/server';
import { MdSubtitles } from 'react-icons/md';

export function setupSubtitleSettings(art, subtitleTracks) {
  // --- Read global subtitle preference ---
  const cachedSubtitleLanguage = JSON.parse(localStorage.getItem('preferredSubtitlesLanguage') || 'null');

  // --- Determine which subtitle to load ---
  const defaultSubtitle =
    subtitleTracks.find((t) => cachedSubtitleLanguage?.label === t.label) ||
    subtitleTracks.find((t) => t.default) ||
    subtitleTracks[0];

  // --- Create subtitles menu ---
  art.setting.add({
    icon: renderToStaticMarkup(<MdSubtitles className="text-xl" />),
    name: 'Subtitles',
    html: 'Subtitles',
    tooltip: defaultSubtitle?.label || cachedSubtitleLanguage?.label || 'Off',
    selector: subtitleTracks.map((t) => ({
      html: t.label,
      url: t.file,
      default: cachedSubtitleLanguage?.label === t.label || (!cachedSubtitleLanguage && t.default),
    })),
    onSelect(item) {
      art.subtitle.switch(item.url, { name: item.html, escape: false });
      localStorage.setItem(
        'preferredSubtitlesLanguage',
        JSON.stringify({ file: item.url, label: item.html })
      );
      return item.html;
    },
  });

  // --- Apply cached/default subtitle immediately ---
  if (defaultSubtitle) {
    art.subtitle.switch(defaultSubtitle.file, { name: defaultSubtitle.label, escape: true });
  }

  // --- Subtitle Style ---
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

  // --- Subtitle Margin ---
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

  // --- Apply saved styles immediately ---
  if (cachedStyle) art.template.$subtitle.style.fontSize = cachedStyle.value;
  if (cachedMargin) art.template.$subtitle.style.marginBottom = cachedMargin.value;
}
