import FormField from '@components/shared/FormField';
import Button from '@components/shared/Button';
import { useAuth } from '@context/authContext';

function RegisterationForm({ authInfo, setAuthInfo, handleOnSubmit, handleModalStateChange }) {
  const { error } = useAuth();

  return (
    <form onSubmit={handleOnSubmit}>
      <FormField
        label="Username"
        id="username"
        inputType="text"
        placeholder="Username"
        value={authInfo.username}
        onChange={(e) => setAuthInfo({ ...authInfo, username: e.target.value })}
      />
      <FormField
        label="Email Address"
        id="email"
        inputType="email"
        placeholder="name@example.com"
        value={authInfo.email}
        onChange={(e) => setAuthInfo({ ...authInfo, email: e.target.value })}
      />
      <FormField
        label="Password"
        id="password"
        inputType="password"
        placeholder="Password"
        value={authInfo.password}
        onChange={(e) => setAuthInfo({ ...authInfo, password: e.target.value })}
      />
      <FormField
        label="Confirm Password"
        id="confirm-password"
        inputType="password"
        placeholder="Confirm password"
        value={authInfo.confirmPassword}
        onChange={(e) => setAuthInfo({ ...authInfo, confirmPassword: e.target.value })}
      />
      <Button
        label="Register"
        customCss="bg-secondary rounded-xl font-medium w-full mt-7"
        handleOnClick={handleOnSubmit}
      />
      {error && <p className="text-sm text-red-500 text-center mt-3">{error}</p>}
      <p className="text-sm text-white text-center mt-6">
        Have an account?{' '}
        <span onClick={() => handleModalStateChange('login')} className="cursor-pointer text-secondary">
          Login
        </span>
      </p>
    </form>
  );
}

export default RegisterationForm;
