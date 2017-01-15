import {Menu} from "../classes/Menu";
import {Jukebox} from "../classes/Jukebox";

export class MainMenu extends Phaser.State {
    private menu: Menu;

    init() {
        this.menu = new Menu(this.game);
    }
    create() {

        this.menu.addOption("Start", () => {
            this.game.state.start("main");
        });
        this.menu.addOption("Options", () => {
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
