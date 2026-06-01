// Importo express y creo un router para definir las rutas de post
const express = require("express");
const router = express.Router();

//Me traigo el controlador para usar sus metodos en las rutas
const {
    getTags,
    getTagById,
    createTag
} = require("../controllers/tagController");

// Importo el middleware de validación de esquemas y el esquema de usuario para validar los datos de entrada
const { schemaValidator } = require('../middlewares/validateSchema')
const { tagSchema } = require("../schemas/tagSchema")

// Defino las rutas y les asigno el metodo correspondiente del controlador con validaciones donde corresponda
router.get("/", getTags);
router.get("/:id", getTagById);
router.post("/", schemaValidator(tagSchema), createTag);

// Exporto el router para usarlo en main.js
module.exports = router;