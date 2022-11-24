//---> GET de l'API et appel de la fonction d'affichage des produits
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        return res.json();
    })
    .then(function (products) {
        displayItems(products);
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });



//---> Fonction spécifique à l'affichage des produits
function displayItems(products) {
    for (let product of products) {
        let linkProduct = document.createElement('a');
        linkProduct.setAttribute('href', `./product.html?id=${product._id}`);
        document.getElementById("items").appendChild(linkProduct);

        let articleProduct = document.createElement('article');
        linkProduct.appendChild(articleProduct);


        let imgProduct = document.createElement('img');
        imgProduct.setAttribute('src', product.imageUrl);
        imgProduct.setAttribute('alt', product.altTxt);
        articleProduct.appendChild(imgProduct);

        let h3Product = document.createElement('h3');
        h3Product.setAttribute('class', "productName");
        articleProduct.appendChild(h3Product);
        h3Product.textContent = `${product.name}`;

        let pProduct = document.createElement('p');
        pProduct.setAttribute('class', 'productDescription');
        articleProduct.appendChild(pProduct);
        pProduct.textContent = `${product.description}`;
    }
}
