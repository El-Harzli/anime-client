/* eslint-disable no-unused-vars */
import { FaClosedCaptioning, FaMicrophone } from 'react-icons/fa';
import { useAnimeServers } from '../../../../context/animeServersContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SourceSelector() {
  const { animeServers, currentServer, setCurrentServer, isServersLoading, serversError, currentEpisode } =
    useAnimeServers();

  // Handle error state
  if (serversError) {
    return (
      <div className="w-full p-4 bg-black/40 text-sm font-medium text-red-500 text-center">
        <p>Failed to load servers. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 pb-4 bg-black/40 text-sm font-medium">
      <div className="md:flex md:rounded-md overflow-hidden">
        {/* Left panel */}
        <div className=" pt-4 pb-5 md:bg-secondary md:px-4 md:py-2 md:max-w-[260px]">
          <p className="text-white/80 text-center md:text-black">You are watching</p>
          <p className="text-secondary text-center md:text-black my-2 font-semibold">
            {isServersLoading ? (
              <Skeleton
                width={120}
                height={'1.5rem'}
                baseColor="#e487b7"
                highlightColor="#630b39"
                className="mx-auto"
              />
            ) : (
              <>
                {currentEpisode?.isFiller ? '👻 Filler ' : ''} Episode {currentEpisode?.number}
              </>
            )}
          </p>
          <p className="text-white/80 text-center md:text-black">
            If current server doesn't work please try other servers beside.
          </p>
        </div>

        {/* Right panel */}
        <div className="bg-accent/40 rounded-xs w-full grid gap-2 px-4 py-2">
          {/* SUB Section */}
          <div className="flex items-center justify-start gap-3 flex-wrap">
            {isServersLoading ? (
              <>
                <Skeleton width={50} height={25} baseColor="#201f31" highlightColor="#ffffff25" />
                <Skeleton width={60} height={30} baseColor="#201f31" highlightColor="#ffffff25" />
                <Skeleton width={60} height={30} baseColor="#201f31" highlightColor="#ffffff25" />
              </>
            ) : (
              <>
                <div className="text-white font-semibold flex items-center gap-x-2">
                  <FaClosedCaptioning className="text-secondary text-lg" />
                  SUB:
                </div>
                {animeServers?.sub?.map((subServer) => {
                  return (
                    <span
                      key={subServer.id}
                      onClick={() => setCurrentServer({ ...subServer, type: 'sub' })}
                      className={`text-sm font-medium cursor-pointer rounded-md py-2 px-3 sm:px-5 min-w-fit w-full text-center sm:w-fit  ${
                        currentServer.id === subServer.id
                          ? 'text-black bg-secondary'
                          : 'text-white bg-white/15 hover:bg-white/20'
                      }`}
                    >
                      {subServer.label}
                    </span>
                  );
                })}
              </>
            )}
          </div>

          {/* DUB Section */}
          <div className="flex items-center justify-start gap-3 flex-wrap">
            {isServersLoading ? (
              <>
                <Skeleton width={50} height={25} baseColor="#201f31" highlightColor="#ffffff25" />
                <Skeleton width={60} height={30} baseColor="#201f31" highlightColor="#ffffff25" />
                <Skeleton width={60} height={30} baseColor="#201f31" highlightColor="#ffffff25" />
              </>
            ) : (
              <>
                {animeServers?.dub && (
                  <div className="text-white font-semibold flex items-center gap-x-2">
                    <FaMicrophone className="text-secondary text-lg" />
                    DUB:
                  </div>
                )}
                {animeServers?.dub?.map((dubServer) => {
                  return (
                    <span
                      key={dubServer.id}
                      onClick={() => setCurrentServer({ ...dubServer, type: 'dub' })}
                      className={`text-sm font-medium cursor-pointer rounded-md py-2 px-3 sm:px-5 min-w-fit w-full text-center sm:w-fit   ${
                        currentServer.id === dubServer.id
                          ? 'text-black bg-secondary'
                          : 'text-white bg-white/15 hover:bg-white/20'
                      }`}
                    >
                      {dubServer.label}
                    </span>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SourceSelector;
