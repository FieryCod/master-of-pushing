import {CONFIG} from '../Config';

const FONT: String = '64px Arial';
const FONT_FILL_COLOR: String = '#ffffff';
const TEXT_ALIGN: String = 'center';
const TEXT_ANCHOR: number = 0.5;

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
    this.players.setAll('locked', true);
    this.currentSecondToStart = CONFIG.ROUND_START_SECONDS;
    this.counterText = this.game.add.text(
        this.game.world.centerX, this.game.world.centerY,
        this.currentSecondToStart.toString(),
        {font: FONT, fill: FONT_FILL_COLOR, align: TEXT_ALIGN});
    this.counterText.anchor.setTo(TEXT_ANCHOR, TEXT_ANCHOR);
    this.timerEvent = this.repeat(
        Phaser.Timer.SECOND, this.currentSecondToStart, this.tick, this);
  }
  private tick(): void {
    this.counterText.setText((--this.currentSecondToStart).toString());
    if (this.currentSecondToStart === 0) {
      this.players.setAll('locked', false);
      this.counterText.destroy();
      this.remove(this.timerEvent);
    }
  }
}