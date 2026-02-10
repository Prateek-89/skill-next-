import { Link } from 'react-router-dom';
import { Clock, DollarSign } from 'lucide-react';

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
    <div className="group relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl p-[1px] shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="relative overflow-hidden rounded-2xl bg-white flex flex-col h-full">
        <div className="relative h-44 w-full overflow-hidden">
          <img 
            src={course.thumbnail || 'https://via.placeholder.com/300x200?text=Course'} 
            alt={course.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-100">
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-slate-900/70 backdrop-blur">
              <Clock className="h-3 w-3 mr-1" />
              {course.duration}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-600/80 backdrop-blur font-semibold">
              <DollarSign className="h-3 w-3 mr-0.5" />
              {course.price}
            </span>
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-slate-900 mb-1 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-xs font-medium text-slate-500 mb-2">
            by <span className="text-slate-700">{course.instructor}</span>
          </p>
          <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow">
            {course.description}
          </p>
          
          <Link 
            to={`/courses/${course._id}`} 
            className="mt-auto inline-flex items-center justify-center w-full text-sm font-semibold rounded-full bg-slate-900 text-white py-2.5 hover:bg-slate-800 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
