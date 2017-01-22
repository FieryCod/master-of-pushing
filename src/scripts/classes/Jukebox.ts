const DEFAULT_VOLUME = 0.25;

export class Jukebox {

    private static game: Phaser.Game;
    private static music: Array<Phaser.Sound>;
    private static currMusic: Phaser.Sound;


    public static createJukebox(game: Phaser.Game) {
        Jukebox.music = [];
        Jukebox.game = game;
    }
    public static addMusic(musicName: string) {
        let music: Phaser.Sound = Jukebox.game.add.audio(musicName);
        Jukebox.music.push(music);
    }
    private static prepareJukebox() {
        let musicNumber: number = Math.floor((Math.random() * Jukebox.music.length) + 0);
        Jukebox.currMusic = Jukebox.music[musicNumber];
    }
    public static startMusic() {
        Jukebox.prepareJukebox();
        Jukebox.currMusic.volume = DEFAULT_VOLUME;
        Jukebox.currMusic.play();
    }
    public static stopMusic() {
        Jukebox.currMusic.pause();
    }
}
