import { CONFIG } from "../Config";

export class Player extends Phaser.Sprite {
    public startPosition: Phaser.Point;
    public lastTouchedBy: Player;
    public points: number;
    public locked: boolean;
    public name: string;

    constructor(game: Phaser.Game, x: number, y: number, name: string, key: string) {
        super(game, x, y, key);
        this.startPosition = new Phaser.Point(x, y);
        this.points = 0;
        this.locked = true;
        this.name = name;
        this.scale.set(2);
        this.anchor.x = this.anchor.y = CONFIG.DEFAULT_ANCHOR;
        this.smoothed = false;
        this.animations.add(CONFIG.DEFAULT_ANIMATION_PLAYER, [0, 1, 2, 3, 4, 5], 10, true);
    }
    postionAtStart() {
        this.body.setZeroVelocity();
        this.body.setZeroRotation();
        this.body.angle = 0;
        this.body.x = this.startPosition.x;
        this.body.y = this.startPosition.y;
        this.play(CONFIG.DEFAULT_ANIMATION_PLAYER);
    }
    revive(health?: number): Player {
        this.body.dynamic = true;
        this.postionAtStart();
        return <Player>super.revive(health);
    }
    public kill(): any {
        let tweenMove, tweenFade, tweenScale: Phaser.Tween;
        let velocityX = this.body.velocity.x, velocityY = this.body.velocity.y;
        let directionX = this.body.x + velocityX, directionY = this.body.y + velocityY;
        this.alive = false;
        this.locked = true;
        this.body.dynamic = false;
        tweenMove = this.game.add.tween(this).to({ x: directionX, y: directionY }, 1000, Phaser.Easing.Linear.None, true);
        tweenScale = this.game.add.tween(this.scale).to({ x: 0.3, y: 0.3 }, 900, Phaser.Easing.Cubic.In, true, 100);
        tweenScale.onComplete.addOnce(() => {
            tweenFade = this.game.add.tween(this).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
            super.kill();
        });
    }
}
