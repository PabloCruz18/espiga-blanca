const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const orderForm = document.getElementById("orderForm");

// Cambia este número por el WhatsApp real.
// Formato recomendado: país + número, sin +, espacios ni guiones.
// Ejemplo Monterrey: 528181234567
const whatsappNumber = "520000000000";

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const product = document.getElementById("product").value;
  const quantity = document.getElementById("quantity").value.trim();
  const comments = document.getElementById("comments").value.trim();

  const message = [
    "Hola, quiero hacer un pedido de Espiga Blanca.",
    "",
    `Nombre: ${name}`,
    `Producto: ${product}`,
    `Cantidad: ${quantity}`,
    comments ? `Comentarios: ${comments}` : "",
  ].filter(Boolean).join("\n");

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
