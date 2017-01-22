import {Skill} from './Skill';
import {Player} from "../Player";

class Dash implements Skill {
    private DASH_ID = 1;

    constructor() {
        this.name = 'Dash';
        this.id = this.DASH_ID;
        this.onStart = new Phaser.Signal();
        this.onComplete = new Phaser.Signal();
    }

    public onComplete: Phaser.Signal;
    public onStart: Phaser.Signal;

    public name: string;
    public id: number;

    public useSkill(player: Player) {
        this.onStart.dispatch();
        player.body.applyImpulse(100, player.input.downPoint.x, player.input.downPoint.y);
        this.onComplete.dispatch();
    }
}
