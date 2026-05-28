const express = require("express")

const router = express.Router()

const {
    getPosts,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/postController")

const {validarPostById, validarSchemaPost} = require('../middlewares/post.middleware')

router.get("/", getPosts)

router.post("/", validarSchemaPost, createPost)

router.put("/:id", validarPostById, updatePost)

router.delete("/:id",validarPostById, deletePost)

module.exports = router