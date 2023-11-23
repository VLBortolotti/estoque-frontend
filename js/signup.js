let nome        = document.querySelector('#nome')
let email       = document.querySelector('#email')
let senha       = document.querySelector('#senha')
let msg         = document.querySelector('#msg')
let entrarBtn   = document.querySelector('button')
let eyeBtn      = document.querySelector('.fa-eye')

eyeBtn.addEventListener('click', () => {
    if (senha.getAttribute('type') == 'password') {
        senha.setAttribute('type', 'text')
    } else {
        senha.setAttribute('type', 'password')
    }
})

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 4) {
        nome.style.borderBottom = 'transparent'
        nome.style.outline = '2px solid red'    
    } else {
        nome.style.borderBottom = '2px solid #272262'
        nome.style.outline = 'none'
    }
})

email.addEventListener('keyup', () => {
    if (email.value.length <= 4) {
        email.style.borderBottom = 'transparent'
        email.style.outline = '2px solid red'    
    } else {
        email.style.borderBottom = '2px solid #272262'
        email.style.outline = 'none'
    }
})

senha.addEventListener('keyup', () => {
    if (senha.value.length <= 4) {
        senha.style.borderBottom = 'transparent'
        senha.style.outline = '2px solid red'    
    } else {
        senha.style.borderBottom = '2px solid #272262'
        senha.style.outline = 'none'
    }
})

entrarBtn.addEventListener('click', () => {
    const userData = {
        name: nome.value, 
        email: email.value,
        password: senha.value,
        permission: 'funcionario'
    }

    console.log(userData)

    const apiUrl = 'http://localhost:3000/users/'

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if ('erro' in data) {
            msg.style.color = '#ff0000'
            msg.style.backgroundColor = '#ffbbbb'
            msg.style.display = 'block'
            msg.style.fontWeight = 'bold'
            msg.innerHTML = data.erro
            
            console.log(`Error: ${data.erro}`)
        } 

        else if (!('erro' in data) && (data.msg === "ok") && (Object.keys(data.data).length > 0)) {
            msg.style.color = '#272262'
            msg.style.backgroundColor = '#ffffff'
            msg.style.display = 'block'
            msg.style.fontWeight = 'bold'
            msg.innerHTML = 'Cadastrado com sucesso'

            console.log(`Data: ${JSON.stringify(data.data, null, 2)}`)

            setTimeout(() => {
                window.location.href = "../html/signin.html"
            }, 1000)
        }
    })
    .catch( (error) => {
        console.error(`Fetch error: ${error}`)
    })
})