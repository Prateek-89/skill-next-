import { Link } from 'react-router-dom';
import { BookOpen, Users, Award } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-slate-950 text-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.22),_transparent_55%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-300 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-2" />
                Learn from expert-led, project-based courses
              </p>
              <h1 className="text-4xl tracking-tight font-black sm:text-5xl md:text-6xl">
                <span className="block">Unlock your potential</span>
                <span className="block bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  with SkillNest
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base sm:text-lg text-slate-300">
                Discover expert-led courses and workshops designed to help you master real-world skills,
                build standout projects, and advance your career faster.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-sm sm:text-base font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-xl hover:from-sky-600 hover:to-indigo-600 transition"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-600/70 bg-slate-900/60 text-sm sm:text-base font-medium text-slate-100 hover:bg-slate-800/80 hover:border-slate-500 transition"
                >
                  Get Started Free
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md text-xs sm:text-sm text-slate-300">
                <div>
                  <p className="font-semibold text-slate-50">10k+</p>
                  <p>Active learners</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-50">150+</p>
                  <p>Expert mentors</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-50">4.8/5</p>
                  <p>Average rating</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-indigo-500/10 to-transparent blur-3xl" />
              <div className="relative rounded-3xl border border-slate-700/70 bg-slate-900/70 px-6 py-6 sm:px-8 sm:py-8 shadow-2xl shadow-sky-900/40">
                <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm mb-6">
                  <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4">
                    <p className="text-slate-400 mb-1">Next live cohort</p>
                    <p className="font-semibold text-slate-50">Full‑Stack Bootcamp</p>
                    <p className="mt-2 text-slate-400">Starts in 5 days</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-400/40 p-4">
                    <p className="text-slate-100 mb-1">Career Track</p>
                    <p className="font-semibold text-slate-50">Job-ready roadmap</p>
                    <p className="mt-2 text-slate-200 text-xs">Guided projects & mentorship</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Personalized learning path</p>
                    <p className="text-sm font-semibold text-slate-50">
                      Answer a few questions & get a custom plan
                    </p>
                  </div>
                  <Link
                    to="/courses"
                    className="inline-flex items-center rounded-full bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-200 transition"
                  >
                    Start now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-slate-950 border-t border-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
              Why learners love SkillNest
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              A learning experience built around real projects, expert mentors, and a community that
              keeps you accountable.
            </p>
          </div>
          <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center shadow-lg shadow-slate-900/40">
              <div className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
              <div className="flex justify-center mb-4">
                <div className="rounded-2xl bg-sky-500/15 p-3">
                  <BookOpen className="h-8 w-8 text-sky-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-50">Diverse courses</h3>
              <p className="mt-2 text-sm text-slate-400">
                From tech to creative arts, explore curated paths that match your goals and experience level.
              </p>
            </div>
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center shadow-lg shadow-slate-900/40">
              <div className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
              <div className="flex justify-center mb-4">
                <div className="rounded-2xl bg-emerald-500/15 p-3">
                  <Users className="h-8 w-8 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-50">Expert mentors</h3>
              <p className="mt-2 text-sm text-slate-400">
                Learn directly from industry professionals with experience at leading companies and startups.
              </p>
            </div>
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center shadow-lg shadow-slate-900/40">
              <div className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
              <div className="flex justify-center mb-4">
                <div className="rounded-2xl bg-indigo-500/15 p-3">
                  <Award className="h-8 w-8 text-indigo-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-50">Career-ready outcomes</h3>
              <p className="mt-2 text-sm text-slate-400">
                Earn certificates, build a polished portfolio, and gain confidence to grow in your career.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
