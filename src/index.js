import Phaser from "phaser";
const config = {
  type: Phaser.AUTO,
  width: 3600,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      // gravity: { y: 10 }
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

// background has 40-pixel wide banding
let bird = null;
let pipes = null;
const PIPE_NUM = 4;

const gravity = 30;
const flapSpeed = 50;
const xSpeed = 0;
const initBirdX = 50;
const initBirdY = 50; //config.height / 10;

// these will both vary with difficulty
const yGapMin = 150;
const yGapMax = 250;
let yGap = Phaser.Math.Between(yGapMin, yGapMax);

const pipeGraphicHeight = 480;
const pipeHeightMinimum = 10;
const gapTopMin = pipeHeightMinimum;
const gapTopMax = config.height - yGap - pipeHeightMinimum;
// to avoid visual error of gap at screentop, gapTopMax cannot exceed pipeGraphicHeight

let pipeX = 500;  //Phaser.Math.Between(100, 700);
let pipeSpacingX = 800;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
};

function create() {
  //this.add.image(config.width / 2, config.height / 2, 'sky');
  this.add.image(0, 0, 'sky').setOrigin(0, 0);

  for (let i = 0; i < PIPE_NUM; i++) {
    let upperPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 1);
    let lowerPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 0);
    placePipe(upperPipe, lowerPipe, pipeX);

    // let gapTop = Phaser.Math.Between(gapTopMin, gapTopMax);
    // pipes[0] = this.physics.add.sprite(pipeX, gapTop, 'pipe').setOrigin(0, 1);
    // pipes[1] = this.physics.add.sprite(pipeX, gapTop + yGap, 'pipe').setOrigin(0, 0);
    // pipes[0].body.velocity.x = -100;
    // pipes[1].body.velocity.x = -100;
    // console.log(pipes);
    // pipeX += pipeSpacingX;
  }

  bird = this.physics.add.sprite(initBirdX, initBirdY, 'bird');  //(initBirdPos.x, initBirdPos.y, 'bird');
  bird.body.gravity.y = gravity;
  bird.body.velocity.x = 0;
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
  if (bird.body.position.y > config.height - bird.height) {
    console.log("You crashed into the ground.");
    restartBirdPosition();
  }
  else if (bird.body.position.y < -240) {
    console.log("You flew too high near the sun.");
    restartBirdPosition();
  }
}

function redoPipes() {
  yGap = Phaser.Math.Between(yGapMin, yGapMax);
  gapTop = Phaser.Math.Between(gapTopMin, gapTopMax);
  pipeX = Phaser.Math.Between(100, 700);
}

function placePipe(uPipe, lPipe) {
  let gapTop = Phaser.Math.Between(gapTopMin, gapTopMax);
  uPipe.x = pipeX;
  uPipe.y = gapTop;
  lPipe.x = pipeX;
  lPipe.y = gapTop + yGap;
  uPipe.body.velocity.x = -100;
  lPipe.body.velocity.x = -100;
  pipeX += pipeSpacingX;
}

function restartBirdPosition() {
  bird.body.x = initBirdX;
  bird.body.y = initBirdY;
  bird.body.velocity.x = 0;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y -= flapSpeed;
  console.log("flapping");
}
new Phaser.Game(config);