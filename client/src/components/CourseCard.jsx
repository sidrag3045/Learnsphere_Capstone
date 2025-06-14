import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const {
    id,
    title = 'Untitled Course',
    thumbnailUrl = '',
    instructor = {},
    status,
    description = '',
  } = course;

  return (
    <div className="bg-white border shadow rounded-lg overflow-hidden hover:shadow-md transition duration-200">
      <img
        src={thumbnailUrl}
        alt={title}
        className="h-40 w-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/fallback-thumbnail.jpg'; // optional fallback
        }}
      />
      <div className="p-4 flex flex-col justify-between h-48">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
          <p className="text-sm text-gray-600 truncate">
            {instructor.fullName || 'Unknown Instructor'}
          </p>
        </div>
        <div className="mt-auto">
          <Link
            to={`/courses/${id}`}
            className="block w-full text-center mt-3 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
