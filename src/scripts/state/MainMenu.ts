import {MenuOption} from "../classes/menuOption";
interface TextOptionsObject {
    font?: string;
    fill?: string;
    align?: string;
    stroke?: string;
    strokeThickness?: number;
}
export class MainMenu extends Phaser.State {

    private gameTitle: Phaser.BitmapText;
    private textOptions: TextOptionsObject;
    private optionsArray: Array<MenuOption>;
    private optionCount: number = 0;

    init() {
        this.optionsArray = [];
        this.gameTitle = this.game.add.bitmapText(this.world.centerX, 100, "carrier_command", "Push Master", 45);
        this.gameTitle.anchor.set(0.5);
        this.game.add.tween(this.gameTitle).from({ y: -100, angle: 45 }, 2000, Phaser.Easing.Bounce.Out, true, 0, 0);
        this.game.add.graphics(this.world.centerX - 300, 140).lineStyle(10, 0xFFFFFF).lineTo(215, 0);
        this.game.add.graphics(this.world.centerX - 40, 140).lineStyle(10, 0xFFFFFF).lineTo(340, 0);

        this.textOptions = {
            font: "30pt carrier_command",
            fill: "white", align: "center",
            stroke: "rgba(0,0,0,0)", strokeThickness: 4
        };

    }
     create() {
        this.addOption("Start", () => {
            this.game.state.start("main");
        });
        this.optionsArray[0].makeActive();
        this.addOption("Options", function() {
            this.game.state.start("options");
        });
        this.addOption("Credits",()=>{
            this.game.state.start("credits");
        });
    }
    private addOption(text: string, callback: Function) {
        this.optionsArray.push(new MenuOption(this.game, text.toUpperCase(), this.optionCount, this.textOptions, callback));
        this.optionCount++;

    }
}
