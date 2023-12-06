// Pegando os dados da pesquisa
const searchBtn   = document.querySelector('#btn-search')
const searchKey   = document.querySelector('#key-search')
const searchValue = document.querySelector('#input-search') 

// Definindo para qual endpoint sera feita a requisicao
const apiUrl = 'http://localhost:3000/products/filter/' 

const table  = document.querySelector('#tabela')

// Populando a tabela de resultados ao clicar no botao de busca
searchBtn.addEventListener('click', function () {
  renderTable(0, apiUrl);
  activePage(0);
});