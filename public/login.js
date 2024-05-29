const { response } = require("express")

async function login(){
    event.preventDefault()
    let email = document.getElementById('inputemail').value
    let senha = document.getElementById('inputsenha').value

    await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({ email, senha })
    })
    .then(response => response.json())
    .then(dados => {
        window.alert(dados.Message)
    }).catch((err) => {
        window.alert(`ERRO: ${err}`)
        console.log(`Erro ao Logar`)
    })
}

