const express = require("express")

const router = express.Router()

const {
    getPosts,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/postController")

const {schemaValidator} = require('../middlewares/validateSchema')
const {postSchema} = require("../schemas/postSchema")


router.get("/", getPosts)

router.post("/", schemaValidator(postSchema), createPost)

router.put("/:id", schemaValidator(postSchema), updatePost)

router.delete("/:id", deletePost)

module.exports = router