export class Player extends Phaser.Sprite {

    public startingPosition: Phaser.Point;
    public lastTouchedBy: Player;
    public points: number;
    constructor(game: Phaser.Game, x, y, key) {
        super(game, x, y, key);
        this.startingPosition = new Phaser.Point(x, y);
        this.points = 0;
    }
}
