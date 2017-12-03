import { Player } from '../../classes/Player';
import { Bomb } from '../../classes/Weapons/Bomb';

export class WeaponManager {
    private game: Phaser.Game;
    constructor(game: Phaser.Game) {
        this.game = game;
    }
    public use(player: Player) {
        switch (player.weaponName) {
            case 'bomb':
                new Bomb(this.game, player.body.x, player.body.y);
                delete player.weaponName;
                break;
            default:
        }
    }
}
