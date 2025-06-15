// src/pages/courses/CourseDetail.jsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById } from '../../services/course';
import { getModulesByCourse } from '../../services/module';
import { getLessonsByModule } from '../../services/lesson';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [lessonsByModule, setLessonsByModule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourseStructure = async () => {
      try {
        const courseData = await getCourseById(courseId);
        setCourse(courseData);

        const modulesData = await getModulesByCourse(courseId);
        setModules(modulesData);

        const lessonsMap = {};
        
        for (let mod of modulesData) {
          const lessons = await getLessonsByModule(mod.id); // ✅ Fixed: no destructuring
          lessonsMap[mod.id] = lessons;
        }

        setLessonsByModule(lessonsMap);

      } catch (err) {
        console.error('Failed to load course', err);
        setError(err?.response?.data?.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseStructure();
  }, [courseId]);

  if (loading) return <p className="pt-24 text-center text-gray-600">Loading course...</p>;
  if (error) return <p className="pt-24 text-center text-red-500">{error}</p>;

  return (
    <div className="pt-24 px-4 max-w-6xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-8">{course.description}</p>

      {modules.length === 0 ? (
        <p>No modules found for this course.</p>
      ) : (
        modules.map((mod) => (
          <div key={mod.id} className="mb-6 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{mod.title}</h2>
            <ul className="pl-4 list-disc text-sm text-gray-700 space-y-1">
              {(lessonsByModule[mod.id] || []).map((lesson) => (
                <li
                  key={lesson.id}
                  className="cursor-pointer hover:text-indigo-600"
                  onClick={() => navigate(`/lessons/${lesson.id}`)}
                >
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseDetail;
