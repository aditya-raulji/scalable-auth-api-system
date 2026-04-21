import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAF5] px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="font-space text-6xl font-extrabold text-[#1A1A1A]">404</p>
        <h1 className="mt-2 font-space text-3xl font-bold text-[#1A1A1A]">Page Not Found</h1>
        <p className="mt-3 text-sm text-gray-600">
          The page you are trying to reach does not exist.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-block rounded-xl bg-[#00C896] px-5 py-3 text-sm font-semibold text-white"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
