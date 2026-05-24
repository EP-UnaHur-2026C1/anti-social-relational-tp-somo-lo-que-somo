const express = require("express")

const app = express()

const sequelize = require("./db/database")

const commentRoutes = require("./routes/commentRoutes")
const postRoutes = require("./routes/postRoutes")
const tagRoutes = require("./routes/tagRoutes")

app.use(express.json())

app.use("/comments", commentRoutes)
app.use("/posts", postRoutes)
app.use("/tags", tagRoutes)

sequelize.sync()

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000")
})