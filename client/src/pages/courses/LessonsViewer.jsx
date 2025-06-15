// src/pages/courses/LessonViewer.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLessonContent } from '../../services/lesson';

const LessonViewer = () => {
  const { lessonId } = useParams();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await getLessonContent(lessonId); // GET /lessons/:id/content
        console.log('Lesson Data:', data);

        setLesson(data.lesson);
      } catch (err) {
        console.error('Error loading lesson:', err);
        setError(err?.response?.data?.message || 'Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) fetchLesson();
  }, [lessonId]);

  if (loading) return <p className="pt-24 text-center text-gray-600">Loading lesson...</p>;
  if (error) return <p className="pt-24 text-center text-red-500">{error}</p>;

  if (!lesson) return <p className="pt-24 text-center text-gray-500">Lesson not found.</p>;

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
      <p className="text-gray-600 mb-6">{lesson.description}</p>

      {lesson.contentType === 'video' && (
        <video
          controls
          className="w-full rounded shadow"
          src={lesson.signedUrl}
          type="video/mp4"
        />
      )}

      {lesson.contentType === 'pdf' && (
        <iframe
          src={lesson.signedUrl}
          title="Lesson PDF"
          className="w-full h-[80vh] border rounded shadow"
        />
      )}

      {lesson.contentType === 'article' && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: lesson.signedUrl }}
        />
      )}
    </div>
  );
};

export default LessonViewer;
