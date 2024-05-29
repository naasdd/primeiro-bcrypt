async function cadastrar(){
    event.preventDefault()
    let email = document.getElementById('inputemail').value
    let nome = document.getElementById('inputnome').value
    let senha = document.getElementById('inputsenha').value

    await fetch('/cadastrar', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({ email, nome , senha })
    })
    .then(response => response.json())
    .then(dados => {
        window.alert(dados.Message)
    }).catch((err) => {
        window.alert('erro')
        console.log(`Erro ao cadastrar`)
    })
}

