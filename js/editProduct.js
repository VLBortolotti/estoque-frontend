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

// Verificando qual busca sera realizada
const productId  = document.querySelector('#productId')
const fieldInput = document.querySelector('#fieldInput')
const valueInput = document.querySelector('#valueInput')
const submitBtn  = document.querySelector('#submit-btn') 

// Pegando dados do form dos produtos e populando a tabela (no HTML)
const table  = document.querySelector('#tabela')

submitBtn.addEventListener('click', () => {
    if (productId.value == '') {
        msg.style.color = '#ff0000'
        msg.style.backgroundColor = '#ffbbbb'
        msg.style.display = 'block'
        msg.style.fontWeight = 'bold'
        msg.style.padding = '20px'
        msg.innerHTML = 'Identificador não preenchido'
                
    } else {
        let editData = {
            field: fieldInput.value,
            value: valueInput.value
        }

        let editDataJson = JSON.stringify(editData)

        fetch(`http://localhost:3000/products/${productId.value}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            }, 
            body: editDataJson
        })
        .then(response => response.json())
        .then( (data) => {
            console.log(`data: ${JSON.stringify(data)}`)

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
                msg.innerHTML = 'Editado com sucesso'
        
                console.log(`Data: ${JSON.stringify(data.data, null, 2)}`)
            }})
            .catch((error) => {
                console.log(`Error: ${error}`)
            })
    }
})