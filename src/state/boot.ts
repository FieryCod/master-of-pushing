import { CONFIG } from '../config';
import * as Utils from '../utils/utils';
import * as Assets from '../assets';

export class Boot extends Phaser.State {
    public preload(): void {
        // Load any assets you need for your preloader state here.
        this.game.load.atlasJSONArray(Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.getPNG(), Assets.Atlases.AtlasesPreloadSpritesArray.getJSONArray());
        // this.game.load.atlasJSONHash(Assets.Atlases.AtlasesPreloadSpritesHash.getName(), Assets.Atlases.AtlasesPreloadSpritesHash.getPNG(), Assets.Atlases.AtlasesPreloadSpritesHash.getJSONHash());
        // this.game.load.atlasXML(Assets.Atlases.AtlasesPreloadSpritesXml.getName(), Assets.Atlases.AtlasesPreloadSpritesXml.getPNG(), Assets.Atlases.AtlasesPreloadSpritesXml.getXML());
    }
    create() {
        this.game.stage.backgroundColor = CONFIG.GAME_BACKGROUND_COLOR;
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.game.state.start('preload');
    }
}
