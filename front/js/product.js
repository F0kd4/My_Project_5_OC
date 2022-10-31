//--->Récupération de l'ID du produit par l'URL de la page
function getId() {
    var string = window.location.href;
    var url = new URL(string);
    var productId = url.searchParams.get("id");
    return productId;
};


//--->GET de l'API du produit pas son ID & appel de la fonction d'affichage
fetch(`http://localhost:3000/api/products/${getId()}`)
    .then(function (res) {
        return res.json();
    })
    .then(function (product) {
        displayProduct(product);
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });


//--->Fonction spécifique à l'affichage du produit
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

//--->Ecoute de l'évènement "clic" le bouton d'ajout au panier 
let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", () => {

    //--->récupération des caractéristiques de l'élément à ajouter au panier
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


    //---> Création de l'objet "produit" à insére dans le local storage
    let productObject = {
        "id": idProduct,
        "color": color,
        "quantity": quantity
    }

    //---> Récupération des items déjà présent dans le panier
    let itemsInCart = JSON.parse(localStorage.getItem("cart"));


    //---> Si l'item est déjà présent dans le panier (id + couleur) alors on augmente sa quantité
    if (itemsInCart) {
        let modifiedQty = false;
        itemsInCart.forEach(element => {
            if ((element.id == productObject.id) && (element.color == productObject.color)) {
                element.quantity = element.quantity + productObject.quantity;
                modifiedQty = true;
                alert('Votre sélection a été ajoutée au panier!');
            }
        })


        //---> Si il n'y a pas de quantité à modifier, push du nouvel item
        if (!modifiedQty) {
            itemsInCart.push(productObject);
            alert('Votre sélection a été ajoutée au panier!');
        };

        //---> Le panier n'existe pas : création d'un array pour le stocker    
    } else {
        itemsInCart = [];
        itemsInCart.push(productObject);
        alert('Votre sélection a été ajoutée au panier!');
    };

    //---> Sauvegarde du panier dans le local storage
    localStorage.setItem("cart", JSON.stringify(itemsInCart));
});