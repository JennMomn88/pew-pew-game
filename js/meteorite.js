class Meteorite {
  constructor(ctx, canvasWidth, canvasHeight) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth; // Ancho del canvas
    this.canvasHeight = canvasHeight; // Alto del canvas
    this.w = 50; // Ancho del meteorito
    this.h = 50; // Altura del meteorito

    // Inicializa la posición y dirección del meteorito
    this.PositionAndDirection();

    this.speed = 3; // Velocidad constante en el eje Y
    this.isActive = true; // Estado del meteorito

    this.image = new Image();
    this.image.src = 'assets/img/meterorito_espiritu3.png';
    this.imageLoaded = false;

    this.image.onload = () => {
      this.imageLoaded = true; // Indica que la imagen ha cargado
    };
  }

  PositionAndDirection() {
    if (Math.random() < 0.5) {
      // Aparece desde la izquierda
      this.x = -this.w; // Fuera del canvas a la izquierda
      this.direction = 1; // Se mueve hacia la derecha
    } else {
      // Aparece desde la derecha
      this.x = this.canvasWidth; // Fuera del canvas a la derecha
      this.direction = -1; // Se mueve hacia la izquierda
    }

    this.y = Math.random() * (this.canvasHeight / 2); // Posición Y aleatoria en la parte superior
  }

  draw() {
    if (this.imageLoaded) {
      this.ctx.save(); // Guardamos el contexto actual

      //   Configura la rotación si el meteorito entra por la izquierda
      if (this.direction > 0) {
        this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        this.ctx.rotate((3 * Math.PI) / 2); // Gira 270 grados
      } else {
        this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
      }

      // Dibuja la imagen centrada en las coordenadas especificadas
      this.ctx.drawImage(this.image, -this.w / 2, -this.h / 2, this.w, this.h);

      this.ctx.restore(); // Restauramos el contexto
    }
  }

  move() {
    if (this.isActive) {
      this.y += this.speed; // Se mueve hacia abajo en el canvas

      // Desactiva el meteorito si sale del canvas por abajo
      if (this.y > this.canvasHeight) {
        this.isActive = false; // Desactiva el meteorito
      }
    }

    // Desaparece si sale del canvas por ambos lados
    if (this.x < -this.w || this.x > this.canvasWidth) {
      this.isActive = false; // Desactiva el meteorito
    }

    // Actualiza la posición en X para moverse
    this.x += this.direction * this.speed; // Modifica la posición en X
  }

  checkCollision(player) {
    const colX = this.x < player.x + player.w && this.x + this.w > player.x;
    const colY = this.y < player.y + player.h && this.y + this.h > player.y;
    if (colX && colY) {
      player.hit(1);
      this.hit();
    }
  }

  hit() {
    this.isActive = false;
  }
}
