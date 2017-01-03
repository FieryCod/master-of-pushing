namespace Pushmaster.State {
    export class Preload extends Phaser.State {
        private preloadBar: Phaser.Sprite;
        preload() {

        }
        create() {
            this.game.state.start("main");
        }
    }
}
