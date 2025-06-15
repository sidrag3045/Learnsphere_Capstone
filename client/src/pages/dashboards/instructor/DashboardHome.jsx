
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCoursesByInstructor } from '../../../services/course';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../../components/common/StatCard';

const InstructorDashboardHome = () => {
  const { user } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (user?.id) {
          const data = await getCoursesByInstructor(user.id);
          setCourses(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to fetch instructor courses', err);
        setError(err.response?.data?.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100 min-h-screen bg-gray-50 dark:bg-gray-950">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome, {user?.fullName?.split(' ')[0] || 'Instructor'} 👨‍🏫
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Here’s a summary of your teaching progress.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Courses Created" value={courses.length} description="You're actively shaping minds!" gradient="from-purple-500 to-indigo-500" />
        <StatCard title="Students Enrolled" value="128" description="Great engagement this month" gradient="from-green-500 to-emerald-500" />
        <StatCard title="Average Rating" value="4.5" description="Based on student reviews" gradient="from-yellow-500 to-orange-400" />
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Recent Courses</h3>
        {loading ? (
          <p className="text-sm text-gray-500 dark:text-gray-300">Loading...</p>
        ) : courses.length > 0 ? (
          <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
            {courses.slice(0, 3).map((course) => (
              <li
                key={course.id}
                className="hover:underline cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                {course.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-300">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboardHome;
