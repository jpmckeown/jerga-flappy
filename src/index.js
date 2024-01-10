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

// to avoid gap above upper pipe, gapTopMax cannot exceed pipeGraphicHeight
const pipeGraphicHeight = 480;
const pipeHeightMinimum = 10;

// these can vary with difficulty
let xFirstPipeRange = [400, 600];
let pipeX = Phaser.Math.Between(...xFirstPipeRange);
let xSpacingRange = [400, 600];
let yGapRange = [150, 250];

// let xSpacing = null;
// let gapTop = null;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
};

function create() {
  //this.add.image(config.width / 2, config.height / 2, 'sky');
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  pipes = this.physics.add.group();

  for (let i = 0; i < PIPE_NUM; i++) {
    let upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 1);
    let lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 0);
    placePipe(upperPipe, lowerPipe);
  }
  pipes.setVelocityX(-100);

  bird = this.physics.add.sprite(initBirdX, initBirdY, 'bird');
  bird.body.gravity.y = gravity;
  bird.body.velocity.x = 0;
  this.input.on('pointerdown', flap);
  let spacebar = this.input.keyboard.addKey('SPACE');
  spacebar.on('down', flap);
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

function placePipe(uPipe, lPipe) {
  let yGap = Phaser.Math.Between(...yGapRange);
  let gapTopMax = config.height - yGap - pipeHeightMinimum;
  let gapTopRange = [pipeHeightMinimum, gapTopMax];
  let gapTop = Phaser.Math.Between(...gapTopRange);
  let xSpacing = Phaser.Math.Between(...xSpacingRange);
  let rightX = getRightMostPipe();
  console.log(xSpacing, gapTop, pipeX, rightX);
  uPipe.x = pipeX;
  uPipe.y = gapTop;
  lPipe.x = pipeX;
  lPipe.y = gapTop + yGap;
  pipeX += xSpacing;
}

function recyclePipes() {
  let tempPipes = [];
  pipes.getChildren().forEach(pipe => {
    if (pipe.getBounds().right < 0) {
      tempPipes.push(pipe);
      if (tempPipes.length === 2) {
        placePipe(...tempPipes);
      }
    }
  });
}

function restartBirdPosition() {
  bird.body.x = initBirdX;
  bird.body.y = initBirdY;
  bird.body.velocity.x = 0;
  bird.body.velocity.y = 0;
}

function getRightMostPipe() {
  let rightmostX = 0;
  pipes.getChildren().forEach(pipe => {
    rightmostX = Math.max(pipe.x, rightmostX);
  });
  return rightmostX;
}

function flap() {
  bird.body.velocity.y -= flapSpeed;
  console.log("flapping");
}

new Phaser.Game(config);