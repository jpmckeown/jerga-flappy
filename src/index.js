import Phaser from "phaser";
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 50 }
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

let bird = null;
function create() {
  //this.add.image(config.width / 2, config.height / 2, 'sky');
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(config.width / 10, config.height / 10, 'bird').setOrigin(0);
  // bird.body.gravity.y = 50;
  bird.body.velocity.x = 50;
}

let totalDelta = 0;
function update(time, delta) {
  if (totalDelta >= 1000) {
    console.log(bird.body.velocity.y);
    totalDelta = 0;
  }
  totalDelta += delta;
}
new Phaser.Game(config);