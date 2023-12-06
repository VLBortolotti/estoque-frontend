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

// Verificando qual busca sera realizada
const searchBtn   = document.querySelector('#btn-search')
const searchKey   = document.querySelector('#key-search')
const searchValue = document.querySelector('#input-search') 

// Pegando dados do form dos produtos e populando a tabela (no HTML)
const apiUrl = 'http://localhost:3000/products/filter/' 
const table  = document.querySelector('#tabela')

function renderTable(pageCount) {
  let filterData = {
    key: searchKey.value,
    value: searchValue.value
  }

  let filterDataJson = JSON.stringify(filterData)

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: filterDataJson
  })
  .then(response => response.json())
  .then( (data) => {
    const pagination = document.querySelector('.pagination')

    const tableHeader = `
          <table> 
            <tr>
              <th>Identificador</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Categoria</th>
            </tr>
        `

    let   tableContent = ``
    const tableFooter  = `</table>`

    console.log(`data.data: ${data.data.length}`)

    if (data.data.length >= 1) {

      if (pageCount == 0) {
        let firstFiveProducts = data.data.slice(0, 5)
        firstFiveProducts.forEach(product => {
          tableContent += `
            <tr>
              <td>${product._id}</td>
              <td>${product.name}</td>
              <td>${product.description}</td>
              <td>${product.price}</td>
              <td>${product.quantity}</td>
              <td>${product.category}</td>
            </tr>
          `
        })
        
      } else { 
        let firstFiveProducts = data.data.slice(pageCount*5, (pageCount*5) + 5) 
        firstFiveProducts.forEach(product => {
          tableContent += `
            <tr>
              <td>${product._id}</td>
              <td>${product.name}</td>
              <td>${product.description}</td>
              <td>${product.price}</td>
              <td>${product.quantity}</td>
              <td>${product.category}</td>
            </tr>
          `
        })
      }
    
    } else {
      tableContent += `
        <tr>
          <td>Nada</td>
          <td>Nada</td>
          <td>Nada</td>
          <td>Nada</td>
          <td>Nada</td>
          <td>Nada</td>
        </tr>
      `
    }
      
    table.innerHTML = tableHeader + tableContent + tableFooter

    paginationStart = `
      <a href="#">&laquo;</a>
      <a href="#" class="active" onClick="renderTable(0)">0</a>
    `
    paginationEnd = `<a href="#">&raquo;</a>`

    paginationCount = Math.ceil((data.data.length) / 5) - 1  

    let paginationContent = (paginationCount) => {
      let pages = ''
      for (let i = 0; i < paginationCount; i++) {
        pages += `<a href="#" onClick="renderTable(${i+1})">${i + 1}</a>`
      }

      return pages
    }

    pagination.innerHTML = paginationStart + paginationContent(paginationCount) + paginationEnd
  
  })
  .catch((error) => {
    console.log(`Error: ${error}`)
  })

}

searchBtn.addEventListener('click', renderTable(0, 5))