'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    // Agrego las asociaciones correspondienes a User
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts'
      });

      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments'
      });

    }

  }

  User.init({

    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }

  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });

  return User;

};