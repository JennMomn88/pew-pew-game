class Level {
  constructor() {
    this.levels = [
      {
        level: 1,
        meteoriteSpawnInterval: 400,
        enemySpawnRate: 200,
        enemyFireRate: 2000,
      },
      {
        level: 2,
        meteoriteSpawnInterval: 380,
        enemySpawnRate: 190,
        enemyFireRate: 1800,
      },
      {
        level: 3,
        meteoriteSpawnInterval: 360,
        enemySpawnRate: 180,
        enemyFireRate: 1700,
      },
      {
        level: 4,
        meteoriteSpawnInterval: 320,
        enemySpawnRate: 170,
        enemyFireRate: 1600,
      },
      {
        level: 5,
        meteoriteSpawnInterval: 300,
        enemySpawnRate: 160,
        enemyFireRate: 1500,
      },
      {
        level: 6,
        meteoriteSpawnInterval: 280,
        enemySpawnRate: 150,
        enemyFireRate: 1400,
      },
      {
        level: 7,
        meteoriteSpawnInterval: 260,
        enemySpawnRate: 140,
        enemyFireRate: 1300,
      },
      {
        level: 8,
        meteoriteSpawnInterval: 240,
        enemySpawnRate: 130,
        enemyFireRate: 1200,
      },
      {
        level: 9,
        meteoriteSpawnInterval: 220,
        enemySpawnRate: 120,
        enemyFireRate: 1100,
      },
      {
        level: 10,
        meteoriteSpawnInterval: 200,
        enemySpawnRate: 110,
        enemyFireRate: 1000,
      },
    ];
  }

  getLevel(level) {
    return this.levels[level - 1];
  }
}
