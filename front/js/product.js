//Récupération de l'ID du produit par l'URL de la page
var string = window.location.href;
var url = new URL(string);
var productId = url.searchParams.get("id");


//GET sur l'API & affichage du produit
fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function (res) {
        return res.json();
    })
    .then(function (product) {
        displayProduct(product);
    });


//Fonction spécifique à l'affichage du produit
function displayProduct(product) {
    let image = document.createElement("img");
    image.setAttribute("src", product.imageUrl);
    image.setAttribute("alt", product.altTxt);
    document.querySelector(".item__img").appendChild(image);
    document.getElementById("title").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description
    for (let color of product.colors) {
        let colorChoice = document.getElementById("colors");
        let option = document.createElement("option");
        option.setAttribute("value", color);
        option.textContent = color;
        colorChoice.appendChild(option);
    }
};

// //Ecoute sur le bouton d'ajout au panier et fonction spécifique à l'ajout
let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", function (event) {
    event.preventDefault();
});

