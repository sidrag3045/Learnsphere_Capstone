'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // User to Courses (as Instructor)
      User.hasMany(models.Course, {
        foreignKey: 'createdBy',
        as: 'courses'
      });

      // User to Enrollments
      // One to Many relationship with Enrollment
      User.hasMany(models.Enrollment, {
        foreignKey: 'userId',
        as: 'enrollments',
        onDelete: 'CASCADE'
      });

      // User to Courses (as Student)
      // Many-to-many relationship with Course through Enrollment
      User.belongsToMany(models.Course, {
        through: models.Enrollment,
        foreignKey: 'userId',
        otherKey: 'courseId',
        as: 'enrolledCourses'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('student', 'instructor'),
      defaultValue: 'student',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
  });
  return User;
};