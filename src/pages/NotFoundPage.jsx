import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-400 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="text-blue-400 hover:text-blue-300 underline">
        Go back home
      </Link>
    </div>
  );
}
