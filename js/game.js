class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
    this.pointLive = new PointLive(ctx);

    this.player = new Player(ctx, this.pointLive); // Ajusta la posición inicial del jugador
    this.levels = new Level();
    this.meteoriteSpawnRate = 0;
    this.enemySpawnRate = 0;
    this.enemyFireRate = 0;
    this.background = new Background(ctx); // Crear una instancia de Background
    this.enemies = []; // array de enemigos
    this.bullets = [];
    this.meteorites = [];

    this.interval = null;
    this.fps = 60; // Fotogramas por segundo
    this.started = false;
    this.currentLevel = 0;
    this.startAudio = new Audio('/assets/audio/game-music-loop-3-144252.mp3'); // Ruta al sonido de inicio
    this.startAudio.volume = 0.1;
    this.gameOverAudio = new Audio('/assets/audio/game-over-arcade-6435.mp3'); // Ruta al sonido de fin de juego
    this.gameOverAudio.volume = 0.1;

    this.isGameOver = false;
    this.drawWelcome();
  }

  start() {
    // Pausa el audio de game over si estaba sonando
    this.gameOverAudio.pause();
    this.gameOverAudio.currentTime = 0;

    // Reproduce el audio de inicio
    if (this.startAudio.paused) {
      this.startAudio.play();
    }

    this.started = true;
    let enemyTick = 0;
    let meteoriteTick = 0;

    this.interval = setInterval(() => {
      this.clear(); // Limpia el canvas

      this.move(); // Mueve el fondo y el jugador
      this.draw(); // Dibuja el fondo y el jugador

      this.checkCollisions(); // Verifica colisiones

      enemyTick++;
      meteoriteTick++;

      if (this.currentLevel < this.pointLive.currentLevel) this.setLevel();

      if (meteoriteTick >= this.meteoriteSpawnRate) {
        this.addMeteorite();
        meteoriteTick = 0;
      }

      // Agrega enemigos a intervalos
      if (enemyTick >= this.enemySpawnRate) {
        this.addEnemy();
        enemyTick = 0;
      }

      if (this.player.isDead() || this.currentLevel > 10) this.gameOver();
    }, 1000 / this.fps); // 60 FPS
  }

  addMeteorite() {
    const newMeteorite = new Meteorite(
      this.ctx,
      this.canvasWidth,
      this.canvasHeight
    );
    this.meteorites.push(newMeteorite);
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => enemy.checkCollisions(this.player));
    this.meteorites.forEach((meteorite) =>
      meteorite.checkCollision(this.player)
    );
    this.player.checkCollisions(this.enemies);
  }

  gameOver() {
    clearInterval(this.interval); // Detener el juego
    this.clear();
    this.drawGameOver();
    this.isGameOver = true;
    // Pausa el audio de inicio y reinicia su tiempo a cero
    this.startAudio.pause();
    this.startAudio.currentTime = 0;

    // Reproduce el audio de game over
    this.gameOverAudio.play();
  }

  addEnemy() {
    const enemyX = Math.random() * (this.canvasWidth - 50); // Posición aleatoria en el eje X
    const enemyY = Math.random() * (this.canvasHeight / 2); // Posición aleatoria en la parte superior
    const newEnemy = new Enemy(this.ctx, enemyX, enemyY, this.enemyFireRate); // Crea un nuevo enemigo
    this.enemies.push(newEnemy); // Agrega el enemigo al array
  }

  pause() {
    if (this.started) {
      this.started = false;
      clearInterval(this.interval); // Detiene el intervalo
      this.startAudio.pause();
    }
  }

  draw() {
    this.background.draw(); // Dibuja el fondo
    this.enemies.forEach((enemy) => enemy.draw());
    this.player.draw(); // Dibuja al jugador
    this.meteorites.forEach((meteorite) => meteorite.draw()); // Dibuja los meteoritos
    this.player.bullets.forEach((bullet) => bullet.draw());
  }

  move() {
    this.background.move(); // Mueve el fondo
    this.enemies.forEach((enemy) => enemy.move()); // Mueve enemigos
    this.player.move(); // Mueve al jugador
    this.meteorites.forEach((meteorite) => meteorite.move()); // Mueve meteoritos
    this.player.bullets.forEach((bullet) => bullet.move());
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // Limpia el canvas
    this.meteorites = this.meteorites.filter((meteorite) => meteorite.isActive);
    this.enemies = this.enemies.filter((enemy) => enemy.isActive);
  }

  setLevel() {
    ++this.currentLevel;

    if (this.currentLevel > 10) return;
    const level = this.levels.getLevel(this.pointLive.currentLevel);

    this.meteoriteSpawnRate = level.meteoriteSpawnInterval;
    this.enemySpawnRate = level.enemySpawnRate;
    this.enemyFireRate = level.enemyFireRate;
  }

  drawGameOver() {
    this.ctx.font = 'italic bold 72px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over', this.canvasWidth / 2, this.canvasHeight / 2);

    this.ctx.font = 'bold 36px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      'Presiona reiniciar para intentarlo de nuevo',
      this.canvasWidth / 2,
      this.canvasHeight - 10
    );
  }

  drawWelcome() {
    this.ctx.font = 'italic bold 72px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      'The Pew Pew Game',
      this.canvasWidth / 2,
      this.canvasHeight / 2
    );

    this.ctx.font = 'bold 36px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      'Presiona empezar para comenzar',
      this.canvasWidth / 2,
      this.canvasHeight - 10
    );
  }
}
