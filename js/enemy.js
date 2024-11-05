class Enemy {
  constructor(ctx, x, y, fireRate) {
    this.ctx = ctx; // Contexto del canvas
    this.w = 35; // Ancho del enemigo
    this.h = 30; // Alto del enemigo
    this.x = x; // Posición inicial horizontal
    this.y = y; // Posición inicial vertical

    this.vx = Math.random() + 1.5; // Velocidad en el eje X (random para variación)
    this.vy = Math.random() / 2; // Velocidad en el eje Y

    this.direction = 1; // Dirección de movimiento (1 = derecha, -1 = izquierda)

    this.img = new Image();
    this.img.src = '../assets/img/nave_espacial_enemigo_1_medium.png'; // Ruta a la imagen del enemigo

    this.bullets = []; // Arreglo para las balas del enemigo
    this.fireRate = fireRate; // Frecuencia de disparo en milisegundos

    // Llama a la función de disparo cada fireRate milisegundos
    this.fireInterval = setInterval(() => this.fire(), this.fireRate);
    this.isActive = true;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.bullets.forEach((bullet) => bullet.draw()); // Dibuja todas las balas
  }

  move() {
    this.x += this.vx * this.direction;
    this.y += this.vy; // Mueve el enemigo según la velocidad y dirección

    // Cambia la dirección al llegar a los límites del canvas
    if (this.x + this.w > this.ctx.canvas.width || this.x < 0) {
      this.direction *= -1; // Cambia la dirección
    }
    this.clearBullets();

    // Actualiza las balas
    this.bullets.forEach((b) => b.move());
    // Elimina balas que han salido del canvas
    this.bullets = this.bullets.filter((b) => b.y <= this.ctx.canvas.height);
  }

  fire() {
    // Crea una nueva bala y la añade al array de balas
    const bullet = new Bullet(
      this.ctx,
      this.x + this.w / 2,
      this.y + this.h,
      false
    ); // La y se ajusta para que salga de la parte inferior del enemigo
    this.bullets.push(bullet);
  }

  checkCollision(element) {
    const colX = this.x < element.x + element.w && this.x + this.w > element.x;
    const colY = this.y < element.y + element.h && this.y + this.h > element.y;
    return colX && colY;
  }

  checkCollisions(player) {
    let totalHits = 0;
    if (this.checkCollision(player)) {
      ++totalHits;
      this.hit();
    }

    totalHits += this.bullets.reduce((accumulator, bullet) => {
      if (bullet.checkCollision(player)) {
        bullet.hit();
        return ++accumulator;
      }

      return accumulator;
    }, 0);

    if (totalHits > 0) player.hit(totalHits);
  }

  hit() {
    this.isActive = false;
  }

  clearBullets() {
    this.bullets = this.bullets.filter((bullet) => bullet.isActive);
  }
}
