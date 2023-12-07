// Definindo a sidenav
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

// Mostrando qual pagina esta ativa
function activePage(pageNumber) {
  const currentPageDiv = document.querySelector('#currentPage')
  
  currentPageDiv.innerHTML = `Página: ${pageNumber}`
}

// Verificando qual busca sera realizada
const searchBtn   = document.querySelector('#btn-search')
const searchKey   = document.querySelector('#key-search')
const searchValue = document.querySelector('#input-search') 

// Pegando dados do form dos produtos e populando a tabela (no HTML)
const apiUrl = 'http://localhost:3000/purchases/filter/' 
const table  = document.querySelector('#tabela')

function renderTable(pageCount, apiUrl) {
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
              <th>Compra id</th>
              <th>Produto id</th>
              <th>Preço unitário</th>
              <th>Quantidade</th>
              <th>Preço total</th>
              <th>Descrição</th>
            </tr>
        `

    let   tableContent = ``
    const tableFooter  = `</table>`

    if (data.data.length >= 1) {
      if (pageCount == 0) {
        let firstFiveProducts = data.data.slice(0, 5)
        firstFiveProducts.forEach(product => {
          tableContent += `
            <tr>
              <td>${product._id}</td>
              <td>${product.productId}</td>
              <td>${product.unitPrice}</td>
              <td>${product.quantity}</td>
              <td>${product.totalPrice}</td>
              <td>${product.description}</td>
            </tr>
          `
        })
        
      } else { 
        let firstFiveProducts = data.data.slice(pageCount*5, (pageCount*5) + 5) 
        firstFiveProducts.forEach(product => {
          tableContent += `
            <tr>
                <td>${product._id}</td>
                <td>${product.productId}</td>
                <td>${product.unitPrice}</td>
                <td>${product.quantity}</td>
                <td>${product.totalPrice}</td>
                <td>${product.description}</td>
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
            <td>Nada</td>
        </tr>
      `
    }
      
    table.innerHTML = tableHeader + tableContent + tableFooter

    paginationStart = `
      <p onClick="renderTable(0, '${apiUrl}');activePage(0)">0</p>
    `

    paginationCount = Math.ceil((data.data.length) / 5) - 1  

    let paginationContent = (paginationCount) => {
      let pages = ''
      for (let i = 0; i < paginationCount; i++) {
        pages += `<p onClick="renderTable(${i+1}, '${apiUrl}');activePage(${i+1})">${i + 1}</p>`
      }

      return pages
    }

    pagination.innerHTML = paginationStart + paginationContent(paginationCount)
  })
  .catch((error) => {
    console.log(`Error: ${error}`)
  })

}

searchBtn.addEventListener('click', function () {
  renderTable(0, apiUrl);
  activePage(0);
});
