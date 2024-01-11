import Phaser from "phaser";

class PreLoad extends Phaser.Scene {
  constructor() {
    super('PreLoad');
  }
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('ui_bg', 'assets/UI_blank.png');
    this.load.image('pause', 'assets/pause_button.png');
  }
  create() {
    this.scene.start('Menu');
  }
}
export default PreLoad;