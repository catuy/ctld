$(document).ready(function () {
  function createNavBar() {
    const navBar = document.createElement('div');
    navBar.style.background = '#fff';
    navBar.style.borderBottom = '1px solid var(--color-primary)';
    navBar.style.height = '30px';
    navBar.style.display = 'flex';
    navBar.style.alignItems = 'center';
    navBar.style.padding = '0 8px';
    navBar.style.boxSizing = 'border-box';

    // Agregar círculos al navBar
    ['#fff', '#fff', '#fff'].forEach(color => {
      const circle = document.createElement('span');
      circle.style.width = '8px';
      circle.style.height = '8px';
      circle.style.backgroundColor = color;
      circle.style.borderRadius = '50%';
      circle.style.marginRight = '6px';
      circle.style.border = '1px solid var(--color-primary)';
      navBar.appendChild(circle);
    });

    return navBar;
  }

  // Agregar wrappers, encabezados y botones a imágenes, videos e iframes
  $("img, video, iframe").each(function () {
    const $this = $(this);

    // Crear el wrapper y el encabezado
    $this.wrap("<div class='image-wrap'></div>");
    const wrapper = $this.parent();
    const navBar = createNavBar();
    wrapper.prepend(navBar);

    // Agregar botón de fullscreen
    $('<button class="fullscreen-btn">⛶</button>').appendTo(wrapper);

    // Aplicar estilos al wrapper
    wrapper.css({
      position: 'relative',
      border: '1px solid var(--color-primary)',
      borderRadius: '8px',
      overflow: 'hidden',
      zIndex: '1000'
    });
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
