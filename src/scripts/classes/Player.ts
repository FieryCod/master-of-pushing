export class Player extends Phaser.Sprite {
    public startPosition: Phaser.Point;
    public lastTouchedBy: Player;
    public points: number;
    constructor(game: Phaser.Game, x, y, key) {
        super(game, x, y, key);
        this.startPosition = new Phaser.Point(x, y);
        this.points = 0;
    }
    postionAtStart() {
        this.body.setZeroVelocity();
        this.body.x = this.startPosition.x;
        this.body.y = this.startPosition.y;
    }
    revive(health?: number): Player {
        this.postionAtStart();
        return <Player>super.revive(health);
    }
}
