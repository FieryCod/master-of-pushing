// TODO: EXTEND THIS CLASS
import { CONFIG } from "../Config";

const ARENA_BASIC_COLOR: number = 0xadd8e6;

export class Arena {
    private game: Phaser.Game;
    public x: number;
    public y: number;
    public startDiameter: number;
    public diameter: number;
    public collision: Phaser.Circle;
    public arenaGraphics: Phaser.Graphics;
    constructor(game: Phaser.Game, x: number, y: number, diameter: number) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.diameter = this.startDiameter = diameter;
        this.collision = new Phaser.Circle(x, y, diameter);
        this.arenaGraphics = game.add.graphics(0, 0);
        this.draw();
    }
    private draw() {
        this.arenaGraphics.clear();
        this.arenaGraphics.beginFill(ARENA_BASIC_COLOR, 1);
        this.arenaGraphics.drawCircle(this.x, this.y, this.diameter);
        this.arenaGraphics.endFill();
        this.placeImagesAtEdge();
        // this.arenaGraphics.beginFill(0xff69b4, 1);
        // this.arenaGraphics.drawRect(, , 10, 50);
        // this.arenaGraphics.endFill();
    }
    private placeImagesAtEdge() {
        let x, y;
        let degreesToRotate = Phaser.Math.degToRad(90);
        for (let i = 0; i <= 360; i += 5) {
            x = this.x + this.collision.radius * Math.cos(i * (Math.PI / 180));
            y = this.y + this.collision.radius * Math.sin(i * (Math.PI / 180));
            let image: Phaser.Image = this.game.add.image(x, y, "arenaEdge");
            image.anchor.set(CONFIG.DEFAULT_ANCHOR);
            image.rotation = Phaser.Math.angleBetween(image.centerX, image.centerY, this.x, this.y);
            image.rotation -= degreesToRotate;
        }
    }
    public reduceSize(percent: number) {
        let diameterToSubstract = (percent / 100) * this.diameter;
        this.collision.diameter = this.diameter -= diameterToSubstract;
        this.draw();
    }
    public reset() {
        this.collision.diameter = this.diameter = this.startDiameter;
        this.draw();
    }
}