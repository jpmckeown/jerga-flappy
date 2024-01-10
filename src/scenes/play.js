import Phaser from 'phaser';
const PIPES_TO_RENDER = 3;

class Play extends Phaser.Scene {
  constructor(config) {
    super('Play');
    this.config = config;
    this.bird = null;
    this.flapSpeed = 50;
    this.pipes = null;
    this.xSpacingRange = [400, 600];
    this.yGapRange = [150, 250];
    this.pipeHeightMinimum = 10;
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0); // background
    this.makePipes();
    this.makeBird();
    this.makeColliders();
    this.handleInputs();
  }

  update() {
    this.checkBirdCrash();
    this.recyclePipes();
  }

  makePipes() {
    this.pipes = this.physics.add.group();
    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      let upperPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 1);
      let lowerPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 0);
      this.placePipe(upperPipe, lowerPipe);
    }
    this.pipes.setVelocityX(-100);
  }

  makeBird() {
    this.bird = this.physics.add.sprite(this.config.playerInitX, this.config.playerInitY, 'bird');
    this.bird.body.gravity.y = 30;
    this.bird.body.velocity.x = 0;
  }

  makeColliders() {
    this.physics.add.collider(this.bird, this.pipes);
  }

  handleInputs() {
    this.input.on('pointerdown', this.flap, this);
    let spacebar = this.input.keyboard.addKey('SPACE');
    spacebar.on('down', this.flap, this);
  }

  placePipe(uPipe, lPipe) {
    let yGap = Phaser.Math.Between(...this.yGapRange);
    let gapTopMax = this.config.height - yGap - this.pipeHeightMinimum;
    let gapTopRange = [this.pipeHeightMinimum, gapTopMax];
    let gapTop = Phaser.Math.Between(...gapTopRange);
    let xSpacing = Phaser.Math.Between(...this.xSpacingRange);
    let xPrevious = this.getRightMostPipe();
    let pipeX = xPrevious + xSpacing;

    uPipe.x = pipeX;
    uPipe.y = gapTop;
    lPipe.x = pipeX;
    lPipe.y = gapTop + yGap;
  }

  recyclePipes() {
    let tempPipes = [];
    this.pipes.getChildren().forEach(pipe => {
      if (pipe.getBounds().right < 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
        }
      }
    });
  }

  getRightMostPipe() {
    let rightmostX = 0;
    this.pipes.getChildren().forEach(pipe => {
      rightmostX = Math.max(pipe.x, rightmostX);
    });
    return rightmostX;
  }

  checkBirdCrash() {
    if (this.bird.body.position.x > this.config.width - this.bird.body.width) {
      this.bird.body.velocity.x *= -1;
    }
    else if (this.bird.body.position.x < 0) {
      this.bird.body.velocity.x *= -1;
    }
    // allow bird to go above top of screen
    if (this.bird.body.position.y > this.config.height - this.bird.height) {
      console.log("You crashed into the ground.");
      this.restartBirdPosition();
    }
    else if (this.bird.body.position.y < -240) {
      console.log("You flew too high near the sun.");
      this.restartBirdPosition();
    }
  }

  restartBirdPosition() {
    this.bird.x = this.config.playerInitX;
    this.bird.y = this.config.playerInitY;
    this.bird.body.velocity.y = 0;
  }

  flap() {
    this.bird.body.velocity.y -= this.flapSpeed;
    console.log("flapping");
  }
}
export default Play;