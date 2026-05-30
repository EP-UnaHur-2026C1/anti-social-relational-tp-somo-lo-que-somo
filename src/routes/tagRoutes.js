const express = require("express");

const router = express.Router();

const tagController = require("../controllers/tagController");

const {schemaValidator} = require('../middlewares/validateSchema')
const {tagSchema} = require("../schemas/tagSchema")

router.get("/", tagController.getTags);

router.post("/", schemaValidator(tagSchema), tagController.createTag);

module.exports = router;