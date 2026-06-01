// Importo express y creo un router para definir las rutas de postImage
const express = require("express");
const router = express.Router();

// Destrocturo los metodos del controlador para usarlos en las rutas
const {
    getPostsImages,
    createPostImage,
    updatePostImage,
    deletePostImage
} = require("../controllers/postImageController");

// Importo el middleware de validación de esquemas y el esquema de usuario para validar los datos de entrada
const { schemaValidator } = require("../middlewares/validateSchema");
const { postImageSchema } = require("../schemas/postImageSchema");

// Defino las rutas y les asigno el metodo correspondiente del controlador con validaciones donde corresponda
router.get("/", getPostsImages);
router.post("/", schemaValidator(postImageSchema), createPostImage);
router.put("/:id", schemaValidator(postImageSchema), updatePostImage);
router.delete("/:id", deletePostImage);

// Exporto el router para usarlo en main.js
module.exports = router;
