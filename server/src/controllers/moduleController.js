const { createModuleService,
        getModulesByCourseService,
        getModuleByIdService,
        updateModuleService,
        deleteModuleService,
        reorderModulesService } = require('../services/moduleService');

const createModule = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const module = await createModuleService(req.body, courseId);
    res.status(201).json({ message: 'Module created successfully', module });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getModulesByCourse = async (req, res) => {
  try {
    const modules = await getModulesByCourseService(req.params.courseId);
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getModuleById = async (req, res) => {
  try {
    const module = await getModuleByIdService(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module not found' });
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateModule = async (req, res) => {
  try {
    await updateModuleService(req.params.id, req.body);
    res.status(200).json({ message: 'Module updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteModule = async (req, res) => {
  try {
    await deleteModuleService(req.params.id);
    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const reorderModules = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { courseId } = req.params;
    const { modules } = req.body;

    if (!Array.isArray(modules)) {
      return res.status(400).json({ message: 'Modules array is required' });
    }

    const result = await reorderModulesService(instructorId, courseId, modules);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateModuleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await updateModuleService(id, { status });
    res.status(200).json({ message: 'Module status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {
  createModule,
  getModulesByCourse,
  getModuleById,
  updateModule,
  deleteModule,
  reorderModules,
  updateModuleStatus
};