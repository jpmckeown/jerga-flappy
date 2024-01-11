import Phaser from "phaser";

class Menu extends Phaser.Scene {
  constructor(config) {
    super('Menu');
    this.config = config;
  }
  create() {
    this.bg = this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }
}
export default Menu;