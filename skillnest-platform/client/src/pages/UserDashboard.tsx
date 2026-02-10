import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Clock, Award, TrendingUp, Calendar, Target } from 'lucide-react';

const UserDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEnrolledCourses();
    fetchAllCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await api.get('/user/enrollments');
      const courses = response.data.map((enrollment: any) => enrollment.courseId);
      setEnrolledCourses(courses);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const response = await api.get('/courses');
      setAllCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Calculate stats
  const totalCourses = enrolledCourses.length;
  const totalHours = enrolledCourses.reduce((sum: number, course: any) => {
    if (!course) return sum;
    const hours = parseInt(course.duration?.match(/\d+/)?.[0] || '0');
    return sum + hours;
  }, 0);
  const completedCourses = enrolledCourses.filter((course: any) => course?.completed).length;
  const inProgressCourses = totalCourses - completedCourses;
  const completionRate = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;

  // Get recommended courses (courses not enrolled)
  const enrolledIds = enrolledCourses.map((c: any) => c?._id).filter(Boolean);
  const recommendedCourses = allCourses
    .filter((course: any) => !enrolledIds.includes(course._id))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="mt-2 text-gray-600 text-lg">Continue your learning journey</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Enrolled Courses</p>
              <p className="text-3xl font-bold mt-2">{totalCourses}</p>
            </div>
            <BookOpen className="h-12 w-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Hours</p>
              <p className="text-3xl font-bold mt-2">{totalHours}h</p>
            </div>
            <Clock className="h-12 w-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold mt-2">{inProgressCourses}</p>
            </div>
            <TrendingUp className="h-12 w-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Completion Rate</p>
              <p className="text-3xl font-bold mt-2">{completionRate}%</p>
            </div>
            <Target className="h-12 w-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* My Enrolled Courses */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
            My Enrolled Courses
          </h2>
          <Link 
            to="/courses" 
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            Browse All Courses
            <span className="ml-1">→</span>
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course: any) => (
              course ? <CourseCard key={course._id} course={course} /> : null
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-dashed border-gray-200">
            <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Learning Journey</h3>
            <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet. Explore our catalog to get started!</p>
            <Link 
              to="/courses" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Explore Courses
            </Link>
          </div>
        )}
      </div>

      {/* Recommended Courses */}
      {recommendedCourses.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="h-6 w-6 mr-2 text-purple-600" />
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course: any) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      )}

      {/* Learning Progress */}
      {enrolledCourses.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Your Learning Progress
            </h3>
            <span className="text-sm text-gray-600">{completedCourses} of {totalCourses} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">Keep up the great work! You're making excellent progress.</p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
