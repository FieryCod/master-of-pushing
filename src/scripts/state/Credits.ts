import {Menu} from "../classes/Menu";
import {CONFIG} from "../Config";
import {TextOptionsObject} from "../Config";
interface Devs {
    position: string;
    name: string;
}
export class Credits extends Phaser.State {

    private menu: Menu;
    private text: Phaser.Text;
    private devs: Array<Devs>;
    private TextOptions: TextOptionsObject;
    init() {
        this.menu = new Menu(this.game);
        this.menu.addOption("Back", () => {
            this.game.state.start("menu");
        }, true);
        this.TextOptions = (<any>Object).assign({}, CONFIG.TEXT_OPTIONS);
        this.devs = [
            {
                position: "Programmer", name: "Krzysztof Buchacz"
            },
            {
                position: "Programmer", name: "Karol Wójcik"
            },
            {
                position: "Programmer", name: "Tomasz Kulpa"
            }
        ];
        this.TextOptions.font = CONFIG.BASIC_FONT_SIZE - 15 + `pt ${CONFIG.BASIC_FONT}`;
    }
    create() {
        for (let i in this.devs)
            this.addDev(this.devs[i].position, this.devs[i].name, +i);
    }
    update() {
        this.menu.update();
    }
    private addDev(position: string, devName: string, curr: number) {

        this.game.add.text(this.world.centerX - 200, 300 + (150 * curr), `Position: ${position}`, this.TextOptions);
        this.game.add.text(this.world.centerX - 200, 350 + (150 * curr), `Name: ${devName}`, this.TextOptions);

    }
}
