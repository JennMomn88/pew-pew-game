class Background {
  constructor(ctx) {
    this.ctx = ctx; // Contexto del canvas
    this.w = this.ctx.canvas.width; // Ancho del canvas
    this.h = this.ctx.canvas.height; // Alto del canvas
    this.vx = -2; // Velocidad de movimiento hacia la izquierda

    this.stars = []; // Array para almacenar estrellas
    this.generateStars(); // Generar estrellas al inicializar el fondo
  }

  generateStars() {
    for (let i = 0; i < 100; i++) {
      // Bucle ejecuta 100 veces
      this.stars.push({
        // Agrega cada estrella al array
        x: Math.random() * this.ctx.canvas.width, // Posición horizontal generada random
        y: Math.random() * this.ctx.canvas.height, // Posición vertical generada random
        radius: Math.random() * 2 + 1, // Tamaño de la estrella aleatorio
        speed: Math.random() * 0.5 + 0.5, // Velocidad aleatoria de la estrella
      });
    }
  }

  draw() {
    // Dibuja las estrellas
    this.drawStars();
  }

  drawStars() {
    this.ctx.fillStyle = 'white'; // Color de las estrellas
    this.stars.forEach((star) => {
      this.ctx.beginPath(); // Comienza un nuevo camino
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); // Dibuja cada estrella
      this.ctx.fill(); // Rellena la estrella
    });
  }

  move() {
    // Mueve las estrellas
    this.moveStars();
  }

  moveStars() {
    this.stars.forEach((star) => {
      star.y += star.speed; // Mueve cada estrella hacia abajo
      // Si la estrella sale de la pantalla, reiníciala en la parte superior
      if (star.y > this.ctx.canvas.height) {
        star.y = 0; // Resetea la posición Y
        star.x = Math.random() * this.ctx.canvas.width; // Nuevas coordenadas X aleatorias
      }
    });
  }
}
