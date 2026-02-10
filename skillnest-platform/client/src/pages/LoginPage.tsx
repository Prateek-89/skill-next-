import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token, response.data.user);
      toast.success('Logged in successfully!');
      navigate(response.data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.22),_transparent_55%)]" />
      <div className="relative max-w-5xl w-full grid gap-8 lg:grid-cols-[1.05fr_1fr] items-stretch">
        <div className="hidden lg:flex flex-col justify-center rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-8 py-10 shadow-2xl shadow-slate-900/60">
          <p className="text-sm font-medium text-sky-400 mb-3 uppercase tracking-[0.2em]">
            Welcome back
          </p>
          <h2 className="text-3xl font-bold text-slate-50 mb-4">
            Pick up right where you left off.
          </h2>
          <p className="text-sm text-slate-300 mb-8">
            Access your enrolled courses, track your progress, and continue building real-world
            projects guided by mentors.
          </p>
          <div className="mt-auto grid grid-cols-2 gap-4 text-xs text-slate-200">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4">
              <p className="font-semibold">Project-based learning</p>
              <p className="mt-2 text-slate-400">
                Learn by doing with hands-on assignments and real case studies.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4">
              <p className="font-semibold">Mentor feedback</p>
              <p className="mt-2 text-slate-400">
                Get guidance from industry experts to stay on the right path.
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-slate-950/80 lg:bg-slate-950/60 border border-slate-800 rounded-3xl shadow-2xl shadow-slate-900/70 backdrop-blur-sm px-6 py-8 sm:px-8 sm:py-10">
          <div className="mb-6 text-center">
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-50">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Continue learning and unlock new skills.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  className="block w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="block w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex justify-center items-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-xl hover:from-sky-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-950 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
            
            <div className="text-center text-xs sm:text-sm text-slate-400">
              <span className="mr-1">Don&apos;t have an account?</span>
              <Link to="/register" className="font-semibold text-sky-400 hover:text-sky-300">
                Create one now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
