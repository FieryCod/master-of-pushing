import {CONFIG} from "../Config";

export class Preload extends Phaser.State {
    private preloadBar: Phaser.Text;
    private loadingPercentage: number = 0;
    preload() {
        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.updateProgress, this);
        this.game.load.spritesheet(CONFIG.PLAYER_SPRITESHEET, `assets/sprites/${CONFIG.PLAYER_SPRITESHEET}.png`, 32, 32);
        this.game.load.bitmapFont(CONFIG.TITLE_FONT, `assets/fonts/bitmapFonts/${CONFIG.TITLE_FONT}.png`, `assets/fonts/bitmapFonts/${CONFIG.TITLE_FONT}.xml`);

    }
    loadStart() {
        console.log(this.load.progress);
    }
    updateProgress() {
        console.log(this.load.progress);
    }
    create() {
        this.game.state.start("menu");
    }
}
