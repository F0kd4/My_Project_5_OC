//---> Récupération des données dans le local storage
let cart = JSON.parse(localStorage.getItem("cart"));

//---> GET de l'API de chaque produit contenu dans le panier par son ID
//---> & appel de la fonction d'affichage des produits
cart.forEach(element => {
    fetch(`http://localhost:3000/api/products/${element.id}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (product) {
            displayProduct(product);
        })
        .catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
}
    
function displayProduct(product) {
        let
    }

console.log(cart);