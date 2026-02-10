import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, Menu, X } from 'lucide-react';
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
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 gap-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-blue-500/30 blur-md group-hover:bg-blue-500/40 transition" />
                <BookOpen className="relative h-8 w-8 text-blue-600 group-hover:text-blue-700 transition" />
              </div>
              <span className="ml-2 text-xl font-black tracking-tight text-slate-900">
                Skill<span className="text-blue-600">Nest</span>
              </span>
            </Link>
            <div className="hidden sm:flex sm:space-x-2 rounded-full bg-slate-100 px-1 py-1">
              <Link
                to="/"
                className="px-3 py-1.5 text-sm font-medium rounded-full text-slate-700 hover:text-slate-900 hover:bg-white transition"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="px-3 py-1.5 text-sm font-medium rounded-full text-slate-700 hover:text-slate-900 hover:bg-white transition"
              >
                Courses
              </Link>
              {isAuthenticated && isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="px-3 py-1.5 text-sm font-medium rounded-full text-slate-700 hover:text-slate-900 hover:bg-white transition"
                >
                  Admin Panel
                </Link>
              )}
              {isAuthenticated && !isAdmin && (
                <Link
                  to="/dashboard"
                  className="px-3 py-1.5 text-sm font-medium rounded-full text-slate-700 hover:text-slate-900 hover:bg-white transition"
                >
                  My Learning
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600">
                  Hi, <span className="font-semibold text-slate-900">{user?.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-sm font-medium px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white/90 backdrop-blur">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-4 pr-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="block pl-4 pr-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            >
              Courses
            </Link>
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin/dashboard"
                className="block pl-4 pr-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                Admin Panel
              </Link>
            )}
            {isAuthenticated && !isAdmin && (
              <Link
                to="/dashboard"
                className="block pl-4 pr-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                My Learning
              </Link>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block pl-4 pr-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block pl-4 pr-4 py-2 text-base font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  Register
                </Link>
              </>
            )}
             {isAuthenticated && (
                <button 
                  onClick={handleLogout}
                  className="w-full text-left block pl-4 pr-4 py-2 text-base font-medium text-red-600 hover:bg-red-50"
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
