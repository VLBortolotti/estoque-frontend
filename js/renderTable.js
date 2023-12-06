// Mostrando qual pagina esta ativa
function activePage(pageNumber) {
    const currentPageDiv = document.querySelector('#currentPage')
    
    // currentPageDiv.innerHTML = `Página: ${element.innerHTML}`
    currentPageDiv.innerHTML = `Página: ${pageNumber}`
}
  
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