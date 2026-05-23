module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },

        visible: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })

    return Comment
}