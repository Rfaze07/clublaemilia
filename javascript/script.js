document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");

  // Abrir/Cerrar menú hamburguesa
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // Mostrar/Ocultar secciones al hacer clic en un enlace
  const links = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");

      sections.forEach((section) => {
        if (section.id === targetId) {
          section.classList.remove("hidden");
        } else {
          section.classList.add("hidden");
        }
      });

      // Cierra el menú en móviles
      nav.classList.remove("active");
    });
  });
});

document.getElementById("formSocio").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = new FormData(this);
  const nombre = form.get("nombre");
  const email = form.get("email");
  const telefono = form.get("telefono");
  const tipo = form.get("tipo");

  // WhatsApp (reemplazá el número por el oficial del club)
  const mensaje = `¡Hola! Quiero hacerme socio del Club La Emilia.%0A%0ANombre: ${nombre}%0AEmail: ${email}%0ATeléfono: ${telefono}%0ATipo: ${tipo}`;
  const whatsappURL = `https://wa.me/5493364033688?text=${mensaje}`;
  window.open(whatsappURL, "_blank");
});

document.getElementById("formContacto").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = new FormData(this);
  const nombre = form.get("nombre");
  const mensaje = form.get("mensaje");
  const url = `https://wa.me/5493364033688?text=Mensaje de ${nombre}:%0A${mensaje}`;
  window.open(url, "_blank");
});