$(document).ready(function () {
  // Agregar wrappers y encabezados a imágenes
  $("img").each(function () {
    $(this).wrap("<div class='image-wrap'></div>");
    $('<div class="wrap-header"></div>').insertBefore(this);
    $('<button class="fullscreen-btn">Pantalla Completa</button>').appendTo($(this).parent()); // Botón de fullscreen
  });

  // Agregar wrappers y encabezados a videos
  $("video").each(function () {
    $(this).wrap("<div class='image-wrap'></div>");
    $('<div class="wrap-header"></div>').insertBefore(this);
    $('<button class="fullscreen-btn">Pantalla Completa</button>').appendTo($(this).parent()); // Botón de fullscreen
  });

  // Agregar wrappers, encabezados y botón de fullscreen a iframes
  $("iframe").each(function () {
    $(this).wrap("<div class='image-wrap'></div>"); // Aplicar el wrapper
    $('<div class="wrap-header"></div>').insertBefore(this); // Encabezado
    $('<button class="fullscreen-btn">Pantalla Completa</button>').appendTo($(this).parent()); // Botón de fullscreen
  });

  // Funcionalidad del botón de pantalla completa
  $(document).on("click", ".fullscreen-btn", function () {
    const element = $(this).siblings("img, video, iframe")[0]; // Obtener el elemento correspondiente
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Para Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Para Safari
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // Para IE/Edge
      element.msRequestFullscreen();
    }
  });
});


