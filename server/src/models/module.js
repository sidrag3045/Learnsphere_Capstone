'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    static associate(models) {
      Module.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course'
      });

      // Future: Module.hasMany(models.Lesson, ...)
    }
  }

  Module.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      allowNull: false,
      defaultValue: 'published'
    }
  }, {
    sequelize,
    modelName: 'Module',
    tableName: 'modules',
    timestamps: true
  });

  return Module;
};
