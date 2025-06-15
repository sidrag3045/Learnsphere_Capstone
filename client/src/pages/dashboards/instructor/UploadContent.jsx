import { useEffect, useState } from 'react';

import { generateLessonUploadUrl, createLesson, updateLesson } from '../../../services/lesson';

import { getCoursesByInstructor } from '../../../services/course';

import { getModulesByCourse } from '../../../services/module';

import { useSelector } from 'react-redux';

const UploadContent = () => {
  const { user } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState({
    courseId: '',
    moduleId: '',
    title: '',
    contentType: 'video', // 'video' | 'pdf' | 'article'
    file: null,
    articleContent: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCoursesByInstructor(user.id);
        setCourses(res);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseChange = async (courseId) => {
    setForm({ ...form, courseId, moduleId: '' });
    try {
      const mods = await getModulesByCourse(courseId);
      setModules(mods);
    } catch (err) {
      console.error('Failed to fetch modules:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Step 1: Create Lesson
      const newLesson = await createLesson(form.moduleId, {
        title: form.title,
        contentType: form.contentType
      });

      // Step 2: Upload content (if applicable)
      if (form.contentType !== 'article') {
        const uploadMeta = await generateLessonUploadUrl(newLesson.id, {
          contentType: form.contentType,
          fileName: form.file.name
        });

        await fetch(uploadMeta.uploadUrl, {
          method: 'PUT',
          body: form.file,
          headers: {
            'Content-Type': form.file.type
          }
        });
      } else {
        // Step 2b: Update lesson with article content
        await updateLesson(newLesson.id, {
          articleContent: form.articleContent
        });
      }

      setMessage('Lesson and content uploaded successfully!');
      setForm({
        ...form,
        title: '',
        file: null,
        articleContent: ''
      });
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('Upload failed. Please try again.');
    }
  };

  return (
    <div className="p-6 text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Upload Lesson Content</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1">Select Course</label>
          <select
            value={form.courseId}
            onChange={(e) => handleCourseChange(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Choose a course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Select Module</label>
          <select
            value={form.moduleId}
            onChange={(e) => setForm({ ...form, moduleId: e.target.value })}
            className="w-full p-2 border rounded"
            required
            disabled={!form.courseId}
          >
            <option value="">-- Choose a module --</option>
            {modules.map((mod) => (
              <option key={mod.id} value={mod.id}>
                {mod.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Lesson Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Content Type</label>
          <select
            value={form.contentType}
            onChange={(e) => setForm({ ...form, contentType: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="article">Article</option>
          </select>
        </div>

        {form.contentType === 'article' ? (
          <div>
            <label className="block mb-1">Article Content</label>
            <textarea
              value={form.articleContent}
              onChange={(e) => setForm({ ...form, articleContent: e.target.value })}
              className="w-full p-2 border rounded h-40"
              placeholder="Write your article here..."
              required
            ></textarea>
          </div>
        ) : (
          <div>
            <label className="block mb-1">Upload File</label>
            <input
              type="file"
              accept={form.contentType === 'video' ? 'video/*' : 'application/pdf'}
              onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Upload Content
        </button>

        {message && (
          <p className={`mt-3 ${message.includes('failed') ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default UploadContent;

