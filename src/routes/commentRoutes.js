const express = require("express")

const router = express.Router()

const {
    getComments,
    createComment,
    updateComment,
    deleteComment
} = require("../controllers/commentController")

const {schemaValidator} = require('../middlewares/validateSchema')
const {commentSchema} = require("../schemas/commentSchema")

router.get("/", getComments)

router.post("/", schemaValidator(commentSchema), createComment)

router.put("/:id", schemaValidator(commentSchema), updateComment)

router.delete("/:id", deleteComment)

module.exports = router