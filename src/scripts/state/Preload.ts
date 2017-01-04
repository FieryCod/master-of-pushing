namespace Pushmaster.State {
    export class Preload extends Phaser.State {
        private preloadBar: Phaser.Text;
        private loadingPercentage: number = 0;
        preload() {
          this.load.crossOrigin = "Anonymous";
            this.game.load.image("bradberry", "assets/bradberry.jpg");
        }
        update() {
            // this.loadingPercentage = this.game.load.progress;
            // this.preloadBar.setText(`Loading ${this.loadingPercentage}%`);

        }
        loadStart() {

        }
        create() {
          this.game.add.sprite(0, 0, "bradberry");
            // this.game.load.onLoadStart.add(this.loadStart, this);
            // this.game.state.start("main");
        }
    }
}
