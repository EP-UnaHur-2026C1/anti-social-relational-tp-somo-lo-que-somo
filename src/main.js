const express = require("express")

const app = express()

const sequelize = require("./db/database")

const commentRoutes = require("./routes/commentRoutes")

app.use(express.json())

app.use("/comments", commentRoutes)

sequelize.sync()

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000")
})