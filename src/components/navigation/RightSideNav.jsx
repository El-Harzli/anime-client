import { useAuth } from '../../context/authContext';
import Button from '../shared/Button';
import { IoSearch } from 'react-icons/io5';
import LoginModal from '@components/auth/LoginModal';
import { useEffect, useState } from 'react';
import UserMenu from './UserMenu';

function RightSideNav({ handleShowSearch }) {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // Lock body scroll when modal is opened
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  return (
    <nav className="flex justify-center items-center gap-4  ms-auto">
      <IoSearch
        onClick={() => handleShowSearch()}
        className="xl:hidden text-white font-black text-3xl sm:text-4xl cursor-pointer p-1"
      />

      {!isAuthenticated ? (
        <Button
          label="Login"
          // btnType="secondary"
          customCss="bg-secondary rounded-xl font-medium text-xs sm:text-sm"
          handleOnClick={() => {
            setShowModal(true);
          }}
        />
      ) : (
        <UserMenu />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <LoginModal setShowModal={setShowModal} handleModalChange={setShowModal} />
        </div>
      )}
    </nav>
  );
}

export default RightSideNav;
