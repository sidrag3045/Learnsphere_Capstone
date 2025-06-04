'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'instructor',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Course.hasMany(models.Module, {
        foreignKey: 'courseId',
        as: 'modules',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
