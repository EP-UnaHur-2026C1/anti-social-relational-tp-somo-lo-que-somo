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
        through: models.PostTags,
        foreignKey: "postId",
        otherKey: "tagId",
        as: "tags"
      });


      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      Post.hasMany(models.PostImage, {
        foreignKey: "postId",
        as: "images"
      });

    }

  }

  Post.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Post',
    timestamps: false,

  });

  return Post;
};