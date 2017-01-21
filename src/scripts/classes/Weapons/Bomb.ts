import { CONFIG } from "../../Config";
import { Weapon } from "./Weapon";

const DEFAULT_BOMB_ANIMATION = "idle";

export class Bomb extends Weapon {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, CONFIG.WEAPON_BOMB);
        this.animations.add(DEFAULT_BOMB_ANIMATION, [0, 1], 10, true);
        this.smoothed = false;
        this.anchor.x = this.anchor.y = CONFIG.DEFAULT_ANCHOR;
        this.play(DEFAULT_BOMB_ANIMATION);
        game.add.existing(this);
    }
}