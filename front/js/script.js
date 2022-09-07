//GET de l'API et appel de la function d'affichage
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        return res.json();
    })
    .then(function (products) {
        displayItems(products);
    })



//Fonction spécifique à l'affichage des produits
function displayItems(products) {
    const productsItem = document.getElementById("items");

    for (let product of products) {
        productsItem.innerHTML += `
        <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
    }
}
