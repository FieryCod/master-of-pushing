// TODO: EXTEND THIS CLASS
import { CONFIG } from '../config';
import { Player } from './Player';

const ARENA_BASIC_COLOR: number = 0xadd8e6;

export class Arena {
    private game: Phaser.Game;
    public x: number;
    public y: number;
    public startDiameter: number;
    public diameter: number;
    public collision: Phaser.Circle;
    public arenaGraphics: Phaser.Graphics;
    public roundWinnerName: Phaser.Text;

    constructor(game: Phaser.Game, x: number, y: number, diameter: number) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.diameter = this.startDiameter = diameter;
        this.collision = new Phaser.Circle(x, y, diameter);
        this.arenaGraphics = game.add.graphics(0, 0);
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
    public assignStartPositionsToPlayers(players: Phaser.Group) {
        let positions: number = players.length;
        let degreesOffset: number = 360 / positions;
        let angle: number;
        let player: Player;
        for (let i = 0; i < positions; ++i) {
            angle = i * degreesOffset;
            player = players.getChildAt(i) as Player;
            player.body.x = player.startPosition.x = this.x + (this.collision.radius - CONFIG.START_POS_EDGE_OFFSET) * Math.cos(angle * (Math.PI / 180));
            player.body.y = player.startPosition.y = this.y + (this.collision.radius - CONFIG.START_POS_EDGE_OFFSET) * Math.sin(angle * (Math.PI / 180));
        }
        players.callAll('positionAtStart', null);
    }
    public destroyWinnerText() {
        this.roundWinnerName.destroy();
    }
    public showRoundWinner(winner: string) {
        this.roundWinnerName = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, `Winner is ${winner}`,
            CONFIG.TEXT_OPTIONS);
        this.roundWinnerName.anchor.set(CONFIG.DEFAULT_ANCHOR);
    }
}