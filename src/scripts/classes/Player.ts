import { CONFIG } from "../Config";
import { WeaponManager } from "./Weapons/WeaponManager";

const STARTING_POINTS = 0;
const ORIGINAL_SCALE = 2;

export class Player extends Phaser.Sprite {
    public startPosition: Phaser.Point;
    public lastTouchedBy: Player;
    public points: number;
    public locked: boolean;
    public name: string;
    private originalScale;
    public weaponName: string;
    public fellOffArena: boolean;

    constructor(game: Phaser.Game, x: number, y: number, name: string) {
        super(game, x, y, CONFIG.PLAYER_SPRITESHEET);
        this.startPosition = new Phaser.Point(x, y);
        this.points = STARTING_POINTS;
        this.locked = true;
        this.fellOffArena = false;
        this.name = name;
        this.scale.set(ORIGINAL_SCALE);
        this.anchor.x = this.anchor.y = CONFIG.DEFAULT_ANCHOR;
        this.smoothed = false;
        this.animations.add(CONFIG.DEFAULT_ANIMATION_PLAYER, [0, 1, 2, 3, 4, 5], 10, true);
        this.weaponName = CONFIG.WEAPON_BOMB;
    }
    public postionAtStart() {
        this.body.setZeroVelocity();
        this.body.setZeroRotation();
        this.body.angle = 0;
        this.body.x = this.startPosition.x;
        this.body.y = this.startPosition.y;
        this.play(CONFIG.DEFAULT_ANIMATION_PLAYER);
    }
    revive(health?: number): Player {
        this.fellOffArena = false;
        this.body.dynamic = true;
        this.alpha = 1;
        this.scale.x = this.scale.y = ORIGINAL_SCALE;
        this.postionAtStart();
        return <Player>super.revive(health);
    }
    public kill(): any {
        this.fellOffArena = true;
        this.body.dynamic = false;
        this.locked = true;
        let tweenMove, tweenFade, tweenScale: Phaser.Tween;
        let velocityX = this.body.velocity.x, velocityY = this.body.velocity.y;
        let directionX = this.body.x + velocityX, directionY = this.body.y + velocityY;
        tweenMove = this.game.add.tween(this).to({ x: directionX, y: directionY }, 1000, Phaser.Easing.Linear.None, true);
        tweenScale = this.game.add.tween(this.scale).to({ x: 0.3, y: 0.3 }, 900, Phaser.Easing.Cubic.In, true, 100);
        tweenMove.onComplete.addOnce(() => {
            this.game.add.tween(this).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true).onComplete.addOnce(() => {
                return super.kill();
            });
        });
    }
}
