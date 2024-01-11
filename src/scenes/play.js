import Phaser from 'phaser';
const PIPES_TO_RENDER = 3;

class Play extends Phaser.Scene {
  constructor(config) {
    super('Play');
    this.config = config;
    this.bird = null;
    this.boostVelocity = 70;
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
    this.makeBackground();
    this.makePipes();
    this.makeBird();
    this.makeColliders();
    this.makeScore();
    this.handleInputs();
  }

  update() {
    this.checkBirdCrash();
    this.recyclePipes();
  }

  makeBackground() {
    this.bg = this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }

  makePipes() {
    this.pipes = this.physics.add.group();
    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      let upperPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 1);
      let lowerPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 0);
      this.placePipe(upperPipe, lowerPipe);
    }
    this.pipes.setVelocityX(-100);
  }

  makeBird() {
    this.bird = this.physics.add.sprite(this.config.playerInitX, this.config.playerInitY, 'bird');
    this.bird.body.gravity.y = 50;
    this.bird.body.velocity.x = 0;
    // this.bird.setCollideWorldBounds(true);
  }

  makeColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  makeScore() {
    this.score = 0;
    this.scoreText = this.add.text(this.bg.width - 200, 12, `Score: ${this.score}`, { fontSize: '24px', fill: '#000' });
  }

  incrementScore() {
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  handleInputs() {
    this.input.on('pointerdown', this.boost, this);
    let spacebar = this.input.keyboard.addKey('SPACE');
    spacebar.on('down', this.boost, this);
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
          this.incrementScore();
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
    if (this.bird.getBounds().bottom > this.config.height) {
      console.log("You crashed into the ground.");
      this.gameOver();
    }
    else if (this.bird.getBounds().top < 0) {
      console.log("You flew too high near the sun.");
      this.gameOver();
    }
  }

  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xff0000);
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        //this.scene.restart();
      },
      loop: false
    });
  }

  boost() {
    this.bird.body.velocity.y -= this.boostVelocity;
    console.log("flapping");
  }
}
export default Play;