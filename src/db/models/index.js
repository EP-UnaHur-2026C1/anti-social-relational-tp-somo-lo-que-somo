const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const PostModel = require("./post")
const CommentModel = require("./comment")
const TagModel = require("./tag")
const UserModel = require("./user")
const PostImageModel = require("./postImage")



const PostImage = PostImageModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Post = PostModel(sequelize, DataTypes)
const Comment = CommentModel(sequelize, DataTypes)
const Tag = TagModel(sequelize, DataTypes)

Post.associate({ Comment, Tag, User, PostImage });
Comment.associate({ Post, User });
Tag.associate({ Post });
User.associate({ Post, Comment });
PostImage.associate({ Post });

module.exports = {
    Post,
    Comment,
    Tag,
    User,
    PostImage,
    sequelize
}