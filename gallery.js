document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll(".gallery");

  galleries.forEach((gallery, galleryIndex) => {
    // Crear el contenedor de tabs
    const tabContainer = document.createElement("div");
    tabContainer.classList.add("tab-container");
    tabContainer.setAttribute("role", "tablist");
    gallery.insertBefore(tabContainer, gallery.firstChild);

    const items = [...gallery.querySelectorAll("dl")]; // Almacena todos los elementos `dl`

    // Crear tabs dinámicamente
    items.forEach((dl, idx) => {
      const tab = document.createElement("button");
      tab.classList.add("tab");
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", `gallery-${galleryIndex}-item-${idx}`);
      tab.textContent = idx + 1;

      // Agregar tooltip usando el atributo `alt` de la imagen
      tab.setAttribute('title', dl.querySelector('img')?.alt || '');

      // Marcar como activo si tiene la clase "shown"
      if (dl.classList.contains("shown")) {
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
      } else {
        dl.style.display = "none";
      }

      dl.id = `gallery-${galleryIndex}-item-${idx}`;
      tabContainer.appendChild(tab);
    });

    // Delegación de eventos para manejar clics en tabs
    tabContainer.addEventListener("click", (event) => {
      if (!event.target.classList.contains("tab")) return;

      const tabs = [...tabContainer.querySelectorAll(".tab")];
      const index = tabs.indexOf(event.target);

      // Actualizar todos los tabs
      tabs.forEach((tab, idx) => {
        tab.classList.toggle("active", idx === index);
        tab.setAttribute("aria-selected", idx === index ? "true" : "false");
        items[idx].style.display = idx === index ? "" : "none";
      });
    });
  });
});
