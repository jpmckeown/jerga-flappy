import Phaser from "phaser";
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 10 }
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let bird = null;
const SPEED = 200;
const initBirdPos = { x: config.width / 10, y: config.height / 4 };

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'aasets/pipe.png');
}

function create() {
  //this.add.image(config.width / 2, config.height / 2, 'sky');
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  this.add.image(200, 600, 'pipe');

  bird = this.physics.add.sprite(initBirdPos.x, initBirdPos.y, 'bird');
  // bird.body.gravity.y = 50;
  bird.body.velocity.x = SPEED;
  console.log(bird);
  this.input.on('pointerdown', flap);
  let spacebar = this.input.keyboard.addKey('SPACE');
  spacebar.on('down', flap);
  //this.input.keyboard.on('keydown_SPACE', flap);
}

function update(time, delta) {
  if (bird.body.position.x > config.width - bird.body.width) {
    bird.body.velocity.x *= -1;
  }
  else if (bird.body.position.x < 0) {
    bird.body.velocity.x *= -1;
  }
  // allow bird to go above top of screen
  if (bird.body.position.y > config.height) {
    console.log("You crashed into the ground.");
    restartBirdPosition();
  }
  else if (bird.body.position.y < -240) {
    console.log("You flew too high near the sun.");
    restartBirdPosition();
  }
}

function restartBirdPosition() {
  bird.x = initBirdPos.x;
  bird.y = initBirdPos.y;
  bird.body.velocity.x = SPEED;
  bird.body.velocity.y = 0;
}
function flap() {
  bird.body.velocity.y = -SPEED / 2;
  console.log("flapping");
}
new Phaser.Game(config);