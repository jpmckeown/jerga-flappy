import Phaser from 'phaser';
const PIPE_NUM = 3;

class Play extends Phaser.Scene {
  constructor(config) {
    super('Play');
    this.config = config;
    this.bird = null;
    this.pipes = null;
    this.xSpacingRange = [400, 600];
    this.yGapRange = [150, 250];
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    this.pipes = this.physics.add.group();
    for (let i = 0; i < PIPE_NUM; i++) {
      let upperPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 1);
      let lowerPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 0);
      this.placePipe(upperPipe, lowerPipe);
    }
    this.pipes.setVelocityX(-100);

    this.bird = this.physics.add.sprite(this.config.playerInitX, this.config.playerInitY, 'bird');
    bird.body.gravity.y = gravity;
    bird.body.velocity.x = 0;
    // this.input.on('pointerdown', flap);
    // let spacebar = this.input.keyboard.addKey('SPACE');
    // spacebar.on('down', flap);
  }

  placePipe(uPipe, lPipe) {
    let yGap = Phaser.Math.Between(...this.yGapRange);
    let gapTopMax = this.config.height - yGap - this.pipeHeightMinimum;
    let gapTopRange = [this.pipeHeightMinimum, gapTopMax];
    let gapTop = Phaser.Math.Between(...gapTopRange);
    let xSpacing = Phaser.Math.Between(...this.xSpacingRange);
    let xPrevious = getRightMostPipe();
    let pipeX = xPrevious + xSpacing;
    console.log(pipeX, xSpacing); //, gapTop, rightX);
    uPipe.x = pipeX;
    uPipe.y = gapTop;
    lPipe.x = pipeX;
    lPipe.y = gapTop + yGap;
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

restartBirdPosition() {
  this.bird.body.x = initBirdX;
  bird.body.y = initBirdY;
  bird.body.velocity.x = 0;
  bird.body.velocity.y = 0;
}

getRightMostPipe() {
  let rightmostX = 0;
  pipes.getChildren().forEach(pipe => {
    rightmostX = Math.max(pipe.x, rightmostX);
  });
  return rightmostX;
}

checkBirdCrash() {
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

flap() {
  bird.body.velocity.y -= flapSpeed;
  console.log("flapping");
}
}
export default Play;