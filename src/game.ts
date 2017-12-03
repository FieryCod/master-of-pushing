import { Boot } from './state/boot';
import { Main } from './state/main';
import Preload from './state/preload';
import { MainMenu } from './state/mainMenu';
import { Credits } from './state/credits';
import { Options } from './state/options';
export class Game extends Phaser.Game {

    constructor() {
        super('100%', '100%', Phaser.AUTO, '', null, false, true, null);
        this.state.add('boot', Boot);
        this.state.add('preload', Preload);
        this.state.add('menu', MainMenu);
        this.state.add('main', Main);
        this.state.add('options', Options);
        this.state.add('credits', Credits);
        this.state.start('boot');
    }
}
