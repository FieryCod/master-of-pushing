export class Preload extends Phaser.State {
    private preloadBar: Phaser.Text;
    private loadingPercentage: number = 0;
    preload() {
        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.updateProgress, this);
        this.game.load.spritesheet('ship', 'assets/sprites/humstar.png', 32, 32);

    }
    loadStart() {
        console.log(this.load.progress);
    }
    updateProgress() {
        console.log(this.load.progress);
    }
    create() {
        this.game.state.start("main");
    }
}
