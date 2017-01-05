/// <reference path="../../node_modules/phaser-ce/typescript/pixi.d.ts" />
/// <reference path="../../node_modules/phaser-ce/typescript/p2.d.ts" />
/// <reference path="../../node_modules/phaser-ce/typescript/phaser.d.ts" />
namespace Pushmaster {
    export class Game extends Phaser.Game {
        constructor() {

            super(800, 600, Phaser.AUTO, "", null, false, true, null);
            this.state.add("boot", State.Boot);
            this.state.add("preload", State.Preload);
            this.state.add("main", State.Main);
            this.state.start("boot");

        }
    }
}
