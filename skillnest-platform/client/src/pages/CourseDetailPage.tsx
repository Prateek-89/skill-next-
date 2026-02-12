import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
        toast.error('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role === 'admin') {
      toast.error("Admins cannot enroll in courses");
      return;
    }

    setEnrolling(true);
    try {
      await api.post('/enroll', { courseId: id });
      toast.success('Successfully enrolled!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <Loader />;
  if (!course) return <div className="text-center py-10">Course not found</div>;

  return (
    <div className="bg-white min-h-screen">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="md:col-span-2">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-gray-600 mb-6">{course.description}</p>
                
                <div className="border border-gray-200 rounded p-4 mb-8 space-y-3 text-sm text-gray-600">
                  <div><strong>Instructor:</strong> {course.instructor}</div>
                  <div><strong>Duration:</strong> {course.duration}</div>
                  <div><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">About This Course</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {course.description}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed mt-3">
                    In this course, you will learn everything you need to know about {course.title}. 
                    This comprehensive curriculum is designed for students of all levels.
                  </p>
                </div>
             </div>

             <div>
                 <div className="border border-gray-200 rounded p-6 sticky top-24">
                    <img 
                       src={course.thumbnail || 'https://via.placeholder.com/300x200?text=Course'} 
                       alt={course.title} 
                       className="w-full h-40 object-cover rounded mb-4"
                    />
                    <div className="mb-6 border-t border-b border-gray-200 py-4">
                        <div className="text-3xl font-bold text-gray-900">${course.price}</div>
                    </div>

                    <button
                       onClick={handleEnroll}
                       disabled={enrolling}
                       className="w-full bg-gray-900 text-white font-medium py-2 px-4 rounded hover:bg-gray-800 disabled:opacity-60"
                    >
                       {enrolling ? 'Enrolling...' : 'Enroll'}
                    </button>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default CourseDetailPage;
