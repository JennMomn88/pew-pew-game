class Player {
  constructor(ctx, pointLive) {
    this.ctx = ctx; // Contexto del canvas

    this.w = 40; // Ancho de la nave
    this.h = 20; // Altura de la nave

    this.x = (ctx.canvas.width - this.w) / 2; // Posición inicial centrada
    this.y = ctx.canvas.height - this.h - 20; // Posición en la parte inferior del canvas

    this.vx = 0; // Velocidad horizontal
    this.speed = 5; // Velocidad de movimiento

    this.image = new Image(); // Imagen de la nave
    this.image.frames = 1; // Solo una imagen para la nave
    this.image.frameIndex = 0; // Índice del marco de la imagen
    this.image.src = '../assets/img/Nave_espacial_1_medium.png'; // Cambia a la ruta de tu imagen

    this.tick = 0; // Contador para la animación
    this.bullets = []; // Array para las balas
    this.pointLive = pointLive;
    this.setListeners();
  }

  move() {
    // Actualiza la posición horizontal de la nave
    this.x += this.vx;

    // Limita el movimiento dentro del canvas
    if (this.x < 0) {
      this.x = 0; // Límite izquierdo
    }
    if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w; // Límite derecho
    }

    this.clearBullets();
    // Actualiza las balas
    this.bullets.forEach((b) => b.move());
    // Elimina balas que han salido del canvas
    this.bullets = this.bullets.filter((b) => b.x <= this.ctx.canvas.width);
  }

  draw() {
    // Dibuja la nave
    this.ctx.drawImage(
      this.image,
      (this.image.frameIndex / this.image.frames) * this.image.width,
      0,
      (1 / this.image.frames) * this.image.width,
      this.image.height,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}
