'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LessonProgress extends Model {
    static associate(models) {
      LessonProgress.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'student'
      });
      LessonProgress.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course'
      });
      LessonProgress.belongsTo(models.Module, {
        foreignKey: 'moduleId',
        as: 'module'
      });
      LessonProgress.belongsTo(models.Lesson, {
        foreignKey: 'lessonId',
        as: 'lesson'
      });
    }
  }

  LessonProgress.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      moduleId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      lessonId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('not_started', 'in_progress', 'completed'),
        allowNull: false,
        defaultValue: 'not_started'
      },
      progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Progress in percentage (0-100)'
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'LessonProgress',
      tableName: 'lessonprogresses',
      timestamps: true
    }
  );

  return LessonProgress;
};
