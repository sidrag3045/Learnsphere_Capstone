
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StudentDashboardHome = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="p-6 text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome back, {user?.fullName?.split(' ')[0] || 'Learner'} 👋
      </h2>
      <p className="text-gray-600 mb-6">Here’s a snapshot of your learning journey.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Course Progress</h3>
          <p className="text-sm text-gray-500">You’ve completed 3 out of 5 courses.</p>
          <div className="mt-3 h-2 bg-gray-200 rounded">
            <div className="h-full bg-indigo-500 rounded" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* My Courses */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Enrolled Courses</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="hover:underline cursor-pointer" onClick={() => navigate('/courses/uuid1')}>React Basics</li>
            <li className="hover:underline cursor-pointer" onClick={() => navigate('/courses/uuid2')}>JavaScript Essentials</li>
            <li className="hover:underline cursor-pointer" onClick={() => navigate('/courses/uuid3')}>Node.js Intro</li>
          </ul>
        </div>

        {/* Next Lesson Prompt */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Next Lesson</h3>
          <p className="text-sm text-gray-500 mb-2">"useEffect Deep Dive" from React Basics</p>
          <button
            onClick={() => navigate('/lessons/uuid')}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;
