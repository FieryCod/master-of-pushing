import { CONFIG } from "../Config";
import { WeaponManager } from "./Weapons/WeaponManager";

export class Player extends Phaser.Sprite {
    public startPosition: Phaser.Point;
    public lastTouchedBy: Player;
    public points: number;
    public locked: boolean;
    public name: string;
    public weaponName: string;

    constructor(game: Phaser.Game, x: number, y: number, name: string) {
        super(game, x, y, CONFIG.PLAYER_SPRITESHEET);
        this.startPosition = new Phaser.Point(x, y);
        this.points = 0;
        this.locked = true;
        this.name = name;
        this.scale.set(2);
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
    public revive(health?: number): Player {
        this.postionAtStart();
        return <Player>super.revive(health);
    }
}
