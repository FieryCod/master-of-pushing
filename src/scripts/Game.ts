/// <reference path="../../node_modules/phaser-ce/typescript/pixi.d.ts" />
/// <reference path="../../node_modules/phaser-ce/typescript/p2.d.ts" />
/// <reference path="../../node_modules/phaser-ce/typescript/phaser.d.ts" />
import {Boot} from "./state/Boot";
import {Main} from "./state/Main";
import {Preload} from "./state/Preload";

export class Game extends Phaser.Game {
    constructor() {

        super("100%", "100%", Phaser.AUTO, "", null, false, true, null);
        this.state.add("boot", Boot);
        this.state.add("preload", Preload);
        this.state.add("main", Main);
        this.state.start("boot");

    }
  
}
