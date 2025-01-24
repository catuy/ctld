const root = document.documentElement;

// Definir colores
root.style.setProperty('--color-primary', '#EB0000');
root.style.setProperty('--second-color', '#ffffff');
const background_color = '#EB0000';

// Crear el favicon dinámicamente
function createFavicon(color) {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="${color}" />
    </svg>`;
    
    // Convertir el SVG a un data URL
    const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Crear o reemplazar el favicon
    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
    }
    favicon.href = svgUrl;
}

// Llamar a la función con el color principal
createFavicon(background_color);
