const { Post } = require("../db/models")

const getPosts = async (req, res) => {

    const posts = await Post.findAll({
    include: [
        {
            association: "comments"
        },
        {
            association: "tags"
        }
    ]
    })

    res.json(posts)
}

const createPost = async (req, res) => {

    const { description, tagIds } = req.body

    const newPost = await Post.create({
        description
    })

    if (tagIds) {
        await newPost.setTags(tagIds)
    }

    res.json(newPost)
}

const updatePost = async (req, res) => {

    const { id } = req.params

    const { description } = req.body

    const post = await Post.findByPk(id)

    if (!post) {
        return res.status(404).json({
            message: "Post no encontrado"
        })
    }

    post.description = description

    await post.save()

    res.json(post)
}

const deletePost = async (req, res) => {

    const { id } = req.params

    const post = await Post.findByPk(id)

    if (!post) {
        return res.status(404).json({
            message: "Post no encontrado"
        })
    }

    await post.destroy()

    res.json({
        message: "Post eliminado"
    })
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
}