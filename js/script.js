document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
});


window.onload = function () {
    document.getElementById("techie-cards").onclick = () => window.location.href = "products/techie_cards.html";
    document.getElementById("techie-portfolios").onclick = () => window.location.href = "products/techie_portfolios.html";
    document.getElementById("techie-game").onclick = () => window.location.href = "products/techie_game.html";
};

