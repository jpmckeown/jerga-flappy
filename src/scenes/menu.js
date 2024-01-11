import Base from "./base";

class Menu extends Base {
  constructor(config) {
    super('Menu', config);
  }
  create() {
    super.create();
    this.scene.start('Play');
  }
}
export default Menu;