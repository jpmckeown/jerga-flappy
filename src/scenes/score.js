import Base from "./base";

class Score extends Base {
  constructor(config) {
    super('Score', config);
  }

  create() {
    super.create();
    const bestScore = localStorage.getItem('bestScore');
    this.add.text(...this.bgCentre, `Best score: ${bestScore || 0}`, this.fontOptions);
  }
}
// .setOrigin(0, 0.5)
export default Score;