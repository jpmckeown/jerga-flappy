import Phaser from "phaser";

class Base extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.bgCentre = [config.width / 2, config.height / 2];
  }
  create() {
    this.makeBackground();
  }

  makeBackground() {
    this.bg = this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }

  makeMenu(menu) {
    const lineHeight = 70;
    let yPrev = 0;
    menu.forEach(element => {
      let position = [...this.bgCentre];
      position[1] += yPrev;
      this.add.text(...position, element.text, { fontSize: '48px', fill: '#000000' })
        .setOrigin(0.5, 1);
      yPrev += lineHeight;
    });
  }
}
export default Base;