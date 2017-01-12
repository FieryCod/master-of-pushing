import {MenuOption} from "../classes/menuOption";
import {CONFIG} from "../Config";
export class Menu {

    public optionsArray: Array<MenuOption>;
    private gameTitle: Phaser.BitmapText;
    private optionCount: number;
    private currOption: number;
    private CursorKeys: Phaser.CursorKeys;
    private EnterKey: Phaser.Key;

    constructor(private game: Phaser.Game) {

        this.currOption = 0;
        this.optionCount = 0;

        this.optionsArray = [];
        this.gameTitle = this.game.add.bitmapText(this.game.world.centerX, 100, CONFIG.TITLE_FONT, CONFIG.TITLE, CONFIG.TITLE_FONT_SIZE);
        this.gameTitle.anchor.set(0.5);
        this.game.add.tween(this.gameTitle).from({ y: -100, angle: 45 }, 2000, Phaser.Easing.Bounce.Out, true, 0, 0);
        this.game.add.graphics(this.game.world.centerX - 300, 140).lineStyle(10, CONFIG.BASIC_TEXT_COLOR).lineTo(215, 0);
        this.game.add.graphics(this.game.world.centerX - 40, 140).lineStyle(10, CONFIG.BASIC_TEXT_COLOR).lineTo(340, 0);
        this.CursorKeys = this.game.input.keyboard.createCursorKeys();
        this.EnterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }
    public addOption(text: string, callback: Function) {

        this.optionsArray.push(new MenuOption(this.game, text.toUpperCase(), this.optionCount, callback));
        ++this.optionCount;
    }
    private updateCurrOption(optionNumber: number) {

        this.currOption += optionNumber;

        if ((this.currOption < 0) || (this.currOption >= this.optionsArray.length))
            this.currOption = 0;
    }
    public update() {
        if (this.EnterKey.justDown)
            this.optionsArray[this.currOption].route();

        if (this.CursorKeys.up.justDown)
            this.updateCurrOption(-1);

        if (this.CursorKeys.down.justDown)
            this.updateCurrOption(1);

        for (let i = 0; i < this.optionsArray.length; ++i) {

            if (i === this.currOption)
                this.optionsArray[i].makeActive();
            else
                this.optionsArray[i].makeInactive();
        }


    }

}
