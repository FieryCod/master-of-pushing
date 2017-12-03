import { CONFIG } from '../config';
import { Arena } from '../classes/Arena';


const GAME_TIME: number = 30;
const PERCENTAGE_OF_ARENA_REDUCE = 25;
const ROUNDS_TIMES = [GAME_TIME, GAME_TIME - 5, GAME_TIME - 10];

export class GameTimer extends Phaser.Timer {
    private timerEvent: Phaser.TimerEvent;
    private degreePerSecond: number;
    private arena: Arena;
    private currentTime: number;
    private countdownText: Phaser.Text;
    private dangerTween: Phaser.Tween;
    private dangerTime: number;
    private dangerEvent: Phaser.TimerEvent;
    private phaseOfGame: number;

    constructor(game: Phaser.Game, arena: Arena, x: number, y: number) {
        super(game, false);

        this.arena = arena;
        this.phaseOfGame = 0;
        this.currentTime = ROUNDS_TIMES[this.phaseOfGame];
        this.countdownText = this.game.add.text(x, y, this.currentTime.toString(), CONFIG.TEXT_OPTIONS);
        this.countdownText.anchor.set(CONFIG.DEFAULT_ANCHOR);
        this.timerEvent = this.loop(Phaser.Timer.SECOND, this.tick, this);
        this.dangerTween = new Phaser.Tween(this.countdownText, this.game, this.game.tweens);
        this.dangerTween.to({ alpha: 1 }, 500, 'Linear', false, 0, 9999, true);
        this.dangerTime = Math.round(GAME_TIME - (40 / 100) * GAME_TIME);
        this.dangerEvent = this.add(this.dangerTime * 1000, this.dangerTimeStart, this);
    }
    private dangerTimeStart(): void {
        this.countdownText.alpha = 0;
        this.countdownText.addColor(CONFIG.DANGER_TEXT_COLOR, 0);
        this.dangerTween.start();
    }
    private increasePhase() {
        if (this.phaseOfGame >= ROUNDS_TIMES.length) {
            this.phaseOfGame = 0;
        }
        return ++this.phaseOfGame;
    }
    private tick() {

        if (this.currentTime <= 0) {
            this.arena.reduceSize(PERCENTAGE_OF_ARENA_REDUCE);
            this.currentTime = ROUNDS_TIMES[this.increasePhase()];
            this.dangerTime = Math.round(this.currentTime - (40 / 100) * this.currentTime);
            this.dangerTween.stop();

            this.remove(this.dangerEvent);
            this.resetTweenEvent();
        }
        else {
            --this.currentTime;
            this.setCountdownText(this.currentTime);
        }
    }
    public reset(): void {
        this.stop(false);
        this.currentTime = GAME_TIME;
        this.remove(this.dangerEvent);
        this.resetTweenEvent();
        this.setCountdownText(this.currentTime);
    }
    private resetTweenEvent(): void {
        this.countdownText.addColor(CONFIG.BASIC_TEXT_COLOR, 0);
        this.countdownText.alpha = 1;
        this.dangerEvent = this.add(this.dangerTime * 1000, this.dangerTimeStart, this);
    }
    private setCountdownText(time: number): void {
        this.countdownText.setText(time.toString());
    }
}