export class Menu extends Phaser.State {
    private gameTitle: Phaser.BitmapText;
    private startButton: Phaser.Button;
    create() {
        /* Title */
        // Center text
        this.gameTitle = this.game.add.bitmapText(this.world.centerX, 100, "carrier_command", "Push Master", 36);
        this.gameTitle.anchor.set(0.5);
        this.game.add.tween(this.gameTitle).from({ y: -200, angle: 45 }, 2000, Phaser.Easing.Bounce.Out, true, 0, 0);

        // ***********
        // Launch on start
        // this.game.state.start("main");
    }

}
class Option {
  constructor(public option:string){
    this.game.add.bitmapText(this.world.centerX - 100, 100, "carrier_command", "Push Master", 36);
  }
}
