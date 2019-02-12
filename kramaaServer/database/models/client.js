'use strict';
module.exports = (sequelize, DataTypes) => {
  const client = sequelize.define('client', {
    uniqueId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true, // checks for email format (foo@bar.com)
      },
      allowNull: false,
    },

    registrantID: {
      type: DataTypes.STRING,
      allowNull: true
    },

    role: {
      type: DataTypes.STRING,
      allowNull: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    verificationOTP: {
      type: DataTypes.NUMERIC
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
  client.associate = function(models) {
    client.belongsTo(models.organization, {
      foreignKey: 'organization_id'
    });
  };
  return client;
};
