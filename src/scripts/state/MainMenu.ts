import {Menu} from "./Menu";

export class MainMenu extends Phaser.State {
    private menu: Menu;

    init() {
        this.menu = new Menu(this.game);
    }
    create() {
        this.menu.addOption("Start", () => {
            this.game.state.start("main");
        });
        this.menu.optionsArray[0].makeActive();
        this.menu.addOption("Options", function() {
            this.game.state.start("options");
        });
        this.menu.addOption("Credits", () => {
            this.game.state.start("credits");
        });
    }
    update() {
        this.menu.update();
        // this.menu.update(Here I want to send keyboardEvents)
    }

}
