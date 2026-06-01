const { User, Post, Comment, Tag, PostImage, sequelize } = require("./db/models");

const seedDatabase = async () => {
    try {
        // await sequelize.sync({ force: true });
        console.log(" DB reseteada");

        // USERS
        const user1 = await User.create({
            nickname: "manu",
            email: "manu@test.com",
        });

        const user2 = await User.create({
            nickname: "juan",
            email: "juan@test.com",
        });

        // TAGS
        const tag1 = await Tag.create({ name: "tech" });
        const tag2 = await Tag.create({ name: "music" });

        // POSTS
        const post1 = await Post.create({
            description: "Mi primer post",
            userId: user1.id,
        });

        const post2 = await Post.create({
            description: "Segundo post",
            userId: user2.id,
        });

        await post1.setTags([tag1.id, tag2.id]);

        // COMMENTS
        await Comment.create({
            text: "Buen post!",
            postId: post1.id,
            userId: user2.id,
            commentDate: new Date(),
        });

        await Comment.create({
            text: "Gracias!",
            postId: post1.id,
            userId: user1.id,
            commentDate: new Date(),
        });

        // POST IMAGES
        await PostImage.create({
            imageUrl: "https://img.com/1.jpg",
            postId: post1.id,
        });

        console.log("Inicializacion de prueba completado correctamente");
    } catch (error) {
        console.error("Error en inicializacion de prueba:", error);
    }
};

module.exports = { seedDatabase };