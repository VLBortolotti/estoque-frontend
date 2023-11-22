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


  console.log(`productData: ${productDataJson}\nbtn: ${submitBtn}`)


  // console.log('Product Data:', productData);
  // console.log('ProductData JSON: ', productDataJson)

  const apiUrl = 'http://localhost:3000/products';

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: productDataJson,
    redirect: 'follow'
  };

  // fetch("http://localhost:3000/products", requestOptions)
  // .then(response => {
  //   if (response.ok){
  //     response.json().then(json => {
  //       console.log(json)
  //     })
  //   }
  // })
  // .catch(error => console.log('error: ', error))

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: productDataJson
  })
  .then(response => response.json())
  .then(data => console.log(`data: ${JSON.stringify(data)}`))
  .catch((error) => console.error(`Fetch error: ${error}`))

});
