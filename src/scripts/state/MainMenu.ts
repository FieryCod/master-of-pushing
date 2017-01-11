import {MenuOption} from "../classes/menuOption";
import {Menu} from "./Menu";

export class MainMenu extends Phaser.State {

    private optionsArray: Array<MenuOption>;
    private optionCount: number = 0;
    private menu: Menu;

    init() {
        this.optionsArray = [];
        this.menu = new Menu(this.game);
    }
    create() {
        this.addOption("Start", () => {
            this.game.state.start("main");
        });
        this.optionsArray[0].makeActive();
        this.addOption("Options", function() {
            this.game.state.start("options");
        });
        this.addOption("Credits", () => {
            this.game.state.start("credits");
        });
    }
    private addOption(text: string, callback: Function) {
        this.optionsArray.push(new MenuOption(this.game, text.toUpperCase(), this.optionCount, this.menu.textOptions, callback));
        ++this.optionCount;

    }
}
