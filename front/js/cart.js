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
            displayProduct(product, element);
        })
        .catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
});

//---> fonction relative à l'intégration HTML spécifique à chaque produit du panier
function displayProduct(product, element) {

    let articleProduct = document.createElement("article");
    articleProduct.setAttribute("class", "cart__item");
    articleProduct.setAttribute("data-id", product._id);
    articleProduct.setAttribute("data-color", element.color);
    document.getElementById("cart__items").appendChild(articleProduct);

    let divImg = document.createElement("div");
    divImg.setAttribute("class", "cart__item__img");
    articleProduct.appendChild(divImg);

    let img = document.createElement("img");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);
    divImg.appendChild(img);

    let divContent = document.createElement("div");
    divContent.setAttribute("class", "cart__item__content");
    articleProduct.appendChild(divContent);

    let divContentDescr = document.createElement("div");
    divContentDescr.setAttribute("class", "cart__item__content__description");
    divContent.appendChild(divContentDescr);

    let hNameProduct = document.createElement("h2");
    divContentDescr.appendChild(hNameProduct);
    hNameProduct.textContent = `${product.name}`;

    let pElementColor = document.createElement("p");
    divContentDescr.appendChild(pElementColor);
    pElementColor.textContent = `${element.color}`;

    let pPriceProduct = document.createElement("p");
    divContentDescr.appendChild(pPriceProduct);
    pPriceProduct.textContent = `${product.price} €`;

    let divContentSett = document.createElement("div");
    divContentSett.setAttribute("class", "cart__item__content__settings");
    divContent.appendChild(divContentSett);

    let divContentSettQty = document.createElement("div");
    divContentSettQty.setAttribute("class", "cart__item__content__settings__quantity");
    divContentSett.appendChild(divContentSettQty);

    let pContentSettQty = document.createElement("p");
    divContentSettQty.appendChild(pContentSettQty);
    pContentSettQty.textContent = "Qté : ";

    let inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("id", "itemQuantity");
    inputQuantity.setAttribute("class", "itemQuantity");
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", 1);
    inputQuantity.setAttribute("max", 100);
    inputQuantity.setAttribute("value", element.quantity);
    divContentSettQty.appendChild(inputQuantity);
    inputQuantity.addEventListener("change", event => {
        changeQty(event);
    });

    let divContentSettDel = document.createElement("div");
    divContentSettDel.setAttribute("class", "cart__item__content__settings__delete");
    divContentSett.appendChild(divContentSettDel);

    let pContentSettDel = document.createElement("p");
    divContentSettDel.appendChild(pContentSettDel);
    pContentSettDel.textContent = "Supprimer";
};



function changeQty(event) {
    const inputItem = event.target;
    const articleItem = inputItem.closest('article');

    const idItem = articleItem.getAttribute("data-id");
    const colorItem = articleItem.getAttribute("data-color");
    const newValue = event.target.value;

    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(element => {
        if ((element.id == idItem) && (element.color == colorItem)) {
            element.quantity = newValue;
        }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.reload();
};
