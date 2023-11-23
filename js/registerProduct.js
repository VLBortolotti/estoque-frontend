// Definindo a sidenav
let dropdown = document.getElementsByClassName("dropdown-btn");
let i;

let produtosContainer = document.querySelector('.produtos-container')
produtosContainer.classList.toggle("active")
produtosContainer.nextElementSibling.style.display = "block"

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

// Pegando dados do form de cadastro de produtos
let productName = document.querySelector('#name')
let desc        = document.querySelector('#description')
let price       = document.querySelector('#price')
let quantity    = document.querySelector('#quantity')
let category    = document.querySelector('#category')
let submitBtn   = document.querySelector('#submit-btn')
let msg         = document.querySelector('#msg')

submitBtn.addEventListener('click', () => {  
  const productData = {
    name: productName.value,
    description: desc.value,
    price: price.value,
    quantity: quantity.value,
    category: category.value 
  }

  productDataJson = JSON.stringify(productData)

  const apiUrl = 'http://localhost:3000/products';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: productDataJson
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
});
