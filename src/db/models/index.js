const sequelize = require("../database")

const { DataTypes } = require("sequelize")

const PostModel = require("./post")
const CommentModel = require("./comment")
const TagModel = require("./tag")

const Post = PostModel(sequelize, DataTypes)
const Comment = CommentModel(sequelize, DataTypes)
const Tag = TagModel(sequelize, DataTypes)

Post.associate({ Comment, Tag })
Comment.associate({ Post })
Tag.associate({ Post })

module.exports = {
    Post,
    Comment,
    Tag,
    sequelize
}