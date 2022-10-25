//---> Récupération des données dans le local storage
var cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
var getId = cart.map(element => element.id);
console.log(getId);


//---> GET de l'API de chaque produit contenu dans le panier par son ID
//---> & appel de la fonction d'affichage des produits, du calcul du prix total et du nbr d'articles
cart.forEach(element => {
    fetch(`http://localhost:3000/api/products/${element.id}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (product) {
            displayProduct(product, element);
            document.getElementById("totalQuantity").innerHTML = totalQty();
            document.getElementById("totalPrice").innerHTML = totalPrice(product, element);
        })
        .catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
});

//---> Fonction relative à l'intégration HTML et à l'appel des fonctions de la page
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
    //---> Ecoute de l'évènement "change" dans l'input relatif aux quantités
    inputQuantity.addEventListener("change", event => {
        //---> Limitation des valeurs dans l'input
        if ((event.target.value < 1) || (event.target.value > 100)) {
            alert('La quantité doit être comprise entre 1 et 100.');
            return;
        }
        changeQty(event);
    });

    let divContentSettDel = document.createElement("div");
    divContentSettDel.setAttribute("class", "cart__item__content__settings__delete");
    divContentSett.appendChild(divContentSettDel);


    let pContentSettDel = document.createElement("p");
    divContentSettDel.appendChild(pContentSettDel);
    pContentSettDel.textContent = "Supprimer";
    //---> Ecoute de l'évènement "clic" sur "Supprimer"
    pContentSettDel.addEventListener("click", event => {
        deleteItem(event);
    });


};


//---> Fonction relative aux changements de quantité des items
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


//---> Fonction relative à la suppression des items
function deleteItem(event) {
    const clickToDel = event.target;
    const articleItemToDel = clickToDel.closest('article');

    //---> Récupération de l'id et de la couleur à supprimer
    const idItemToDel = articleItemToDel.getAttribute("data-id");
    const colorItemToDel = articleItemToDel.getAttribute("data-color");

    //---> Récupération du tableau "cart" correspondant aux articles dans le panier
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(element => {
        //---> Si l'article cliqué a le même id ET la même couleur
        if ((element.id == idItemToDel) && (element.color == colorItemToDel)) {
            //---> On supprime l'article sur l'index de l'élément qui correspond
            let index = cart.indexOf(element);
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    });

    window.location.reload();
};

//---> Fonction relative au calcul du total de la quantité d'articles dans le panier
function totalQty() {
    let totalQuantity = 0;
    cart.forEach(element => {
        let Qty = parseInt(element.quantity);
        totalQuantity += Qty;
    });
    return totalQuantity;
};

//---> Définition de la variable pour calculer le prix total du panier (en dehors du FETCH)
var totalPriceCart = 0;

//--->Fonction relative au calcul du prix total du panier
function totalPrice(product, element) {
    let totalPriceItem = parseInt(element.quantity) * parseInt(product.price);
    totalPriceCart += totalPriceItem;

    return totalPriceCart;
};



//--->Repère et écoute de "change" sur le formulaire et ses sections, pour l'attribution des regExp
var form = document.querySelector('.cart__order__form');


form.firstName.addEventListener("change", function () {
    validFirstName(this);
});

form.lastName.addEventListener("change", function () {
    validLastName(this);
});

form.address.addEventListener("change", function () {
    validAddress(this);
});

form.city.addEventListener("change", function () {
    validCity(this);
});

form.email.addEventListener("change", function () {
    validEmail(this);
});


//---> Validation des inputs du formulaire par applications de RegExp spécifiques
const validFirstName = function (inputFirstName) {
    var regFirstName = new RegExp('^[A-Za-zÀ-ú\-\\s]{1,20}$', 'g');
    var testFirstName = regFirstName.test(form.firstName.value);
    if (!testFirstName) {
        document.getElementById("firstNameErrorMsg").textContent = "Veuillez entrer un prénom valide.";
    } else {
        document.getElementById("firstNameErrorMsg").textContent = "";
        return;
    };
};

const validLastName = function (inputLastName) {
    let regLastName = new RegExp('^[A-Za-zÀ-ú\-\\s]{1,20}$', 'g');
    var testLastName = regLastName.test(inputLastName.value);
    if (!testLastName) {
        document.getElementById("lastNameErrorMsg").textContent = "Veuillez entrer un nom valide.";
    } else {
        document.getElementById("lastNameErrorMsg").textContent = "";
        return;
    };
};

const validAddress = function (inputAddress) {
    let regAddress = new RegExp('^[0-9A-Za-zÀ-ú,\-\\s]+$', 'g');
    var testAddress = regAddress.test(inputAddress.value);
    if (!testAddress) {
        document.getElementById("addressErrorMsg").textContent = "Veuillez entrer une adresse valide.";
    } else {
        document.getElementById("addressErrorMsg").textContent = "";
        return;
    };
};

const validCity = function (inputCity) {
    let regCity = new RegExp('^[A-Za-zÀ-ú\-\s]+$', 'g');
    var testCity = regCity.test(inputCity.value);
    if (!testCity) {
        document.getElementById("cityErrorMsg").textContent = "Veuillez inscrire votre ville de résidence.";
    } else {
        document.getElementById("cityErrorMsg").textContent = "";
        return;
    };
};

const validEmail = function (inputEmail) {
    let regEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    var testEmail = regEmail.test(inputEmail.value);
    if (!testEmail) {
        document.getElementById("emailErrorMsg").textContent = "Veuillez entrer une adresse email valide.";
    } else {
        document.getElementById("emailErrorMsg").textContent = "";
        return;
    };
};



//---> Ecoute sur l'event click pour confirmer le formulaire de contact & la commande 
document.getElementById("order").addEventListener("click", event => {
    event.preventDefault();
    confirmOrder();
});

//---> Function de confirmation de commande
const confirmOrder = function () {
    //---> Condition de formulaire validé par les regExp
    if (validFirstName && validLastName && validAddress && validCity && validEmail) {
        //---> Création de l'objet formulaire de contact
        const completedForm = {
            contact: {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                address: form.address.value,
                city: form.city.value,
                email: form.email.value
            },
            products: getId
        };
        //---> Requête API par envoi de l'objet formulaire de contact
        const resultApi = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(completedForm)
        })
            //---> Récupération de la réponse contenant le n° de commande
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            //---> Suppression du panier, et redirection vers la page de confirmation
            .then(function (data) {
                localStorage.removeItem("cart");
                window.location.href = `confirmation.html?id=${data.orderId}`;
            })
            .catch(function (error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            })
    }
};


