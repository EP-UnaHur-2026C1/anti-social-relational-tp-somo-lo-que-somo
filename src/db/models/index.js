const sequelize = require("../database");
const { DataTypes } = require("sequelize");
require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

// modelos
const User = require("./user")(sequelize, DataTypes);
const Post = require("./post")(sequelize, DataTypes);
const Comment = require("./comment")(sequelize, DataTypes);
const Tag = require("./tag")(sequelize, DataTypes);
const PostImage = require("./postImage")(sequelize, DataTypes);
const PostTags = require("./posttags")(sequelize, DataTypes);

// objeto con todos los modelos
const models = {
    User,
    Post,
    Comment,
    Tag,
    PostImage,
    PostTags
};

// asociaciones entre modelos
User.associate(models);
Post.associate(models);
Comment.associate(models);
Tag.associate(models);
PostImage.associate(models);

// exportar modelos y conexión a la base de datos
module.exports = {
    // exportar cada modelo individualmente
    ...models,
    sequelize
};