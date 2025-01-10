$(document).ready(function () {
  // Agregar wrappers y encabezados a imágenes
  $("img").each(function () {
    $(this).wrap("<div class='image-wrap'></div>");
    $('<div class="wrap-header"></div>').insertBefore(this);
  });

  // Agregar wrappers y encabezados a videos
  $("video").each(function () {
    $(this).wrap("<div class='image-wrap'></div>");
    $('<div class="wrap-header"></div>').insertBefore(this);
  });

  // Agregar wrappers, encabezados y botón de fullscreen a iframes
  $("iframe").each(function () {
    $(this).wrap("<div class='image-wrap'></div>"); // Aplicar el wrapper
    $('<div class="wrap-header"></div>').insertBefore(this); // Encabezado
    $('<button class="fullscreen-btn">Pantalla Completa</button>').appendTo($(this).parent()); // Botón de fullscreen
  });

  // Funcionalidad del botón de pantalla completa
  $(document).on("click", ".fullscreen-btn", function () {
    const iframe = $(this).siblings("iframe")[0]; // Obtener el iframe correspondiente
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Para Firefox
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Para Safari
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // Para IE/Edge
      iframe.msRequestFullscreen();
    }
  });
});
