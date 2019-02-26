'use strict';
module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
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

    readStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
  notification.associate = function(models) {
    notification.belongsTo(models.client, {
      foreignKey: 'client_id'
    });
  };
  return notification;
};
