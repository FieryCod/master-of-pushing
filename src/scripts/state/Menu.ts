interface TextOptionsObject {
    font?: string;
    fill?: string;
    align?: string;
    stroke?: string;
    strokeThickness?: number;
}
export class Menu {
    private gameTitle: Phaser.BitmapText;
    public textOptions: TextOptionsObject;

    constructor(game: Phaser.Game) {

        this.textOptions = {
            font: "30pt carrier_command",
            fill: "white", align: "center",
            stroke: "rgba(0,0,0,0)",
            strokeThickness: 4
        };

        this.gameTitle = game.add.bitmapText(game.world.centerX, 100, "carrier_command", "Push Master", 45);
        this.gameTitle.anchor.set(0.5);
        game.add.tween(this.gameTitle).from({ y: -100, angle: 45 }, 2000, Phaser.Easing.Bounce.Out, true, 0, 0);
        game.add.graphics(game.world.centerX - 300, 140).lineStyle(10, 0xFFFFFF).lineTo(215, 0);
        game.add.graphics(game.world.centerX - 40, 140).lineStyle(10, 0xFFFFFF).lineTo(340, 0);


    }


}
