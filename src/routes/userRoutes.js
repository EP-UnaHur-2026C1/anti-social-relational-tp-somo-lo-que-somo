// Importo express y creo un router para definir las rutas de usuario
const express = require("express")
const router = express.Router()

// Destrocturo los metodos del controlador para usarlos en las rutas
const {
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController")

// Defino las rutas y les asigno el metodo correspondiente del controlador
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)


// Exporto el router para usarlo en main.js
module.exports = router