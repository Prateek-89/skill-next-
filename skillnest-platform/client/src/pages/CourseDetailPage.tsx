import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Clock, DollarSign, User as UserIcon, Calendar } from 'lucide-react';

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
       <div className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-gray-300 mb-6 max-w-3xl">{course.description}</p>
            <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-2" />
                    <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{course.duration}</span>
                </div>
                 <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Last Updated: {new Date().toLocaleDateString()}</span>
                </div>
            </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="md:col-span-2 space-y-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                   <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
                   <div className="prose max-w-none text-gray-700">
                      <p>{course.description}</p>
                      {/* More placeholder content could make it look richer */}
                      <p className="mt-4">
                        In this course, you will learn everything you need to know about {course.title}. 
                        This comprehensive curriculum is designed for students of all levels.
                      </p>
                   </div>
                </div>
             </div>

             <div className="md:col-span-1">
                 <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 border border-gray-200">
                    <img 
                       src={course.thumbnail || 'https://via.placeholder.com/300x200?text=Course'} 
                       alt={course.title} 
                       className="w-full h-48 object-cover rounded-md mb-6"
                    />
                    <div className="flex items-center justify-between mb-6"> 
                        <span className="text-3xl font-bold text-gray-900 flex items-center">
                            <DollarSign className="h-6 w-6" />{course.price}
                        </span>
                        <span className="text-gray-500 line-through text-sm">$999</span>
                    </div>

                    <button
                       onClick={handleEnroll}
                       disabled={enrolling}
                       className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-75"
                    >
                       {enrolling ? 'Enrolling...' : 'Enroll Now'}
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-4">30-Day Money-Back Guarantee</p>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default CourseDetailPage;
