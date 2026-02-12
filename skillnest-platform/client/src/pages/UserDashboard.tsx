import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

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
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user?.name}</h1>
        <p className="text-sm text-gray-600">Your learning progress and enrolled courses</p>
      </div>

      {/* Simple Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="border border-gray-200 rounded p-4">
          <p className="text-3xl font-bold text-gray-900">{totalCourses}</p>
          <p className="text-xs text-gray-600 mt-1">Enrolled</p>
        </div>
        <div className="border border-gray-200 rounded p-4">
          <p className="text-3xl font-bold text-gray-900">{totalHours}h</p>
          <p className="text-xs text-gray-600 mt-1">Total hours</p>
        </div>
        <div className="border border-gray-200 rounded p-4">
          <p className="text-3xl font-bold text-gray-900">{inProgressCourses}</p>
          <p className="text-xs text-gray-600 mt-1">In progress</p>
        </div>
        <div className="border border-gray-200 rounded p-4">
          <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
          <p className="text-xs text-gray-600 mt-1">Completion rate</p>
        </div>
      </div>

      {/* My Courses */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">My Courses</h2>
          <Link 
            to="/courses" 
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Browse all →
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : enrolledCourses.length > 0 ? (
          <div className="space-y-3">
            {enrolledCourses.map((course: any) => (
              course ? <CourseCard key={course._id} course={course} /> : null
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-200 rounded p-8 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">No courses yet</h3>
            <p className="text-sm text-gray-600 mb-4">Browse courses to get started.</p>
            <Link 
              to="/courses" 
              className="inline-block px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>

      {/* Recommended */}
      {recommendedCourses.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Recommended</h2>
          <div className="space-y-3">
            {recommendedCourses.map((course: any) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {enrolledCourses.length > 0 && (
        <div className="border border-gray-200 rounded p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Progress</h3>
            <span className="text-xs text-gray-600">{completedCourses} of {totalCourses} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div 
              className="bg-gray-900 h-2 rounded transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
