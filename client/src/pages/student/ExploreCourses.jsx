import { useEffect, useState } from 'react';
import { getAllCourses } from '../../services/course';
import CourseCard from '../../components/CourseCard';

const ExploreCourses = () => {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setError('Invalid data format received from server');
        }
      } catch (err) {
        console.error('Failed to fetch courses', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Explore Courses</h2>

      <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 w-full max-w-md px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
      />

      {loading && <p className="text-gray-600">Loading courses...</p>}

      {error && (
        <div className="text-red-500 font-medium mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && filteredCourses.length > 0 &&
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}

        {!loading && filteredCourses.length === 0 && !error && (
          <p className="text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreCourses;
