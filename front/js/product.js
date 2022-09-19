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

    // const checkSameItem = () => {
    //     itemsInCart.forEach(element => {
    //         ((element.id == productObject.id) && (element.color == productObject.color))
    //         element.quantity = productObject.quantity + element.quantity;
    //     }
    //     });
    // };

    if (itemsInCart) {
        if (itemsInCart.forEach(element => {
            ((element.id == productObject.id) && (element.color == productObject.color))
        })) {
            element.quantity = element.quantity + productObject.quantity;
            return itemsInCart;
        } else {
            itemsInCart.push(productObject);
            localStorage.setItem("cart", JSON.stringify(itemsInCart));
        };


    } else {
        itemsInCart = [];
        itemsInCart.push(productObject);
        localStorage.setItem("cart", JSON.stringify(itemsInCart));
    };

    console.log(itemsInCart);











    // let inCartItems = JSON.parse(localStorage.getItem("product"))
    // // s'il y a un produit dans le local storage  //
    // if (inCartItems) {
    //     inCartItems.push(productObject)
    //     localStorage.setItem("product", JSON.stringify(inCartItems))
    // }
    // // s'il n'y a pas un produit dans le local storage  //
    // else {
    //     inCartItems = []
    //     inCartItems.push(productObject)
    //     console.log(inCartItems)
    //     localStorage.setItem("product", JSON.stringify(inCartItems))
    // }
    //stockage des caractéristiques dans un tableau
    // let itemArray = [productObject];


    //Getion du localStorage
    // localStorage.setItem('cartItem', JSON.stringify(itemArray));


    //  function getCart() {
    //      let cart = localStorage.getItem("cartItem");
    //      if (cart != null) {

    //      } else {

    //      }
    //     return JSON.parse(cart);
    //  }

    // function addCart(item) {
    //     let cart = getCart();
    //     let foundItem = cart.find((p => p.id == item.id) && (p => p.color == item.color));
    //     if (foundItem != undefined) {
    //         item.quantity = item.quantity + foundItem.quantity;
    //     } else {
    //         cart.push(item);
    //     }
    //     cart.push(item);
    //     saveCart(itemArray);
    // }




    // function getCart() {
    //     let cart = localStorage.getItem("cartItem");
    //     if (cart == null) {
    //         return [];
    //     } else {
    //         return JSON.parse(cart);
    //     }
    // }

    // function addCart(product) {
    //     let cart = getCart();
    //     let foundProduct = cart.find(p => p.id == product.id);
    //     if (foundProduct != undefined) {
    //         foundProduct.quantity +=;
    //     } else {
    //         cart.push(product);
    //     }
    //     saveCart(cart);
    // }


    //if (name dans le panier === name && couleur dans le panier === color alors qty +=)


});

