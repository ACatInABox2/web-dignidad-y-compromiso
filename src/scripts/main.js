const firma_digital = {
    nombre: "Santiago Torres",
    email: "santiagomh912@gmail.com",
    telefono: "+57 3216166273",
    cargo: "Desarrollador Web",
}

document.addEventListener("DOMContentLoaded", () => {
    console.log(firma_digital);
    includeComponent("header", "./components/header.html");
    includeComponent("footer", "./components/footer.html");
    includeComponent("Información", "./components/card.html");
});

function includeComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return;

    fetch(file)
        .then(res => res.text())
        .then(html => element.innerHTML = html)
        .catch(err => console.error(`Error loading ${file}:`, err));
}

