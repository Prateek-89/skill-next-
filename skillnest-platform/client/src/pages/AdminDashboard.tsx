import { useState, useEffect } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import { MdEdit, MdDelete, MdClose } from 'react-icons/md';
import toast from 'react-hot-toast';

interface CourseFormData {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: string;
  thumbnail: string;
}

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        </div>
        <button 
          onClick={() => { resetForm(); setIsFormOpen(true); }}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800"
        >
          + Add Course
        </button>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded border border-gray-200 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? 'Edit Course' : 'Add Course'}
              </h3>
              <button 
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Instructor</label>
                  <input 
                    type="text" 
                    name="instructor" 
                    required 
                    value={formData.instructor} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Duration</label>
                  <input 
                    type="text" 
                    name="duration" 
                    required 
                    value={formData.duration} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Price</label>
                  <input 
                    type="number" 
                    step="0.01"
                    name="price" 
                    required 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Thumbnail URL</label>
                  <input 
                    type="url" 
                    name="thumbnail" 
                    value={formData.thumbnail} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
                <textarea 
                  name="description" 
                  required 
                  rows={4} 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                ></textarea>
              </div>

              {formData.thumbnail && (
                <img src={formData.thumbnail} alt="Preview" className="w-full h-32 object-cover rounded border border-gray-200" />
              )}

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={resetForm} 
                  className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Courses Table */}
      {loading ? (
        <Loader />
      ) : courses.length === 0 ? (
        <div className="border border-gray-200 rounded p-12 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">No courses</h3>
          <p className="text-sm text-gray-600">Create your first course to get started.</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Course</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Instructor</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Price</th>
                <th className="px-6 py-3 text-right font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course: any) => (
                <tr key={course._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{course.title}</div>
                    <div className="text-xs text-gray-600">{course.duration}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{course.instructor}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${course.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => startEdit(course)}
                        title="Edit"
                        className="p-1 text-gray-600 hover:text-gray-900"
                      >
                        <MdEdit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(course._id)}
                        title="Delete"
                        className="p-1 text-gray-600 hover:text-red-600"
                      >
                        <MdDelete className="h-4 w-4" />
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
  );
};

export default AdminDashboard;
