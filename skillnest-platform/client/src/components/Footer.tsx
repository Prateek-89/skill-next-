const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-100 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between md:items-start gap-10">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-extrabold tracking-tight">
              Skill<span className="text-blue-400">Nest</span>
            </span>
            <p className="mt-3 text-sm text-slate-400 max-w-sm">
              Discover curated, project-based courses crafted by top mentors to help you grow faster.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Resources
              </h2>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="mb-4">
                  <a href="#" className="hover:text-slate-100 transition-colors">Courses</a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-100 transition-colors">Mentors</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Legal
              </h2>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="mb-4">
                  <a href="#" className="hover:text-slate-100 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-100 transition-colors">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-slate-800 sm:mx-auto" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-xs sm:text-sm text-slate-500 sm:text-center">
            © {new Date().getFullYear()} SkillNest. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
