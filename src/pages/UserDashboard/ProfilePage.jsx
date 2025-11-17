import React, { useEffect, useState } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { useAuth } from '../../context/authContext';
import profile_pic from '@assets/profile_pic.jpg';
import Button from '@src/components/shared/Button.jsx';
import { MdEdit } from 'react-icons/md';
import { FaKey } from 'react-icons/fa';
import { axiosPrivate } from '@src/api/axiosInstance';

function ProfilePage() {
  const { user, updatePassword } = useAuth();
  const [email] = useState(user.email);
  const [username] = useState(user.username);

  const [isUserChangingPw, setIsUserChangingPw] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [disabledSaveButton, setDisableSaveButton] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ Validate password fields
  useEffect(() => {
    if (!isUserChangingPw) return; // Only validate when editing password

    setError('');
    setDisableSaveButton(true);

    // Only start validating when user has typed something
    if (!currentPassword && !newPassword && !confirmNewPassword) return;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('Confirm password does not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password should be at least 6 characters long');
      return;
    }

    // ✅ Passed validation
    setError('');
    setDisableSaveButton(false);
  }, [isUserChangingPw, currentPassword, newPassword, confirmNewPassword]);

  // Handle password change
  const handleChangePassword = async () => {
    if (disabledSaveButton) return;

    const result = await updatePassword(currentPassword, newPassword, confirmNewPassword);

    if (result.success) {
      setSuccess(result.message);
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setDisableSaveButton(true);
      setIsUserChangingPw(false);
    } else {
      setSuccess('');
      setError(result.message);
    }
  };

  return (
    <section className="mx-auto max-w-[650px] my-5">
      <h3 className="text-white flex items-center justify-start mb-5">
        <IoPersonSharp className="me-3 text-3xl md:text-4xl" />
        <span className="text-xl md:text-2xl font-semibold">Edit Profile</span>
      </h3>

      <div className="rounded-md bg-white/10 block xl:flex xl:flex-row-reverse">
        <div className="p-5 flex items-start justify-center bg-white/10">
          <div className="relative cursor-pointer">
            <img
              className="h-30 w-30 rounded-full border-2 border-white"
              src={profile_pic}
              alt="Profile Pic"
            />
            <MdEdit className="absolute bottom-0 right-0 text-black text-3xl rounded-full bg-white p-1" />
          </div>
        </div>

        <div className="p-5 flex-grow">
          {/* Email */}
          <div className="mb-6">
            <label className="text-neutral-400 text-xs block mb-3 mt-1">EMAIL ADDRESS</label>
            <input
              readOnly
              value={email}
              className="bg-white block px-3 py-2 outline-none rounded-md w-full"
              type="email"
            />
          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="text-neutral-400 text-xs block mb-3 mt-1">YOUR NAME</label>
            <input
              readOnly
              value={username}
              className="bg-white block px-3 py-2 outline-none rounded-md w-full"
              type="text"
            />
          </div>

          {/* Change password toggle */}
          <div
            onClick={() => {
              setIsUserChangingPw((prev) => !prev);
              setError('');
              setSuccess('');
            }}
            className={`flex items-center justify-start gap-x-2 w-fit text-neutral-400 group cursor-pointer ${
              isUserChangingPw ? 'mb-6' : 'mb-5'
            }`}
          >
            <FaKey className="group-hover:text-neutral-300" />
            <span className="group-hover:text-neutral-300 text-sm font-medium">Change Password</span>
          </div>

          {/* Password inputs */}
          {isUserChangingPw && (
            <>
              <div className="mb-6">
                <label className="text-neutral-400 text-xs block mb-3 mt-1">CURRENT PASSWORD</label>
                <input
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-white block px-3 py-2 outline-none rounded-md w-full"
                  type="password"
                />
              </div>
              <div className="mb-6">
                <label className="text-neutral-400 text-xs block mb-3 mt-1">NEW PASSWORD</label>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-white block px-3 py-2 outline-none rounded-md w-full"
                  type="password"
                />
              </div>
              <div className={`${error ? 'mb-3' : 'mb-6'}`}>
                <label className="text-neutral-400 text-xs block mb-3 mt-1">CONFIRM NEW PASSWORD</label>
                <input
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="bg-white block px-3 py-2 outline-none rounded-md w-full"
                  type="password"
                />
              </div>
            </>
          )}

          {/* Error + success messages */}
          {error && <div className="mb-3 ps-2 text-red-500 text-sm">{error}</div>}
          {success && <div className="mb-3 ps-2 text-green-500 text-sm">{success}</div>}

          {/* Save button */}
          <Button
            handleOnClick={handleChangePassword}
            label="Save"
            disabled={disabledSaveButton}
            customCss="w-full text-black bg-secondary rounded-md font-medium"
          />
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
