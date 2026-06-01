'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class PostTags extends Model {

        static associate(models) {
            // no hace nada acá, pero evita el error del index.js
        }

    }

    PostTags.init({
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'PostTags',
        tableName: 'PostTags',
        timestamps: false
    });

    return PostTags;
};