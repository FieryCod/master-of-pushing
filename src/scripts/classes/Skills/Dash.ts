import {Skill} from './Skill';
import {Player} from "../Player";

export class Dash implements Skill {
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

    public useSkill(player: Player){
        this.onStart.dispatch();
        player.body.applyImpulse([player.position.x + 1, player.position.y + 1], player.position.x, player.position.y);
        this.onComplete.dispatch();
    }
}
