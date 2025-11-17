import FormField from '@components/shared/FormField';
import Button from '@components/shared/Button';
import { useAuth } from '@context/authContext';

function LoginForm({ authInfo, setAuthInfo, handleOnSubmit, handleModalStateChange }) {
  const { error } = useAuth();
  return (
    <form onSubmit={handleOnSubmit}>
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
      <Button label="Login" customCss="bg-secondary rounded-xl font-medium w-full" handleOnClick={handleOnSubmit} />
      {error && <p className="text-sm text-red-500 text-center mt-3">{error}</p>}
      <p className="text-sm text-white text-center mt-6">
        Don't have an account?{' '}
        <span onClick={() => handleModalStateChange('register')} className="cursor-pointer text-secondary">
          Register
        </span>{' '}
        or <span className="cursor-pointer text-secondary">Verify</span>
      </p>
    </form>
  );
}

export default LoginForm;
