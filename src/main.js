const express = require("express")

const app = express()

const sequelize = require("./db/database")

app.use(express.json())

const commentRoutes = require("./routes/commentRoutes")
const postRoutes = require("./routes/postRoutes")
const tagRoutes = require("./routes/tagRoutes")

app.use("/comments", commentRoutes)
app.use("/posts", postRoutes)
app.use("/tags", tagRoutes)

sequelize.sync()

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000")
})