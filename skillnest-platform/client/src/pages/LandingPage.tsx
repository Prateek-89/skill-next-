import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Introduction Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Learn professional skills online
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore our collection of courses and improve your expertise. Learn at your own pace with structured curriculum.
          </p>
          <div className="flex gap-3">
            <Link
              to="/courses"
              className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm font-medium"
            >
              Browse Courses
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded hover:bg-gray-50 text-sm font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-2xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-600 mt-1">Courses</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">10k+</p>
              <p className="text-sm text-gray-600 mt-1">Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.8★</p>
              <p className="text-sm text-gray-600 mt-1">Average rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-12">Why choose our platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Structured learning</h3>
            <p className="text-sm text-gray-600">Follow organized curriculum designed to build real skills, from basics to advanced.</p>
          </div>
          <div className="border border-gray-200 rounded p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Learn at your pace</h3>
            <p className="text-sm text-gray-600">Access course materials anytime, anywhere. No deadlines, no time pressure.</p>
          </div>
          <div className="border border-gray-200 rounded p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Certificates included</h3>
            <p className="text-sm text-gray-600">Earn certificates upon completion to showcase your newfound skills.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to start learning?</h2>
          <p className="text-gray-600 mb-6">Sign up for free and explore our course collection today.</p>
          <Link
            to="/register"
            className="inline-block px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 font-medium"
          >
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
