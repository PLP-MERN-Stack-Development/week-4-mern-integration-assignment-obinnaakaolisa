import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authService } from '../services/api';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-primary">
          My Blog
        </Link>
      </div>
      <div className="flex-none gap-4">
        <Link to="/" className="btn btn-sm btn-ghost">Home</Link>

        {user && (
          <Link to="/create" className="btn btn-sm btn-outline">
            Create Post
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login" className="btn btn-sm btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-sm btn-primary">Sign Up</Link>
          </>
        ) : (
          <>
            <div className="hidden sm:flex flex-col text-xs text-right mr-2">
              <span className="text-gray-500">Welcome</span>
              <span className="font-medium text-gray-700">{user.name}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-sm btn-error text-white">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
