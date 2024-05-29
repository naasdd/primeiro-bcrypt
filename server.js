const express = require('express')
const app = express()
const connection = require('./database/connection.js')
const Users = require('./model/users.js')
const cors = require('cors')
const path = require('path')
const bcrypt = require('bcrypt')

const hostname = 'localhost'
const PORT = '3000'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname + '/public')))


app.get('/', (req, res) => {
    res.sendFile('./index.html')
})

app.post('/cadastrar', async (req, res) => {
    const dados = req.body
    console.log(`> Cadastrar = ${dados}`)

    bcrypt.hash(dados.senha, 10, async (err, hash) => {
        if (err) {
            console.log(`Erro ao gerar o bash, erro: ${err}`)
            res.status(500).json({ Message: "erro ao criptografar dados" })
        }
        try {
            const gravar = await Users.create({ nome: dados.nome, email: dados.email, senha: hash })
            res.status(200).json({Message: `${dados.nome} foi cadastrado com uscesso`})
        }
        catch (err) {
            console.log(`X erro ao cadastrar dados, erro: ${err}`)
            res.status(500).json({ Message: "erro ao gravar dados" })
        }
    })
})


app.post('/login', async (req, res) => {
    const login = req.body
    console.log(`> email = ${login.email}`)
    
    const pesquisa = await Users.findOne({ where: { email: login.email }, raw: true })

    if(pesquisa == null){
        console.log(`> pesquisa = null`)
        res.status(500).json({Message: "pesquisa = null"})
    }
    else{
        const senhabanco = pesquisa.senha
        const senhauser = login.senha

        bcrypt.compare( senhauser , senhabanco, (err, result) => {
            if (err) {
                console.log(`X erro ao validar criptografia`)
                res.status(500).json({Message: `Acesso negado.`})
            }
            else if(result){
                res.status(200).json({Message:`Acesso autorizado, bem vindo ${pesquisa.nome}.`})
            } 
            else{
                console.log(`X erro ao validar criptografia`)
                res.status(500).json({Message: `Acesso negado.`})
            }
        })
    }
})


connection.sync().then(() => {
    app.listen(PORT, hostname, () => {
        console.log(`Sistema rodando no endereço ${hostname}:${PORT}`)
    })
}).catch((err) => {
    console.log(`Erro ao sincronizar banco de dados, erro: ${err}`)
})