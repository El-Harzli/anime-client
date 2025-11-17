import EpisodesList from './components/EpisodesList/EpisodesList';
import EpisodePlayerPanel from './components/EpisodePlayerPanel/EpisodePlayerPanel';
import Overview from './components/Overview/Overview';
import { usePlayerOptions } from '@context/playerOptionsContext';

function StreamingPage() {
  const { playerOptions } = usePlayerOptions();

  return (
    <div className="my-container">
      <div className="w-full py-5 mx-auto lg:w-[90%] xl:w-[95%] 2xl:w-[100%]">
        <div
          className={`
            grid grid-cols-1 grid-rows-[auto_auto_auto]
            xl:grid-cols-[1fr_3fr] xl:grid-rows-[auto_auto]
            ${playerOptions.expandPlayer
              ? '2xl:grid-cols-[0.85fr_4.15fr]'
              : '2xl:grid-cols-[0.85fr_3fr_1.15fr]'
            }
            2xl:grid-rows-[auto]
          `}
        >
          <div className="bg-black/50 order-2 xl:order-1 xl:col-span-1 xl:row-span-1 2xl:order-1 2xl:col-span-1">
            <EpisodesList />
          </div>

          <div className="flex flex-col order-1 xl:order-2 xl:row-span-1 xl:col-span-1 2xl:order-2 2xl:col-span-1">
            <EpisodePlayerPanel />
          </div>

          {!playerOptions.expandPlayer && (
            <div className="order-3 xl:order-3 xl:row-span-1 xl:col-span-2 2xl:order-3 2xl:col-span-1 2xl:ps-4">
              <Overview />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StreamingPage;
