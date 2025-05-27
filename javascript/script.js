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

function parseFecha(fechaStr) {
  if (!fechaStr) return new Date(0); // Si está vacía, enviar al fondo
  const partes = fechaStr.split("/");
  if (partes.length !== 3) return new Date(0);
  const [dia, mes, anio] = partes;
  return new Date(`${anio}-${mes}-${dia}`); // formato ISO
}

document.addEventListener("DOMContentLoaded", function () {
  const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7XD6wpJCLK1oTBWaDx9PixN3hOapHbFrTFuAljqDr9Iv3_myTp0AoETfCF69ZD392Ew2U5neC0YPm/pub?gid=1756030888&single=true&output=csv";
  const container = document.getElementById("noticias-container");

  Papa.parse(URL_CSV, {
    download: true,
    header: true,
    complete: function (results) {
      const datos = results.data;
      
      datos.sort((a, b) => parseFecha(b.Fecha) - parseFecha(a.Fecha));
      

      datos.forEach((fila) => {
        const titulo = fila["Titulo"]?.trim();
        const fecha = fila["Fecha"]?.trim();
        const imagen = fila["Imagen"]?.trim();
        const contenido = fila["Contenido"]?.trim();

        if (titulo && contenido) {
          const noticia = document.createElement("div");
          noticia.className = "noticia-card";
          noticia.innerHTML = `
            ${imagen ? `<img src="${imagen}" alt="Imagen de la noticia">` : ""}
            <h3>${titulo}</h3>
            <div class="fecha">${fecha || ""}</div>
            <p>${contenido.replace(/\n/g, "<br>")}</p>
          `;
          container.appendChild(noticia);
        }
      });
    },
  });
});