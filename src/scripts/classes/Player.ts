export class Player extends Phaser.Sprite {
    public startPosition: Phaser.Point;
    public lastTouchedBy: Player;
    public points: number;
    public locked: boolean;
    constructor(game: Phaser.Game, x, y, key) {
        super(game, x, y, key);
        this.startPosition = new Phaser.Point(x, y);
        this.points = 0;
        this.locked = true;
    }
    postionAtStart() {
        this.body.setZeroVelocity();
        this.body.setZeroRotation();
        this.body.angle = 0;
        this.body.x = this.startPosition.x;
        this.body.y = this.startPosition.y;
    }
    revive(health?: number): Player {
        this.postionAtStart();
        return <Player>super.revive(health);
    }
}
