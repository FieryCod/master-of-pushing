const BASIC_TEXT_COLOR: number = 0xFFFFFF;
const BASIC_FONT: string = "?";
const BASIC_FONT_SIZE: number = 30;
const TITLE_FONT: string = "carrier_command";
const TITLE_FONT_SIZE: number = 46;
const GAME_BACKGROUND_COLOR: number = 0x000000;
const PLAYER_SPRITESHEET: string = "ship";
const TITLE: string = "Push Master";
const DEFAULT_ANIMATION_PLAYER: string = "fly";
const PLAYER_COLLISION_SIZE: number = 28;
const START_POS_EDGE_OFFSET: number = 50;
const ACTIVE_TEXT_COLOR: number | string = "#5418A7";
const INACTIVE_TEXT_COLOR: number | string = "#FFFFFF";
const DEFAULT_ANCHOR: number = 0.5;
const TEXT_OPTIONS: Object = {
    font: `${BASIC_FONT_SIZE}pt ${BASIC_FONT}`,
    fill: BASIC_TEXT_COLOR, align: "center",
    stroke: "rgba(0,0,0,0)",
    strokeThickness: 4,
};

export const CONFIG = {
    BASIC_TEXT_COLOR,
    BASIC_FONT,
    BASIC_FONT_SIZE,
    TITLE_FONT,
    TITLE_FONT_SIZE,
    GAME_BACKGROUND_COLOR,
    PLAYER_SPRITESHEET,
    TITLE,
    DEFAULT_ANIMATION_PLAYER,
    PLAYER_COLLISION_SIZE,
    START_POS_EDGE_OFFSET,
    ACTIVE_TEXT_COLOR,
    INACTIVE_TEXT_COLOR,
    DEFAULT_ANCHOR,
    TEXT_OPTIONS
};
