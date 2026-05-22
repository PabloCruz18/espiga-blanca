const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const orderForm = document.getElementById("orderForm");
const zone = document.getElementById("zone");
const kilos = document.getElementById("kilos");
const estimateBox = document.getElementById("estimateBox");

// Cambia este número por el WhatsApp real.
// Formato: país + número, sin +, espacios ni guiones. Ejemplo: 528181234567
const whatsappNumber = "520000000000";

// Parámetros editables
const pricePerKg = 20;
const localDeliveryFee = 50;

const rules = {
  "Recolección en punto de venta": {
    minKg: 1,
    note: "Puedes recoger desde 1 kg en el punto de venta."
  },
  "Entrega local en Ciudad Victoria": {
    minKg: 5,
    note: "Entrega local sugerida desde 5 kg con envío extra."
  },
  "Fuera de Ciudad Victoria": {
    minKg: 25,
    note: "Fuera de Ciudad Victoria requiere cotización y normalmente ruta consolidada."
  }
};

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

function updateEstimate() {
  const selectedZone = zone.value;
  const kg = Number(kilos.value);
  const rule = rules[selectedZone];

  if (!selectedZone || !kg) {
    estimateBox.className = "estimate";
    estimateBox.textContent = "Completa zona y kilos para ver una guía de pedido.";
    return;
  }

  const subtotal = kg * pricePerKg;
  let deliveryText = "";

  if (selectedZone === "Entrega local en Ciudad Victoria") {
    deliveryText = ` + envío estimado desde $${localDeliveryFee} MXN`;
  } else if (selectedZone === "Fuera de Ciudad Victoria") {
    deliveryText = " + envío por cotización";
  }

  if (kg < rule.minKg) {
    estimateBox.className = "estimate warning";
    estimateBox.innerHTML = `
      <strong>Pedido por debajo del mínimo sugerido.</strong><br>
      Para esta zona se recomienda mínimo ${rule.minKg} kg. ${rule.note}<br>
      Subtotal actual: $${subtotal} MXN${deliveryText}.
    `;
    return;
  }

  estimateBox.className = "estimate";
  estimateBox.innerHTML = `
    <strong>Pedido dentro del mínimo sugerido.</strong><br>
    Subtotal estimado: $${subtotal} MXN${deliveryText}.<br>
    ${rule.note}
  `;
}

zone.addEventListener("change", updateEstimate);
kilos.addEventListener("input", updateEstimate);

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const customerName = document.getElementById("customerName").value.trim();
  const customerType = document.getElementById("customerType").value;
  const selectedZone = document.getElementById("zone").value;
  const product = document.getElementById("product").value;
  const kg = document.getElementById("kilos").value;
  const comments = document.getElementById("comments").value.trim();

  const subtotal = Number(kg) * pricePerKg;

  const message = [
    "Hola, quiero solicitar información/pedido de Espiga Blanca.",
    "",
    `Nombre o negocio: ${customerName}`,
    `Tipo de cliente: ${customerType}`,
    `Zona: ${selectedZone}`,
    `Producto: ${product}`,
    `Cantidad aproximada: ${kg} kg`,
    `Subtotal estimado antes de envío: $${subtotal} MXN`,
    "",
    "Entiendo que el pedido está sujeto a mínimo de compra, disponibilidad, zona y confirmación de envío.",
    comments ? `Comentarios: ${comments}` : ""
  ].filter(Boolean).join("\n");

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
