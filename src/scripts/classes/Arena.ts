// TODO: EXTEND THIS CLASS

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
        this.arenaGraphics = game.add.graphics(0,0);
        this.arenaGraphics.beginFill(ARENA_BASIC_COLOR, 1);
        this.arenaGraphics.drawCircle(x, y, diameter);
    }
    private redraw() {
        this.arenaGraphics.clear();
        this.arenaGraphics.beginFill(ARENA_BASIC_COLOR, 1);
        this.arenaGraphics.drawCircle(this.x, this.y, this.diameter);
    }
    public reduceSize(percent: number) {
        let diameterToSubstract = (percent / 100) * this.diameter;
        this.collision.diameter = this.diameter -= diameterToSubstract;
        this.redraw();
    }
    public reset() {
        this.collision.diameter = this.diameter = this.startDiameter;
        this.redraw();
    }
}