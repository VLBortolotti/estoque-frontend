let dropdown = document.getElementsByClassName("dropdown-btn");
let i;

let produtosContainer = document.querySelector('.produtos-container')
produtosContainer.classList.toggle("active")
produtosContainer.nextElementSibling.style.display = "block"

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

userData     = JSON.parse(localStorage.getItem('userData'))
let userName = document.querySelector("#userName")
userName.innerHTML = userData.name


