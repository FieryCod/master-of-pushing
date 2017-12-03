import { Menu } from '../classes/menu';

export class MainMenu extends Phaser.State {
  private menu: Menu;
  private rounds: Array<number>;
  private roundsIterator: number;

  init() {
    this.rounds = [2, 5, 7, 10, 15, 20];
    this.menu = new Menu(this.game);
    this.roundsIterator = 0;
  }
  create() {
    this.menu.addOption('Start', () => {
      this.game.state.start('main', true, false, this.rounds[this.roundsIterator]);
    });
    this.menu.addOption('Rounds: 2', () => {
      this.menu.optionsArray[this.menu.currOption].changeText(
        'ROUNDS: ' + this.rounds[this.increaseRounds()]);
    });
    this.menu.addOption('Options', () => { this.game.state.start('options'); });
    this.menu.addOption('Credits', () => { this.game.state.start('credits'); });
  }
  private increaseRounds(): number {
    if (this.roundsIterator >= this.rounds.length - 1) {
      this.roundsIterator = 0;
    } else {
      ++this.roundsIterator;
    }
    return this.roundsIterator;
  }
  update() {
    this.menu.update();
    // this.menu.update(Here I want to send keyboardEvents)
  }
}
