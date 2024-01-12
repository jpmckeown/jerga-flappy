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
    this.makeMenu(this.menu);
    // this.scene.start('Play');
  }
}
export default Menu;