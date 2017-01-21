/// <reference path="../../node_modules/phaser/typescript/pixi.d.ts" />
/// <reference path="../../node_modules/phaser/typescript/p2.d.ts" />
/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import {Boot} from './state/Boot';
import {Credits} from './state/Credits';
import {Main} from './state/Main';
import {MainMenu} from './state/MainMenu';
import {Options} from './state/Options';
import {Preload} from './state/Preload';

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
