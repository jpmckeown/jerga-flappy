import Phaser from "phaser";
import Play from "./scenes/play";
import Menu from "./scenes/menu";
import Score from "./scenes/score";
import PreLoad from "./scenes/preload";

const WIDTH = 800;
const HEIGHT = 600;
const PLAYER_INIT_X = 50;
const PLAYER_INIT_Y = HEIGHT / 3;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  playerInitX: PLAYER_INIT_X,
  playerInitY: PLAYER_INIT_Y
};

const SCENES = [PreLoad, Menu, Play, Score];
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => SCENES.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    }
  },
  scene: initScenes()
  // scene: [PreLoad, new Menu(SHARED_CONFIG), new Play(SHARED_CONFIG)]
};

new Phaser.Game(config);