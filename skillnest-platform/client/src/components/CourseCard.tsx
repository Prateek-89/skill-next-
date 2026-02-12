import { Link } from 'react-router-dom';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: number;
  thumbnail: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="flex gap-4 border border-gray-200 rounded p-4 hover:bg-gray-50">
      <div className="flex-shrink-0 w-32 h-24 bg-gray-200 rounded overflow-hidden">
        <img 
          src={course.thumbnail || 'https://via.placeholder.com/300x200?text=Course'} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between min-w-0">
        <div>
          <Link 
            to={`/courses/${course._id}`}
            className="text-sm font-semibold text-gray-900 hover:underline line-clamp-2"
          >
            {course.title}
          </Link>
          <p className="text-xs text-gray-600 mt-1">by {course.instructor}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
          <span>{course.duration}</span>
          <span className="font-semibold text-gray-900">${course.price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
