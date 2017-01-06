export class Preload extends Phaser.State {
    private preloadBar: Phaser.Text;
    private loadingPercentage: number = 0;
    preload() {
        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.updateProgress, this);
        this.game.load.image("bradberry", "assets/bradberry.jpg");
        this.game.load.spritesheet('ship', 'assets/sprites/humstar.png', 32, 32);
        this.game.load.image("cat", "assets/cat.png");
        this.game.load.image("lol", "assets/lol.jpg");

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
