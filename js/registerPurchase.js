// localStorage.getItem('userData')// Definindo a sidenav
let dropdown = document.getElementsByClassName("dropdown-btn");
let i;

let comprasContainer = document.querySelector('.compras-container')
comprasContainer.classList.toggle("active")
comprasContainer.nextElementSibling.style.display = "block"

// Funcionalidade de dropwdown na sidenav
for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }
  
// Adicionando nome do usuario logado a sidenav
userData     = JSON.parse(localStorage.getItem('userData'))
let userName = document.querySelector("#userName")
userName.innerHTML = userData.name

// Saindo da página
let sairBtn = document.querySelector('#sair')
sairBtn.addEventListener('click', () => {
    console.log('Sair da página')
    localStorage.clear()
    window.location.href = '../html/signin.html'
})

// Pegando dados do form de cadastro de venda 
let productId   = document.querySelector('#productId')
let quantity    = document.querySelector('#quantity')
let unitPrice   = document.querySelector('#unitPrice')
let description = document.querySelector('#description')
let submitBtn   = document.querySelector('#submit-btn')
let msg         = document.querySelector('#msg')

submitBtn.addEventListener('click', () => {  
    let userData = JSON.parse(localStorage.getItem('userData'))
    let userId   = userData.id
    
    const purchaseData = {
      productId: productId.value,
      userId: userId,
      quantity: quantity.value,
      unitPrice: unitPrice.value,
      description: description.value
    }
  
    purchaseDataJson = JSON.stringify(purchaseData)

    console.log(`Sale data: ${purchaseDataJson}`)

    const apiUrl = 'http://localhost:3000/purchases/';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: purchaseDataJson
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        if ('erro' in data) {
            msg.style.color = '#ff0000'
            msg.style.backgroundColor = '#ffbbbb'
            msg.style.display = 'block'
            msg.style.fontWeight = 'bold'
            msg.style.padding = '20px'
            msg.innerHTML = data.erro
            
            console.log(`Error: ${data.erro}`)
        } 

        else if (!('erro' in data) && (data.msg === "ok") && (Object.keys(data.data).length > 0)) {
            msg.style.color = '#008000'
            msg.style.backgroundColor = '#b0e57c'
            msg.style.display = 'block'
            msg.style.fontWeight = 'bold'
            msg.style.padding = '20px'
            msg.innerHTML = 'Cadastrado com sucesso'

            console.log(`Data: ${JSON.stringify(data.data, null, 2)}`)
        }
    })
    .catch((error) => {
        console.error(`Fetch error: ${error}`)
    })

})