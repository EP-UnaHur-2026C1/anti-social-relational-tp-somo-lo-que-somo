// Importo express y creo un router para definir las rutas de postImage
const express = require("express")
const router = express.Router()

// Destrocturo los metodos del controlador para usarlos en las rutas
const {
    getPostsImages,
    createPostImage,
    updatePostImage,
    deletePostImage
} = require("../controllers/postImageController")

// Defino las rutas y les asigno el metodo correspondiente del controlador
router.get("/", getPostsImages)
router.post("/", createPostImage)
router.put("/:id", updatePostImage)
router.delete("/:id", deletePostImage)

// Exporto el router para usarlo en main.js
module.exports = router