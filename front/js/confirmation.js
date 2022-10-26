//---> Récupération du numéro de commande dans l'URL de la page, et affichage de celui-ci par l'HTML
let params = new URLSearchParams(window.location.search);
const orderId = params.get("id");
document.getElementById("orderId").innerHTML += `${orderId}`;