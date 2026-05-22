const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

const form = document.getElementById('pedidoForm');
const whatsappNumber = '520000000000';

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const producto = document.getElementById('producto').value.trim();
    const cantidad = document.getElementById('cantidad').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const comentarios = document.getElementById('comentarios').value.trim() || 'Sin comentarios';

    if (!producto || !cantidad || !nombre || !telefono) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    const message = [
      'Hola, quiero hacer un pedido en Espiga Blanca:',
      `• Producto: ${producto}`,
      `• Cantidad: ${cantidad}`,
      `• Nombre: ${nombre}`,
      `• Teléfono: ${telefono}`,
      `• Comentarios: ${comentarios}`
    ].join('\n');

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
}
