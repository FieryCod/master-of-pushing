import {Player} from "../Player";
export interface Skill {
    name: string;
    id: number;

    onComplete: Phaser.Signal;
    onStart: Phaser.Signal;

    useSkill(player: Player): any;
    abortSkill?(): any;
}
