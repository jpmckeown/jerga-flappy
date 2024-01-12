import Phaser from "phaser";

class Base extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.fontSize = 48;
    this.lineHeight = 70;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fill: '#000' };
    this.bgCentre = [config.width / 2, config.height / 2];
  }

  create() {
    this.makeBackground();
  }

  makeBackground() {
    this.bg = this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }

  makeMenu(menu, setupMenuEvents) {
    let yPrev = 0;
    menu.forEach(element => {
      let position = [...this.bgCentre];
      position[1] += yPrev;
      //this.add.text(...position, element.text, { fontSize: `px`, fill: '#000000' })
      element.textGO = this.add.text(...position, element.text, this.fontOptions)
        .setOrigin(0.5, 1);
      yPrev += this.lineHeight;
      setupMenuEvents(element);
    });
  }
}

export default Base;