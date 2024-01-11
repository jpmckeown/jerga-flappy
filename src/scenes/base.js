import Phaser from "phaser";

class Base extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
  }
  create() {
    this.makeBackground();
  }
  makeBackground() {
    this.bg = this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }
}
export default Base;