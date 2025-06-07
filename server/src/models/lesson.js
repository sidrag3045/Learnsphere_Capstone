'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    static associate(models) {
      Lesson.belongsTo(models.Module, {
        foreignKey: 'moduleId',
        as: 'module'
      });
    }
  }

  Lesson.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: "No description provided"
      },
      s3Key: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'S3 object key for lesson content (video/pdf/article)'
      },
      contentType: {
        type: DataTypes.ENUM('video', 'pdf', 'article'),
        allowNull: false,
        comment: 'Type of content stored in S3',
        defaultValue: 'article'
      },
      duration: {
        type: DataTypes.INTEGER, // in minutes
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Order of the lesson within the module'
      },
      status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        allowNull: false,
        defaultValue: 'draft',
      },
      moduleId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Lesson',
      tableName: 'lessons',
      timestamps: true
    }
  );

  return Lesson;
};
