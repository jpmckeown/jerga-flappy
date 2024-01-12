import Base from "./base";

class Menu extends Base {
  constructor(config) {
    super('Menu', config);

    this.menu = [
      { scene: 'Play', text: 'Play' },
      { scene: 'Score', text: 'Score' },
      { scene: null, text: 'Exit' },
    ];
  }

  create() {
    super.create();
    this.makeMenu(this.menu, this.setupMenuEvents.bind(this));
    // this.makeMenu(this.menu, this.setupMenuEvents); // context this undefined
    // this.scene.start('Play');
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();
    console.log(this);
    textGO.on('pointerover', () => {
      textGO.setStyle({ fill: '#999' });
    });
    textGO.on('pointerout', () => {
      textGO.setStyle({ fill: '#000' });
    });
    textGO.on('pointerup', () => {
      if (menuItem.scene) {
        this.scene.start(menuItem.scene);
      }
      else if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  }
}

export default Menu;