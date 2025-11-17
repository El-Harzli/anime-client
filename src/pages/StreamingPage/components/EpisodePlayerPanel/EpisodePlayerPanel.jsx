import React from 'react';
import SourceSelector from './SourceSelector';
// import VideoPlayer from './VideoPlayerFirstVersion';
import Player from './Player/Player';
import PlayerOptions from './PlayerOptions';

function EpisodePlayerPanel() {
  return (
    <>
      {/* <VideoPlayer /> */}
      <Player />
      <PlayerOptions />
      <SourceSelector />
    </>
  );
}

export default EpisodePlayerPanel;
