import { useEffect, useState } from 'react';
import {
  getMyCourses,
  updateCourseStatus,
  deleteCourse
} from '../../../services/course';
import { useNavigate } from 'react-router-dom';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getMyCourses();
        setCourses(res);
      } catch (err) {
        console.error('Failed to fetch instructor courses:', err);
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleToggleStatus = async (courseId, currentStatus) => {
    try {
      const updated = await updateCourseStatus(courseId, {
        status: currentStatus === 'published' ? 'draft' : 'published'
      });
      setCourses((prev) =>
        prev.map((c) => (c.id === courseId ? { ...c, status: updated.status } : c))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await deleteCourse(courseId);
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  return (
    <div className="p-6 text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Manage Your Courses</h2>

      {loading && <p className="text-gray-600">Loading courses...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!loading && courses.length === 0 && (
        <p className="text-gray-500">No courses found. Start by creating one.</p>
      )}

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${
                  course.status === 'published'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {course.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{course.description}</p>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => navigate(`/instructor/courses/${course.id}/edit`)}
                className="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleToggleStatus(course.id, course.status)}
                className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600"
              >
                {course.status === 'published' ? 'Unpublish' : 'Publish'}
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourses;
