const { createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseService,
  deleteCourseService,
  getCoursesByInstructorService,
  updateCourseStatusService } = require('../services/course/courseService');

const createCourse = async (req, res) => {
  try {
    const course = await createCourseService(req.body, req.user.id);
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await getAllCoursesService();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await getCourseByIdService(req.params.id);
    if (!course) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await updateCourseService(req.params.id, req.body);
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await deleteCourseService(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully', course });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getCoursesByInstructor = async (req, res) => {
  try {
    const instructorId = req.params.instructorId;
    const courses = await getCoursesByInstructorService(instructorId);

    res.status(200).json(courses);
  } catch (err) {
    console.error('Fetch courses by instructor error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCoursesByInstructorSelf = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const courses = await getCoursesByInstructorService(instructorId);
    
        res.status(200).json(courses);
    } catch (err) {
        console.error('Fetch courses by self instructor error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateCourseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await updateCourseStatusService(id, { status });
    res.status(200).json({ message: 'Course status updated successfully', course: { id, status } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByInstructor,
  getCoursesByInstructorSelf,
  updateCourseStatus
};