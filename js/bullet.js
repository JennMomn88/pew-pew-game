class Bullet {
  constructor(ctx, x, y, isPlayerBullet = true) {
    this.ctx = ctx; // Contexto del canvas

    this.w = 4;
    this.h = 8;
    this.x = x; // Posición horizontal
    this.y = y; // Posición vertical

    this.vx = 0; // Velocidad en el eje X
    this.vy = isPlayerBullet ? -5 : 5; // Velocidad en el eje Y

    this.ax = -0.01; // Aceleración en el eje X
    this.ay = 1; // Aceleración en el eje Y

    this.color = isPlayerBullet ? 'red' : 'lightblue';
    this.isActive = true;
  }

  draw() {
    this.ctx.beginPath(); // Comienza el camino para dibujar
    this.ctx.fillStyle = this.color; // Establece el color de la bala
    this.ctx.fillRect(this.x, this.y, this.w, this.h); // Dibuja un cuadrado pequeño
  }

  move() {
    // Solo mueve la bala en la dirección Y
    this.y += this.vy;

    // Si la bala supera el límite superior del canvas, la elimina ajustando la posición fuera del canvas
    if (this.y < -this.size) {
      this.y = -this.size; // Saca la bala completamente del canvas
    }
  }

  checkCollision(element) {
    const colX = this.x < element.x + element.w && this.x + this.w > element.x;
    const colY = this.y < element.y + element.h && this.y + this.h > element.y;
    return colX && colY;
  }

  checkCollisions(enemies) {
    return enemies.reduce((accumulator, enemy) => {
      if (this.checkCollision(enemy)) {
        enemy.hit();
        return ++accumulator;
      }
      return accumulator;
    }, 0);
  }

  hit() {
    this.isActive = false;
  }
}
