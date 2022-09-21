//---> Récupération des données dans le local storage
let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
//---> GET de l'API de chaque produit contenu dans le panier par son ID
//---> & appel de la fonction d'affichage des produits
cart.forEach(element => {
    console.log("IDs :", element.id);
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

function displayProduct(product) {
    let article = document.createElement("article");
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id", product._id);
    article.setAttribute("data-color", product.colors);
    document.getElementById("cart__items").appendChild(article);
    let div1 = document.createElement("div");
    div1.setAttribute("class", "cart__item__img");
    document.querySelector(".cart__item").appendChild(div1);
    let img = document.createElement("img");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);
    document.querySelector(".cart__item__img").appendChild(img);
    let div2 = document.createElement("div");
    div2.setAttribute("class", "cart__item__content");
    document.querySelector(".cart__item").appendChild(div2);
    let div2_1 = document.createElement("div");
    div2_1.setAttribute("class", "cart__item__content__description");
    document.querySelector(".cart__item__content__description").innerHTML += `
        <h2>${product.name}</h2>
                    <p>Vert</p>
                    <p>${product.price} €</p>`;
    document.querySelector(".cart__item__content").appendChild(div2_1);

};

