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
addToCartBtn.addEventListener("click", function (event) {
    event.preventDefault();

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
    //stockage des caractéristiques dans un tableau
    let itemArray = [productObject];
    
    localStorage.setItem('cartItem', JSON.stringify(itemArray));


    //if (name dans le panier === name && couleur dans le panier === color alors qty +=)


});

