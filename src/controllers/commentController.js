const Comment = require("../db/models/comment")

const getComments = async (req, res) => {

    const comments = await Comment.findAll()

    res.json(comments)
}

const createComment = async (req, res) => {

    const { text } = req.body

    const newComment = await Comment.create({
        text
    })

    res.json(newComment)
}

const updateComment = async (req, res) => {

    const { id } = req.params

    const { text } = req.body

    const comment = await Comment.findByPk(id)

    if (!comment) {
        return res.status(404).json({
            message: "Comentario no encontrado"
        })
    }

    comment.text = text

    await comment.save()

    res.json(comment)
}

const deleteComment = async (req, res) => {

    const { id } = req.params

    const comment = await Comment.findByPk(id)

    if (!comment) {
        return res.status(404).json({
            message: "Comentario no encontrado"
        })
    }

    await comment.destroy()

    res.json({
        message: "Comentario eliminado"
    })
}

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment
}