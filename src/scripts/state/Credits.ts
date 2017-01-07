interface Devs {
    position: string;
    name: string;
}
export class Credits extends Phaser.State {
    private gameTitle: Phaser.BitmapText;
    private text: Phaser.Text;
    private devs: Array<Devs>;
    init() {

        this.devs = [
            {
                position: "Programmer", name: "Krzysztof Buchacz"
            },
            {
                position: "Programmer", name: "Karol Wójcik"
            },
            {
                position: "Programmer", name: "Tomasz Kulpa"
            }
        ];

        this.gameTitle = this.game.add.bitmapText(this.world.centerX, 100, "carrier_command", "Push Master", 45);
        this.gameTitle.anchor.set(0.5);
        this.game.add.tween(this.gameTitle).from({ y: -100, angle: 45 }, 2000, Phaser.Easing.Bounce.Out, true, 0, 0);
        this.game.add.graphics(this.world.centerX - 300, 140).lineStyle(10, 0xFFFFFF).lineTo(215, 0);
        this.game.add.graphics(this.world.centerX - 40, 140).lineStyle(10, 0xFFFFFF).lineTo(340, 0);
    }
    create() {
        for (let i in this.devs)
            this.addDev(this.devs[i].position, this.devs[i].name, +i);

    }
    private addDev(position: string, devName: string, curr: number) {

        this.game.add.text(this.world.centerX - 350, 250 + (150 * curr), `Position: ${position}`, {
            font: "20pt carrier_command",
            fill: "white", align: "center",
            stroke: "rgba(0,0,0,0)", strokeThickness: 20
        });

        this.game.add.text(this.world.centerX - 350, 300 + (150 * curr), `Name: ${devName}`, {
            font: "15pt carrier_command",
            fill: "white", align: "center",
            stroke: "rgba(0,0,0,0)", strokeThickness: 20
        });
    }
}
