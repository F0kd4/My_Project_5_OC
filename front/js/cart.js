//---> Récupération des données dans le local storage
let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
//---> GET de l'API de chaque produit contenu dans le panier par son ID
//---> & appel de la fonction d'affichage des produits
cart.forEach(element => {
    console.log("IDs :", element.id);
    console.log("color :", element.color);
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
});

//---> fonction relative à l'intégration HTML spécifique à chaque produit du panier
function displayProduct(product) {
    let articleProduct = document.createElement("article");
    articleProduct.setAttribute("class", "cart__item");
    articleProduct.setAttribute("data-id", product._id);
    articleProduct.setAttribute("data-color", product.colors);
    document.getElementById("cart__items").appendChild(articleProduct);
    let div1 = document.createElement("div");
    div1.setAttribute("class", "cart__item__img");
    articleProduct.appendChild(div1);
    let img = document.createElement("img");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);
    div1.appendChild(img);
    let div2 = document.createElement("div");
    div2.setAttribute("class", "cart__item__content");
    articleProduct.appendChild(div2);
    let div2_1 = document.createElement("div");
    div2_1.setAttribute("class", "cart__item__content__description");
    div2.appendChild(div2_1);
    div2_1.innerHTML += `
        <h2>${product.name}</h2>
        <p>vert à modifier/!</p>
        <p>${product.price} €</p>`;
    let div2_2 = document.createElement("div");
    div2_2.setAttribute("class", "cart__item__content__settings");
    div2.appendChild(div2_2);
    let div2_2_1 = document.createElement("div");
    div2_2_1.setAttribute("class", "cart__item__content__settings__quantity");
    div2_2.appendChild(div2_2_1);
    div2_2_1.innerHTML += `
        <p>Qté : </p>`;
    let inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("class", "itemQuantity");
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", 1);
    inputQuantity.setAttribute("max", 100);
    inputQuantity.setAttribute("value", 42);//>>>>MODIF/!\!!
    div2_2_1.appendChild(inputQuantity);
    let div2_2_2 = document.createElement("div");
    div2_2_2.setAttribute("class", "cart__item__content__settings__delete");
    div2_2.appendChild(div2_2_2);
    div2_2_2.innerHTML += `
        <p class="deleteItem">Supprimer</p>`;
};


