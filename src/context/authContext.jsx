import { createContext, useState, useContext, useEffect } from 'react';
import { axiosPrivate, axiosPublic } from '@src/api/axiosInstance';
import { toast } from 'sonner';
import { IoMdCheckmarkCircle } from 'react-icons/io';

const AuthContext = createContext({
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    username: '',
    email: '',
  });

  // Function to refresh token on app load
  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPublic.get('/auth/refresh');
      const { accessToken } = response.data;
      setUser({ username: response?.data?.user?.username, email: response?.data?.user?.email });

      // 🔑 Apply the new access token globally
      axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (setShowModal, email, password) => {
    try {
      setIsLoading(true);
      setError('');
      if (!email?.trim() || !password?.trim()) {
        throw new Error('All fields are required.');
      }
      const endpoint = import.meta.env.VITE_API_URL + '/auth/login';
      const response = await axiosPublic.post(endpoint, { email: email.trim(), password: password.trim() });
      setUser({ email: response?.data?.user?.email, username: response?.data?.user?.username });
      const { accessToken } = response.data;
      axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setIsAuthenticated(true);
      setShowModal(false);

      toast.success('', {
        className: '!bg-secondary !text-black !border-0',
        description: 'User logged in successfully',
        duration: 2500,
        icon: <IoMdCheckmarkCircle />,
      });
    } catch (error) {
      const message = error?.response?.data?.message || 'Error logging in';
      console.error(message);
      setError(message); // ✅ Store the message for the frontend
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (setModalState, username, email, password, confirmPassword) => {
    try {
      setError('');
      if (!username?.trim() || !email?.trim() || !password?.trim() || !confirmPassword?.trim()) {
        throw new Error('All fields are required.');
      }

      const response = await axiosPublic.post(`/auth/register`, {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
      });
      toast.success('', {
        className: '!bg-secondary !text-black !border-0',
        description: 'User Registered Successfully',
        duration: 2500,
        icon: <IoMdCheckmarkCircle />,
      });

      setModalState('login');
    } catch (error) {
      const message = error?.response?.data?.message || 'Error registering';
      console.error(message);
      setError(message); // ✅ Store the message
      toast.error('Registeration failed');
    }
  };

  const logout = async () => {
    try {
      await axiosPrivate.get('/auth/logout');
      // Clear Authorization header
      delete axiosPrivate.defaults.headers.common['Authorization'];
      setUser({ email: '' });

      setIsAuthenticated(false);
      toast.success('', {
        className: '!bg-secondary !text-black !border-0',
        description: 'User logged out successfully',
        duration: 2500,
        icon: <IoMdCheckmarkCircle />,
      });
    } catch (error) {
      console.error(error?.response?.data?.message || 'Error in logout auth context');
      toast.error('Logout failed');
    }
  };

    const updatePassword = async (currentPassword, newPassword, confirmNewPassword) => {
    try {
      setError('');
      if (!currentPassword?.trim() || !newPassword?.trim() || !confirmNewPassword?.trim()) {
        throw new Error('All fields are required');
      }

      const payload = { currentPassword, newPassword, confirmNewPassword };
      const response = await axiosPrivate.put(
        `${import.meta.env.VITE_API_URL}/auth/updatePassword`,
        payload
      );

      toast.success('', {
        className: '!bg-secondary !text-black !border-0',
        description: response.data.message || 'Password updated successfully',
        duration: 2500,
        icon: <IoMdCheckmarkCircle />,
      });

      return { success: true, message: response.data.message };
    } catch (err) {
      const message = err?.response?.data?.message || 'Error updating password';
      console.error('Update password error:', message);

      toast.error('Failed to update password');
      setError(message);

      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, register, logout, updatePassword, user, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
