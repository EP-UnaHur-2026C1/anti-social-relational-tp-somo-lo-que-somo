'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Post extends Model {

    static associate(models) {

      Post.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "comments"
      })

      Post.belongsToMany(models.Tag, {
        through: "PostTags",
        foreignKey: "postId",
        as: "tags"
      })

    }

  }

  Post.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Post',
    timestamps: false,

  });

  return Post;
};