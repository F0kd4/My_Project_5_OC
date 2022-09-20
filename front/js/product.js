//Récupération de l'ID du produit par l'URL de la page


function getId() {
    var string = window.location.href;
    var url = new URL(string);
    var productId = url.searchParams.get("id");
    return productId;
};


//GET sur l'API & affichage du produit
fetch(`http://localhost:3000/api/products/${getId()}`)
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
addToCartBtn.addEventListener("click", () => {

    //récupération des caractéristiques de l'élément à ajouter au panier
    let color = document.getElementById("colors").value;
    let quantity = parseInt(document.getElementById("quantity").value);
    let idProduct = getId();

    if (color == "") {
        alert("Sélectionnez une couleur avant de continuer");
        return;
    }

    if (quantity < 1 || quantity > 100) {
        alert("Sélectionnez une quantité contenue entre 1 et 100");
        return;
    }

    let productObject = {
        "id": idProduct,
        "color": color,
        "quantity": quantity
    }

    let item = [productObject];

    let itemsInCart = JSON.parse(localStorage.getItem("cart"));

    if (itemsInCart) {
        let modifiedCart = false;
        itemsInCart.forEach(element => {
            if ((element.id == productObject.id) && (element.color == productObject.color)) {
                element.quantity = element.quantity + productObject.quantity;
                modifiedCart = true;
            }
        })

        if (!modifiedCart) {
            itemsInCart.push(productObject);
        };


    } else {
        itemsInCart = [];
        itemsInCart.push(productObject);
    };

    localStorage.setItem("cart", JSON.stringify(itemsInCart));

});