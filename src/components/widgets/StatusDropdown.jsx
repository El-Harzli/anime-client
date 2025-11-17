import { useWatchList } from '@context/WatchListContext';
import { useEffect, useRef } from 'react';
import { FaCheck } from 'react-icons/fa';

function StatusDropdown({
  visible,
  animePayload,
  previewedAnime,
  isInWatchList,
  setVisible,
  editButtonRef,
  position = 'top',
}) {
  const { addToWatchList, removeFromWatchList, UpdateWatchList } = useWatchList();
  const statusList = ['Watching', 'On-Hold', 'Plan to Watch', 'Completed', 'Dropped'];
  const dropdownRef = useRef(null);

  // --- Close dropdown on outside click ---
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(event.target);
      const clickedOutsideButton = editButtonRef.current && !editButtonRef.current.contains(event.target);

      if (clickedOutsideDropdown && clickedOutsideButton) {
        setVisible(false);
      }
    }

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, setVisible, editButtonRef]);

  if (!visible) return null;

  if (!visible) return null;

  // --- Handlers ---
  const handleAddToWatchList = async (status) => {
    if (animePayload && status) {
      await addToWatchList(animePayload, status);
      setVisible(false);
    }
  };

  const handleUpdateWatchList = async (status) => {
    if (previewedAnime && isInWatchList && status) {
      await UpdateWatchList(previewedAnime?.animeId, status);
      setVisible(false);
    }
  };

  const handleRemoveFromWatchList = async () => {
    if (previewedAnime && isInWatchList) {
      await removeFromWatchList(previewedAnime?.animeId);
      setVisible(false);
    }
  };

  // --- UI ---
  return (
    <ul
      ref={dropdownRef}
      className={`flex flex-col w-fit h-fit absolute ${
        position === 'top' ? 'bottom-full mb-1  ' : 'top-full mt-1'
      } right-0 me-1  rounded-md bg-white shadow-md`}
    >
      {statusList.map((st) => (
        <li
          key={st}
          onClick={() => (isInWatchList ? handleUpdateWatchList(st) : handleAddToWatchList(st))}
          className={`whitespace-nowrap px-2.5 py-1.5 text-sm cursor-pointer text-black ${
            st === previewedAnime?.status ? 'bg-black/10 font-medium' : 'hover:bg-black/10'
          }`}
        >
          {st !== previewedAnime?.status ? (
            st
          ) : (
            <div className="flex items-center justify-start gap-x-3">
              {st}
              <FaCheck className="text-xs" />
            </div>
          )}
        </li>
      ))}

      {isInWatchList && (
        <li
          className="whitespace-nowrap px-2.5 py-1.5 text-sm cursor-pointer hover:bg-black/10 text-red-600 font-medium"
          onClick={handleRemoveFromWatchList}
        >
          Remove
        </li>
      )}
    </ul>
  );
}

export default StatusDropdown;
