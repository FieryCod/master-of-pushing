import {Menu} from "./Menu";
interface Devs {
    position: string;
    name: string;
}
export class Credits extends Phaser.State {
    private menu: Menu;
    private text: Phaser.Text;
    private devs: Array<Devs>;
    init() {
        this.menu = new Menu(this.game);
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
    }
    create() {
        for (let i in this.devs) {
            this.addDev(this.devs[i].position, this.devs[i].name, +i);
        }

    }
    private addDev(position: string, devName: string, curr: number) {

        this.game.add.text(this.world.centerX - 350, 250 + (150 * curr), `Position: ${position}`, this.menu.textOptions);

        this.game.add.text(this.world.centerX - 350, 300 + (150 * curr), `Name: ${devName}`, this.menu.textOptions);
    }
}
