import { useState, useEffect } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import { Plus, Edit, Trash, X, Sparkles, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

interface CourseFormData {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: string;
  thumbnail: string;
}

const sampleCourses = [
  {
    title: 'Complete Web Development Bootcamp',
    description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!',
    instructor: 'Dr. Angela Yu',
    duration: '60 Hours',
    price: '19.99',
    thumbnail: 'https://img-c.udemycdn.com/course/750x422/1565838_e54e_18.jpg',
  },
  {
    title: 'React - The Complete Guide 2024',
    description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
    instructor: 'Maximilian Schwarzmüller',
    duration: '48 Hours',
    price: '24.99',
    thumbnail: 'https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg',
  },
  {
    title: 'Python for Data Science and Machine Learning',
    description: 'Complete Python course for data science, machine learning, and automation. Learn pandas, numpy, matplotlib, and more!',
    instructor: 'Jose Portilla',
    duration: '55 Hours',
    price: '29.99',
    thumbnail: 'https://img-c.udemycdn.com/course/750x422/1754098_e0df_3.jpg',
  },
  {
    title: 'The Complete JavaScript Course 2024',
    description: 'Master JavaScript with the most complete course! Projects, challenges, ES6+, OOP, AJAX, Webpack, and more.',
    instructor: 'Jonas Schmedtmann',
    duration: '68 Hours',
    price: '22.99',
    thumbnail: 'https://img-c.udemycdn.com/course/750x422/851712_fc61_6.jpg',
  },
  {
    title: 'Node.js - The Complete Guide',
    description: 'Master Node.js and build modern, scalable server-side applications with Node.js, Express, MongoDB, and more!',
    instructor: 'Maximilian Schwarzmüller',
    duration: '40 Hours',
    price: '27.99',
    thumbnail: 'https://img-c.udemycdn.com/course/750x422/1879018_95b6_3.jpg',
  },
];

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    price: '',
    thumbnail: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/courses/${editingId}`, formData);
        toast.success('Course updated successfully');
      } else {
        await api.post('/courses', formData);
        toast.success('Course created successfully');
      }
      fetchCourses();
      resetForm();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${id}`);
        toast.success('Course deleted');
        fetchCourses();
      } catch (error: any) {
        toast.error('Delete failed');
      }
    }
  };

  const startEdit = (course: any) => {
    setEditingId(course._id);
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      price: course.price,
      thumbnail: course.thumbnail || ''
    });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        price: '',
        thumbnail: ''
    });
  };

  const loadSampleCourse = (sample: CourseFormData) => {
    setFormData(sample);
    setIsFormOpen(true);
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Manage courses and content</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={() => { resetForm(); setIsFormOpen(true); }}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="h-5 w-5 mr-2" /> Add New Course
        </button>
        
        <div className="relative group">
          <button className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all">
            <Sparkles className="h-5 w-5 mr-2" /> Use Sample Template
          </button>
          <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <div className="p-2">
              {sampleCourses.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => loadSampleCourse(sample)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors"
                >
                  {sample.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <button 
                    onClick={resetForm} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  {editingId ? 'Edit Course' : 'Add New Course'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title</label>
                            <input 
                              type="text" 
                              name="title" 
                              required 
                              value={formData.title} 
                              onChange={handleInputChange} 
                              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                              placeholder="e.g., Complete Web Development Bootcamp"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Instructor Name</label>
                            <input 
                              type="text" 
                              name="instructor" 
                              required 
                              value={formData.instructor} 
                              onChange={handleInputChange} 
                              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                              placeholder="e.g., Dr. Angela Yu"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                            <input 
                              type="text" 
                              name="duration" 
                              required 
                              value={formData.duration} 
                              onChange={handleInputChange} 
                              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                              placeholder="e.g., 60 Hours"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                            <input 
                              type="number" 
                              step="0.01"
                              name="price" 
                              required 
                              value={formData.price} 
                              onChange={handleInputChange} 
                              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                              placeholder="e.g., 19.99"
                            />
                        </div>
                         <div className="md:col-span-2">
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Image URL</label>
                             <input 
                               type="url" 
                               name="thumbnail" 
                               value={formData.thumbnail} 
                               onChange={handleInputChange} 
                               className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                               placeholder="https://example.com/image.jpg"
                             />
                             {formData.thumbnail && (
                               <img src={formData.thumbnail} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-lg border-2 border-gray-200" />
                             )}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea 
                              name="description" 
                              required 
                              rows={5} 
                              value={formData.description} 
                              onChange={handleInputChange} 
                              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                              placeholder="Describe what students will learn in this course..."
                            ></textarea>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button 
                          type="button" 
                          onClick={resetForm} 
                          className="px-6 py-3 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                        >
                          {editingId ? 'Update Course' : 'Create Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {loading ? <Loader /> : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Courses ({courses.length})</h2>
          </div>
          {courses.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-500 mb-6">Get started by adding your first course or use a sample template.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Instructor</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course: any) => (
                    <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img className="h-12 w-12 rounded-lg object-cover border-2 border-gray-200" src={course.thumbnail || 'https://via.placeholder.com/48'} alt={course.title} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{course.title}</div>
                            <div className="text-sm text-gray-500">{course.duration}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{course.instructor}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-blue-600">${course.price}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => startEdit(course)} 
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit course"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(course._id)} 
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete course"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
