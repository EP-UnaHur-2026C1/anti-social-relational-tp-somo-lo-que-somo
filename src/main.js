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


app.listen(3000, () => {
    sequelize.sync({ force: true })
    console.log("Servidor corriendo en puerto 3000")
})