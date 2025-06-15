// src/pages/dashboards/student/Enrollments.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyEnrollments } from '../../../services/enrollment';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await getMyEnrollments();
        setEnrollments(data);
      } catch (err) {
        console.error('Failed to fetch enrollments', err);
        setError(err.response?.data?.message || err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-800">
      <h2 className="text-2xl font-semibold mb-6">My Enrollments</h2>

      {loading && <p className="text-gray-500">Loading enrollments...</p>}

      {error && (
        <div className="text-red-500 font-medium mb-4">
          Error: {error}
        </div>
      )}

      {!loading && enrollments.length === 0 && !error && (
        <p className="text-gray-600">You have not enrolled in any courses yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map(({ course }) => (
          <div
            key={course.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enrollments;
