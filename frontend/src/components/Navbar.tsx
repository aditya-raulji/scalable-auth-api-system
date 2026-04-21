import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-white border-b px-4 py-3 flex justify-between">
      <h1 className="font-bold">Task Manager</h1>
      <div className="space-x-3">
        {token ? (
          <button className="text-red-500" onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
