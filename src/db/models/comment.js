'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Comment extends Model {

    static associate(models) {

      Comment.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "post"
      })

      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

    }

  }

  Comment.init({

    text: {
      type: DataTypes.STRING,
      allowNull: false
    },

    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    commentDate: {
      type: DataTypes.DATE,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: false,

  });

  return Comment;
};