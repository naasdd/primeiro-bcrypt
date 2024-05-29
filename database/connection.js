const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('bcrypt', 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log(`Banco autenticado com sucesso`)
}).catch((err) => {
    console.log(`Erro ao autenticar banco de dados, erro: ${err}`)
})

module.exports = sequelize