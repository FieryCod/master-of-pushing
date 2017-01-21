import {MenuOption} from '../classes/MenuOption';
import {CONFIG} from '../Config';

export class Menu {
  public optionsArray: Array<MenuOption>;
  private gameTitle: Phaser.BitmapText;
  private optionCount: number;
  public currOption: number;
  private cursorKeys: Phaser.CursorKeys;
  private enterKey: Phaser.Key;
  private back: MenuOption;

  constructor(private game: Phaser.Game) {
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
    this.currOption = 0;
    this.optionCount = 0;
    this.optionsArray = [];
    this.gameTitle = this.game.add.bitmapText(
        this.game.world.centerX, 100, CONFIG.TITLE_FONT, CONFIG.TITLE,
        CONFIG.TITLE_FONT_SIZE);
    this.gameTitle.anchor.set(0.5);
    this.game.add.tween(this.gameTitle)
        .from({y: -100, angle: 45}, 2000, Phaser.Easing.Bounce.Out, true, 0, 0);
    this.cursorKeys = this.game.input.keyboard.createCursorKeys();
    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.game.input.onDown.add(this.toggleFullscreen, this);
  }

  public addOption(
      text: string, callback: Function, isBack: boolean = false,
      isPrimal: boolean = false): void {
    this.optionsArray.push(new MenuOption(
        this.game, text.toUpperCase(), this.optionCount, callback, isBack,
        isPrimal));
    ++this.optionCount;
  }
  private updateCurrOption(optionNumber: number): void {
    this.currOption += optionNumber;

    if ((this.currOption < 0) || (this.currOption >= this.optionsArray.length))
      this.currOption = 0;
  }
  private toggleFullscreen(): void {
    if (this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
    } else {
      this.game.scale.startFullScreen(false);
    }
  }
  public update(): void {
    if (this.enterKey.justDown)
      this.optionsArray[this.currOption].callOptionFunction();

    if (this.cursorKeys.up.justDown) this.updateCurrOption(-1);

    if (this.cursorKeys.down.justDown) this.updateCurrOption(1);

    for (let i = 0; i < this.optionsArray.length; ++i) {
      if (i === this.currOption)
        this.optionsArray[i].makeActive();
      else
        this.optionsArray[i].makeInactive();
    }
  }
}
