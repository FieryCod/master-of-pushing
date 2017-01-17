export class Jukebox {

    private static game: Phaser.Game;
    private static musics: Array<Phaser.Sound>;
    private static currMusic: Phaser.Sound;


    public static createJukebox(game: Phaser.Game) {
        Jukebox.musics = [];
        Jukebox.game = game;
    }
    public static addMusic(musicName: string) {
        let music: Phaser.Sound = Jukebox.game.add.audio(musicName);
        Jukebox.musics.push(music);
    }
    private static prepareJukebox() {
        let musicNumber: number = Math.floor((Math.random() * Jukebox.musics.length) + 0);
        Jukebox.currMusic = Jukebox.musics[musicNumber];
    }
    public static startMusic() {
        Jukebox.prepareJukebox();
        Jukebox.currMusic.play();
    }
    public static stopMusic() {
        Jukebox.currMusic.pause();
    }
}
