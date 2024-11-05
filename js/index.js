// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Obtener el elemento canvas y su contexto
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  // Verifica si `ctx` se ha obtenido correctamente
  if (!ctx) {
    console.error('Error: no se pudo obtener el contexto del canvas.');
  }

  // Crear una nueva instancia del juego
  let game = new Game(ctx);

  // Iniciar el juego
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');
  const restartButton = document.getElementById('restartButton');

  startButton.addEventListener('click', () => {
    if (!game.started) {
      game.start(); // Iniciar el juego si no ha comenzado
    } else {
      game.pause(); // Pausar el juego si ya ha comenzado
    }
  });

  pauseButton.addEventListener('click', () => {
    if (game.started) {
      game.pause(); // Pausar el juego si está en marcha
    }
  });

  restartButton.addEventListener('click', () => {
    game.pause();
    game.clear(); // Pausar el juego antes de reiniciar
    game = new Game(ctx); // Crear una nueva instancia de Game
  });
});
