class Player {
  constructor(ctx, pointLive) {
    this.ctx = ctx; // Contexto del canvas

    this.w = 40; // Ancho de la nave
    this.h = 25; // Altura de la nave

    this.x = (ctx.canvas.width - this.w) / 2; // Posición inicial centrada
    this.y = ctx.canvas.height - this.h - 20; // Posición en la parte inferior del canvas

    this.vx = 0; // Velocidad horizontal
    this.speed = 5; // Velocidad de movimiento

    this.image = new Image(); // Imagen de la nave
    this.image.frames = 1; // Solo una imagen para la nave
    this.image.frameIndex = 0; // Índice del marco de la imagen
    this.image.src = 'assets/img/Nave_espacial_1_medium.png'; // Cambia a la ruta de tu imagen

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

    // Dibuja las balas
    this.bullets.forEach((b) => b.draw());
    this.pointLive.draw();
  }

  onKeyDown(code) {
    switch (code) {
      case KEY_RIGHT:
        this.vx = this.speed; // Mover a la derecha
        break;
      case KEY_LEFT:
        this.vx = -this.speed; // Mover a la izquierda
        break;
      case KEY_SPACE:
        this.fire(); // Dispara al presionar "Space"
        break;
    }
  }

  onKeyUp(code) {
    if (code === KEY_RIGHT || code === KEY_LEFT) {
      this.vx = 0; // Detiene el movimiento horizontal
    }
  }

  fire() {
    // Crea una nueva bala y la añade al array de balas
    const bullet = new Bullet(this.ctx, this.x + this.w / 2, this.y);
    this.bullets.push(bullet);
  }

  checkCollision(element) {
    const colX = this.x < element.x + element.w && this.x + this.w > element.x;
    const colY = this.y < element.y + element.h && this.y + this.h > element.y;
    return colX && colY;
  }

  checkCollisions(enemies) {
    const enemyHit = this.bullets.some((bullet) => {
      const bulletHitEnemy = bullet.checkCollisions(enemies);
      if (bulletHitEnemy) {
        bullet.hit();
      }

      return bulletHitEnemy;
    }, 0);

    if (enemyHit) this.pointLive.addScore();
  }

  hit(totalHits) {
    this.pointLive.reduceHealth(totalHits);
  }

  addScore(points) {
    this.pointLive.addScore(points); // Añade puntos al derrotar a un enemigo
  }

  isDead() {
    return this.pointLive.health <= 0; // Verifica si el jugador aún tiene vidas
  }

  clearBullets() {
    this.bullets = this.bullets.filter((bullet) => bullet.isActive);
  }

  setListeners() {
    document.addEventListener('keydown', (event) => {
      if (
        event.code === KEY_SPACE ||
        event.code === KEY_LEFT ||
        event.code === KEY_RIGHT
      ) {
        event.preventDefault(); // Prevenir el comportamiento por defecto de la tecla Space
        if (event.code === KEY_SPACE) {
          this.fire();
        }
        this.onKeyDown(event.code); // Maneja la tecla presionada en el jugador
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.code === KEY_LEFT || event.code === KEY_RIGHT)
        this.onKeyUp(event.code); // Maneja la tecla liberada en el jugador
    });
  }
}
