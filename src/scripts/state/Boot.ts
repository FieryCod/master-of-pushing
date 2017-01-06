  export class Boot extends Phaser.State {
    preload() {

    }
    create() {
      this.game.stage.backgroundColor = 0x000000;

      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;

      this.game.state.start("preload");
    }
  }
