const { Post } = require('../db/models')
const {validarById} = require('./generic.middleware')

const validarPostById = validarById(Post);

module.exports = {validarPostById};