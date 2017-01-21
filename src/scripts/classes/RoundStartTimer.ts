import { CONFIG } from "../Config";

export class RoundStartTimer extends Phaser.Timer {

  private currentSecondToStart: number;
  private counterText: Phaser.Text;
  private players: Phaser.Group;
  private timerEvent: Phaser.TimerEvent;

  constructor(game: Phaser.Game, players: Phaser.Group) {

    super(game, false);
    this.players = players;
  }
  public startRoundCountdown(): void {

    this.players.setAll("locked", true);
    this.currentSecondToStart = CONFIG.ROUND_START_SECONDS;
    this.counterText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, this.currentSecondToStart.toString(), CONFIG.TEXT_OPTIONS);
    this.counterText.anchor.setTo(CONFIG.DEFAULT_ANCHOR, CONFIG.DEFAULT_ANCHOR);
    this.timerEvent = this.repeat(Phaser.Timer.SECOND, this.currentSecondToStart, this.tick, this);
  }
  private tick(): void {

    this.counterText.setText((--this.currentSecondToStart).toString());

    if (this.currentSecondToStart === 0) {
      this.players.setAll("locked", false);
      this.counterText.destroy();
      this.remove(this.timerEvent);
    }
  }
}