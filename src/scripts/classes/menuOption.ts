import {CONFIG} from "../Config";
export class MenuOption {

    private optionText: Phaser.Text;
    private routeTo: Function;

    constructor(game: Phaser.Game, text: string, optionCount: number, callback: Function) {
        this.optionText = game.add.text(game.world.centerX, (optionCount * 80) + 300, text, CONFIG.TEXT_OPTIONS);
        this.optionText.anchor.set(CONFIG.ANCHOR);
        this.optionText.inputEnabled = true;
        this.routeTo = callback;
    }
    public makeActive() {

        this.optionText.fill = CONFIG.ACTIVE_TEXT;
        this.optionText.stroke = "rgba(245, 2, 2, 0.7)";
    }
    public makeInactive() {

        this.optionText.fill = CONFIG.INACTIVE_TEXT;
        this.optionText.stroke = "rgba(0,0,0,0)";
    }
    public route() {

        this.routeTo();
    }
}
