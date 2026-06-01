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

const getTagById = async (req, res) => {

    const { id } = req.params

    const tag = await Tag.findByPk(id)

    if (!tag) {
        return res.status(404).json({
            message: "Tag no encontrado"
        })
    }

    res.json(tag)
}

const updateTag = async (req, res) => {

    const { id } = req.params
    const { name } = req.body

    const tag = await Tag.findByPk(id)

    if (!tag) {
        return res.status(404).json({
            message: "Tag no encontrado"
        })
    }

    tag.name = name

    await tag.save()

    res.json(tag)
}

const deleteTag = async (req, res) => {

    const { id } = req.params

    const tag = await Tag.findByPk(id)

    if (!tag) {
        return res.status(404).json({
            message: "Tag no encontrado"
        })
    }

    await tag.destroy()

    res.json({
        message: "Tag eliminado"
    })
}

module.exports = {
    getTags,
    createTag,
    getTagById,
    updateTag,
    deleteTag
}