const sequelize = require("../db/database")

const { DataTypes } = require("sequelize")

const TagModel = require("../db/models/tag")

const Tag = TagModel(sequelize, DataTypes)
console.log(require("../db/models"))

const getTags = async (req, res) => {

    const tags = await Tag.findAll()

    res.json(tags)
}

const createTag = async (req, res) => {

    const { name } = req.body

    const newTag = await Tag.create({
        name
    })

    res.json(newTag)
}

module.exports = {
    getTags,
    createTag
}