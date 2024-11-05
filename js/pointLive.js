class PointLive {
  constructor(ctx) {
    this.ctx = ctx; // Contexto del canvas
    this.health = 3; // Vidas iniciales del jugador
    this.score = 0; // Puntuación inicial
    this.currentLevel = 1; // Nivel actual del jugador
  }

  // Dibuja las vidas restantes en el canvas
  drawHealth() {
    const heart = '❤️';
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'red';
    for (let i = 0; i < this.health; i++) {
      this.ctx.fillText(heart, 10 + i * 25, 30);
    }
  }

  // Dibuja la puntuación y el nivel actual en el canvas
  drawScoreAndLevel() {
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`Puntos: ${this.score}`, 680, 30);
    this.ctx.fillText(`Nivel: ${this.currentLevel}`, 350, 30);
  }

  // Método para reducir la vida del jugador
  reduceHealth(totalHits) {
    if (this.health > 0) {
      this.health -= totalHits;
    }
  }

  // Método para aumentar la puntuación al derrotar a un enemigo
  addScore(points = 10) {
    this.score += points;
    if (this.score > this.currentLevel * 30 + Math.pow(2, this.currentLevel))
      ++this.currentLevel;
  }

  // Método para dibujar las vidas, puntuación y nivel en el canvas
  draw() {
    this.drawHealth();
    this.drawScoreAndLevel();
  }
}
