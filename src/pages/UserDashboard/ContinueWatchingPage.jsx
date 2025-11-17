import React, { useState } from 'react';
import ContinueWatching from '@components/widgets/ContinueWatching';

function ContinueWatchingPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <>
      <ContinueWatching onEmptyChange={setIsEmpty} showAll={true} />
      {isEmpty && (
        <div className="text-white/70 text-sm text-center py-10">No anime found under Continue Watching Page</div>
      )}
    </>
  );
}

export default ContinueWatchingPage;
