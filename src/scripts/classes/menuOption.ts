export class MenuOption {
    private optionText: Phaser.Text;
    private activeColor: Phaser.Color;
    constructor(game: Phaser.Game, text: string, optionCount: number, textOptions: Object, callback: Function) {
        this.activeColor = "#5418A7";
        this.optionText = game.add.text(game.world.centerX, (optionCount * 80) + 300, text, textOptions);
        this.optionText.anchor.setTo(0.5);
        this.optionText.stroke = "rgba(0,0,0,0)";
        this.optionText.strokeThickness = 4;
        this.optionText.inputEnabled = true;
        this.optionText.events.onInputUp.add(callback, this);
        this.optionText.events.onInputOver.add(this.onOver, this);
        this.optionText.events.onInputOut.add(this.onOut, this);
    }
    public makeActive() {
        this.optionText.fill = this.activeColor;
        this.optionText.stroke = "rgba(245, 2, 2, 0.7)";
    }
    private onOver(target) {
        target.fill = this.activeColor;
        target.stroke = "rgba(245, 2, 2, 0.7)";
    }
    private onOut(target) {
        target.fill = "white";
        target.stroke = "rgba(0,0,0,0)";

    }
}
