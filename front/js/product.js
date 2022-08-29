//Récupération de l'ID du produit par l'URL de la page
var string = window.location.href;
var url = new URL(string);
var productId = url.searchParams.get("id");

fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function (res) {
        return res.json();
    })
    .then(function (value) {
        console.log(value);
    });