import { Menu } from "../classes/Menu";
import { CONFIG } from "../Config";

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
    this.menu.addOption("Back", () => { this.game.state.start("menu"); }, true);

    this.devs = [
      { position: "Programmer", name: "Krzysztof Buchacz" },
      { position: "Programmer", name: "Karol Wójcik" },
      { position: "Programmer", name: "Tomasz Kulpa" }
    ];
  }
  create() {
    for (let i in this.devs) {
      this.addDev(this.devs[i].position, this.devs[i].name, +i);
    }
  }
  update() {
    this.menu.update();
  }
  private addDev(position: string, devName: string, curr: number) {

    let text1 = this.game.add.text(this.world.centerX, 300 + (150 * curr), `Position: ${position}`, CONFIG.SMALLER_TEXT_OPTIONS);
    let text2 = this.game.add.text(this.world.centerX, 350 + (150 * curr), `Name: ${devName}`, CONFIG.SMALLER_TEXT_OPTIONS);

    text1.anchor.set(CONFIG.DEFAULT_ANCHOR);
    text2.anchor.set(CONFIG.DEFAULT_ANCHOR);
  }
}
