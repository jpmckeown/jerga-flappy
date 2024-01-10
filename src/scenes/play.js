import Phaser from 'phaser';
class Play extends Phaser.Scene {
  constructor() {
    super('Play');
    this.bird = null;
    this.initBirdX = 50;
  }
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
  }
  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.bird = this.physics.add.sprite(50, 200, 'bird');
  }
}
export default Play;