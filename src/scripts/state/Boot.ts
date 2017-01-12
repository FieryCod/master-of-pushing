import {CONFIG} from "../Config";
  export class Boot extends Phaser.State {
    preload() {

    }
    create() {
      this.game.stage.backgroundColor = CONFIG.GAME_BACKGROUND_COLOR;

      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;

      this.game.state.start("preload");
    }
  }
