'use strict';
module.exports = (sequelize, DataTypes) => {
  const iotEvents = sequelize.define('iotEvents', {
    uniqueId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    eventType: {
      type: DataTypes.STRING,
      allowNull: false
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {});
  iotEvents.associate = function(models) {
    iotEvents.belongsTo(models.device, {
      foreignKey: 'device_id'
    });
  };
  return iotEvents;
};
