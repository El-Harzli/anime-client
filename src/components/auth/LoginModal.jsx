import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

import LoginForm from './LoginForm';
import RegisterationForm from './RegisterationForm';
import { useAuth } from '../../context/authContext';

function LoginModal({ setShowModal, handleModalChange }) {
  const [modalState, setModalState] = useState('login'); // Track the modal state (login/register)
  const { login, register } = useAuth();
  const [authInfo, setAuthInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  

  const handleModalStateChange = (state) => {
    setModalState(state);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (modalState === 'login') {
      // Perform login logic (authentication API call, etc.)
      login(setShowModal, authInfo.email, authInfo.password);
    } else {
      // Perform registration logic (sign up API call, etc.)
      register(setModalState, authInfo.username, authInfo.email, authInfo.password, authInfo.confirmPassword);
    }
  };

  return (
    <div className=" relative w-full mx-3 p-4 rounded-md sm:w-130 bg-black/35 backdrop-blur-md md:p-8 ">
      <IoCloseSharp
        onClick={() => handleModalChange(false)}
        className="w-8 h-8 bg-white text-black font-bold absolute inset-x-[90%] md:inset-x-[96.5%] inset-y-[-1%] md:inset-y-[-2.5%] z-[1000000] rounded-full p-1 cursor-pointer"
      />
      <h2 className="mb-6 text-2xl font-bold text-center text-white">
        {modalState === 'login' ? 'Welcome back!' : 'Create an account'}
      </h2>

      {modalState === 'login' ? (
        <LoginForm
          authInfo={authInfo} // Pass form state
          setAuthInfo={setAuthInfo} // Pass setter function
          handleOnSubmit={handleOnSubmit}
          handleModalStateChange={handleModalStateChange}
        />
      ) : (
        <RegisterationForm
          authInfo={authInfo} // Pass form state
          setAuthInfo={setAuthInfo} // Pass setter function
          handleOnSubmit={handleOnSubmit}
          handleModalStateChange={handleModalStateChange}
        />
      )}
    </div>
  );
}

export default LoginModal;
