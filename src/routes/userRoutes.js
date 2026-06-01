// Importo express y creo un router para definir las rutas de usuario
const express = require("express");
const router = express.Router();

// Destrocturo los metodos del controlador para usarlos en las rutas
const {
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// Importo el middleware de validación de esquemas y el esquema de usuario para validar los datos de entrada
const { schemaValidator } = require("../middlewares/validateSchema");
const { userSchema } = require("../schemas/userSchema");

// Defino las rutas y les asigno el metodo correspondiente del controlador con validaciones donde corresponda
router.post("/", schemaValidator(userSchema), createUser);
router.put("/:id", schemaValidator(userSchema), updateUser);
router.delete("/:id", deleteUser);

// Exporto el router para usarlo en main.js
module.exports = router;
