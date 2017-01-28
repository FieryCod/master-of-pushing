import { CONFIG } from "../Config";
import { Arena } from "../classes/Arena";

const STARTING_DEGREE: number = -90;
const GAME_TIME: number = 60;
const CIRCLE_DEGREES: number = 360;
const PERCENTAGE_OF_ARENA_REDUCE = 25;
const REDUCE_ARENA_AT = [30, 45, 60];

export class GameTimer extends Phaser.Timer {
    private clockBg: Phaser.Image;
    private clockFace: Phaser.Image;
    private clockBall: Phaser.Image;
    private clockHand: Phaser.Image;
    private timerEvent: Phaser.TimerEvent;
    private degreePerSecond: number;
    private arena: Arena;
    private currentTime;
    constructor(game: Phaser.Game, arena: Arena, x: number, y: number) {
        super(game, false);
        this.arena = arena;
        this.currentTime = 0;
        this.clockBg = game.add.image(x, y, "clockBg");
        this.clockFace = game.add.image(x, y, "clockFace");
        this.clockHand = game.add.image(x, y, "clockHand");
        this.clockBg.anchor.set(CONFIG.DEFAULT_ANCHOR);
        this.clockFace.anchor.set(CONFIG.DEFAULT_ANCHOR);
        this.clockHand.anchor.set(CONFIG.DEFAULT_ANCHOR);
        this.clockHand.angle = STARTING_DEGREE;
        this.degreePerSecond = CIRCLE_DEGREES / GAME_TIME;
        this.timerEvent = this.repeat(Phaser.Timer.SECOND, GAME_TIME, this.tick, this);
    }
    private tick() {
        this.clockHand.angle += this.degreePerSecond;
        ++this.currentTime;
        if (REDUCE_ARENA_AT.indexOf(this.currentTime) !== -1) {
            this.arena.reduceSize(PERCENTAGE_OF_ARENA_REDUCE);
        }
    }
}