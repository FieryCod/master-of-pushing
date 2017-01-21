import { Jukebox } from "../classes/Jukebox";
import { CONFIG } from "../Config";

export class Preload extends Phaser.State {

  private preloadBar: Phaser.Text;
  private loadingPercentage: number = 0;

  preload() {

    this.game.load.onLoadStart.add(this.loadStart, this);
    this.game.load.onFileComplete.add(this.updateProgress, this);
    this.game.load.onLoadComplete.add(this.loadComplete, this);
    this.game.load.spritesheet(CONFIG.PLAYER_SPRITESHEET, `assets/sprites/${CONFIG.PLAYER_SPRITESHEET}.png`, 32, 32);
    this.game.load.bitmapFont(CONFIG.TITLE_FONT, `assets/fonts/bitmapFonts/${CONFIG.TITLE_FONT}.png`, `assets/fonts/bitmapFonts/${CONFIG.TITLE_FONT}.xml`);

    Jukebox.createJukebox(this.game);
    let musicName: string;
    for (let music of CONFIG.MUSIC) {
      musicName = music.substring(0, music.indexOf("."));
      this.game.load.audio(`${musicName}`, `assets/sounds/${music}`);
    }
  }
  loadComplete() {

    for (let music of CONFIG.MUSIC) {
      let musicName = music.substring(0, music.indexOf("."));
      Jukebox.addMusic(musicName);
    }

    this.game.sound.onSoundDecode.add(Jukebox.startMusic, this);
    this.game.state.start("menu");
  }
  loadStart() {
    console.log(this.load.progress);
  }
  updateProgress() {
    console.log(this.load.progress);
  }
}
