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

entrarBtn.addEventListener('click', () => {
    const userData = {
        email: email.value,
        password: senha.value
    }

    console.log(userData)

    const apiUrl = 'http://localhost:3000/users/login'

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
            msg.innerHTML = 'Login feito com sucesso'

            console.log(`Data: ${JSON.stringify(data.data, null, 2)}`)

            const saveUserData = {
                name: data.data.name,
                email: data.data.email,
                id: data.data.id,
                token: data.data.token
            }

            localStorage.setItem('userData', JSON.stringify(saveUserData))
            // console.log(JSON.parse(localStorage.getItem('userData')))
        }
    })
    .catch( (error) => {
        console.error(`Fetch error: ${error}`)
    })
})