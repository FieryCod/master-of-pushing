import {Menu} from "../classes/Menu";
import {Jukebox} from "../classes/Jukebox";

export class Options extends Phaser.State {

    private menu: Menu;
    private musicStatus: boolean;

    init() {
        this.menu = new Menu(this.game);
        this.menu.addOption("Back", () => { this.game.state.start("menu"); }, true);
    }
    create() {
        this.menu.addOption("MUSIC: ON", () => {

            this.menu.optionsArray[this.menu.currOption].changeText("MUSIC: " + (this.musicStatus ? "ON" : "OFF"));

            if (this.musicStatus)
                Jukebox.startMusic();
            else
                Jukebox.stopMusic();

            this.musicStatus = !this.musicStatus;
        });
    }
    update() {
        this.menu.update();
    }
}
