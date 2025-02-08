let deferredPrompt;
let userInteracted = false;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (userInteracted) {
    showInstallPrompt();
  }
});

function showInstallPrompt() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA instalada');
      } else {
        console.log('PWA no instalada');
      }
      deferredPrompt = null;
    });
  }
}

function userInteractionDetected() {
  userInteracted = true;
  if (deferredPrompt) {
    showInstallPrompt();
  }
}

// Inicializa el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
      console.log('Service Worker registrado con éxito:', registration);
    }).catch((error) => {
      console.log('Error al registrar el Service Worker:', error);
    });
  });
}
