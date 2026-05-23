const sequelize = require("../database")

const { DataTypes } = require("sequelize")

const Comment = sequelize.define("Comment", {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },

    visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = Comment