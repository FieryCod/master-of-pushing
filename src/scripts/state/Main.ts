namespace Pushmaster.State {
    export class Main extends Phaser.State {
        create() {
            let thing: String = "code !";
            this.add.text(10, 10, `Let's ${thing}`, { font: "65px Arial" });
        }
    }
}
