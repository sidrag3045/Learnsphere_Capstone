'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      Enrollment.belongsTo(models.User, { foreignKey: 'userId' });
      Enrollment.belongsTo(models.Course, { foreignKey: 'courseId' });
    }
  }

  Enrollment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    enrolledAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Enrollment',
    tableName: 'enrollments',
    timestamps: false
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['userId', 'courseId']
    //   }
    // ]
  });

  return Enrollment;
};
