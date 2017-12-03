import { CONFIG } from '../config';


export class Scoreboard {
  private playersInformations: Array<PlayerInfo>;
  private drawingBoard: Array<Phaser.Text>;

  constructor(private game: Phaser.Game) {
    this.playersInformations = [];
    this.drawingBoard = [];
  }

  public addPlayerToScoreboard(name: string, color: string) {
    this.playersInformations.push({ name: name, scores: 0, color: color });
  }
  private sortScoresDescending(): Array<PlayerInfo> {
    return this.playersInformations.sort((a, b) => { return b.scores - a.scores; });
  }
  public updateInfo(winnerIndex: number): Scoreboard {
    ++this.playersInformations[winnerIndex].scores;
    this.sortScoresDescending();
    this.updateScoreboard();
    return this;
  }
  private updateScoreboard() {
    let playerInfo: PlayerInfo;
    for (let [index, playerDesc] of this.drawingBoard.entries()) {
      playerInfo = this.playersInformations[index];
      playerDesc.addColor(playerInfo.color, 0);
      playerDesc.setText(`${index + 1}. ${playerInfo.name}: ${playerInfo.scores}pkt`);
    }
  }
  public drawScoreboard(): void {
    for (let [index, playerInfo] of this.playersInformations.entries()) {
      CONFIG.SCOREBOARD_TEXT_COLOR.fill = playerInfo.color;
      this.drawingBoard.push(this.game.add.text(50, 200 + (80 * index), `${index + 1}. ${playerInfo.name}: ${playerInfo.scores}pkt `, CONFIG.SCOREBOARD_TEXT_COLOR));
    }
  }
}

interface PlayerInfo {
  name: string;
  scores: number;
  color: string;
}