const { DataTypes } = require('sequelize')
const connection = require('../database/connection.js')

const Users = connection.define('users', {
    nome: {
        type: DataTypes.STRING
        
    },
    email: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING
        
    }
}, {
    createdAt: false,
    updatedAt: false
})

// Users.sync({force: true})

module.exports = Users