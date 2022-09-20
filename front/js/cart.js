let cart = JSON.parse(localStorage.getItem("cart"));

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