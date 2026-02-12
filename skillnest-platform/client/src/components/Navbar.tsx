import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdMenu, MdClose } from 'react-icons/md';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-lg font-semibold text-gray-900">
              SkillNext
            </Link>
            <div className="hidden sm:flex gap-6">
              <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link to="/courses" className="text-sm text-gray-600 hover:text-gray-900">
                Courses
              </Link>
              {isAuthenticated && isAdmin && (
                <Link to="/admin/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                  Admin
                </Link>
              )}
              {isAuthenticated && !isAdmin && (
                <Link to="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                  My Courses
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link to="/register" className="text-sm bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <MdClose className="h-6 w-6" /> : <MdMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
              Home
            </Link>
            <Link to="/courses" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
              Courses
            </Link>
            {isAuthenticated && isAdmin && (
              <Link to="/admin/dashboard" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
                Admin
              </Link>
            )}
            {isAuthenticated && !isAdmin && (
              <Link to="/dashboard" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
                My Courses
              </Link>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/login" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
                  Login
                </Link>
                <Link to="/register" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
                  Sign up
                </Link>
              </>
            )}
            {isAuthenticated && (
              <button 
                onClick={handleLogout}
                className="w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2 border-t border-gray-200 mt-2 pt-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
