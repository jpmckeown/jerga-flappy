import Base from "./base";

class Pause extends Base {
  constructor(config) {
    super('Pause', config);

    this.menu = [
      { scene: 'Play', text: 'Continue' },
      { scene: 'Menu', text: 'Menu' },
    ];
  }

  create() {
    super.create();
    this.makeMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();
    textGO.on('pointerover', () => {
      textGO.setStyle({ fill: '#f00' });
    });
    textGO.on('pointerout', () => {
      textGO.setStyle({ fill: '#0f0' });
    });
    textGO.on('pointerup', () => {
      if (menuItem.scene && menuItem.text === 'Continue') {
        this.scene.stop();
        debugger;
        this.scene.resume(menuItem.scene);
      }
      else {
        this.scene.stop('Play');
        // .start includes shutdown of current scene i.e. Pause
        this.scene.start(menuItem.scene); // i.e. Menu
      }
    });
  }
}

export default Pause;