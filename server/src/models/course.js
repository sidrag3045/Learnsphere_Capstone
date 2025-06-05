'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Course to Instructor (User)
      Course.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'instructor'
      });
      // Course to Modules
      Course.hasMany(models.Module, {
        foreignKey: 'courseId',
        as: 'modules'
      });

      // Courses to Users (Students)
      // Many-to-many relationship with Enrollment as the join table
      Course.belongsToMany(models.User, {
        through: models.Enrollment,
        foreignKey: 'courseId',
        otherKey: 'userId',
        as: 'enrolledStudents'
      });

      // Course to Enrollments
      // One-to-many relationship with Enrollment
      Course.hasMany(models.Enrollment, {
        foreignKey: 'courseId',
        as: 'enrollments',
        onDelete: 'CASCADE'
      });
    }
  }

  Course.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'published',
      allowNull: false
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    timestamps: true
  });

  return Course;
};
