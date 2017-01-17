import { CONFIG } from "../Config";

export class MenuOption {

    private optionText: Phaser.Text;
    private optionFunction: Function;
    public x;
    public y;


    constructor(game: Phaser.Game, text: string, optionCount: number, callback: Function, isBack?: boolean, isPrimal?: boolean) {

        this.x = isBack ? game.world.centerX - 350 : game.world.centerX;
        this.y = isBack ? 200 : (optionCount * 80) + 300;

        this.optionText = game.add.text(this.x, this.y, text, CONFIG.TEXT_OPTIONS);
        this.optionText.anchor.set(CONFIG.DEFAULT_ANCHOR);
        this.optionText.inputEnabled = true;
        this.optionFunction = callback;

        if (isBack || isPrimal)
            this.makeActive();
    }
    public makeActive() {

        this.optionText.fill = CONFIG.ACTIVE_TEXT_COLOR;
        this.optionText.stroke = CONFIG.STROKE_ACTIVE_COLOR;
    }
    public makeInactive() {

        this.optionText.fill = CONFIG.INACTIVE_TEXT_COLOR;
        this.optionText.stroke = CONFIG.STROKE_INACTIVE_COLOR;
    }
    public changeText(text: string) {
        this.optionText.setText(text);
    }
    public callOptionFunction() {

        this.optionFunction();
    }
}
