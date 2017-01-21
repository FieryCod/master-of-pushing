const BASIC_TEXT_COLOR: string = "#FFFFFF";
const BASIC_FONT: string = "?";
const BASIC_FONT_SIZE: number = 30;
const SMALLER_FONT_SIZE: number = BASIC_FONT_SIZE - 15;
const TITLE_FONT: string = "carrier_command";
const TITLE_FONT_SIZE: number = 46;
const GAME_BACKGROUND_COLOR: string = "#00000";
const PLAYER_SPRITESHEET: string = "ship";
const TITLE: string = "Push Master";
const DEFAULT_ANIMATION_PLAYER: string = "fly";
const PLAYER_COLLISION_SIZE: number = 28;
const START_POS_EDGE_OFFSET: number = 50;
const ACTIVE_TEXT_COLOR: number | string = "#5418A7";
const INACTIVE_TEXT_COLOR: number | string = "#FFFFFF";
const DEFAULT_ANCHOR: number = 0.5;
const STROKE_ACTIVE_COLOR: string = "#FF0000";
const STROKE_INACTIVE_COLOR: string = "#000000";
const MUSIC: Array<string> = ["music0.mp3"];
const ROUND_START_SECONDS: number = 3;

const TEXT_OPTIONS: TextOptionsObject = {
    font: `${BASIC_FONT_SIZE}pt ${BASIC_FONT}`,
    fill: BASIC_TEXT_COLOR,
    align: "center",
    stroke: "rgba(0,0,0,0)",
    strokeThickness: 4,
};

const SMALLER_TEXT_OPTIONS: TextOptionsObject = {
    font: `${SMALLER_FONT_SIZE}pt ${BASIC_FONT}`,
    fill: BASIC_TEXT_COLOR,
    align: "center",
    stroke: "rgba(0,0,0,0)",
    strokeThickness: 4,
};
export const CONFIG: CONFIG = {
    BASIC_TEXT_COLOR,
    BASIC_FONT,
    BASIC_FONT_SIZE,
    TITLE_FONT,
    TITLE_FONT_SIZE,
    GAME_BACKGROUND_COLOR,
    PLAYER_SPRITESHEET,
    TITLE,
    MUSIC,
    STROKE_ACTIVE_COLOR,
    STROKE_INACTIVE_COLOR,
    SMALLER_FONT_SIZE,
    DEFAULT_ANIMATION_PLAYER,
    PLAYER_COLLISION_SIZE,
    START_POS_EDGE_OFFSET,
    ACTIVE_TEXT_COLOR,
    INACTIVE_TEXT_COLOR,
    DEFAULT_ANCHOR,
    TEXT_OPTIONS,
    SMALLER_TEXT_OPTIONS,
    ROUND_START_SECONDS,
};


interface CONFIG {

    readonly GAME_BACKGROUND_COLOR: string;
    readonly PLAYER_SPRITESHEET: string;
    readonly PLAYER_COLLISION_SIZE: number;
    readonly DEFAULT_ANIMATION_PLAYER: string;
    readonly START_POS_EDGE_OFFSET: number;
    readonly DEFAULT_ANCHOR: number;
    readonly MUSIC: Array<string>;
    readonly ACTIVE_TEXT_COLOR: number | string;
    readonly INACTIVE_TEXT_COLOR: number | string;
    readonly BASIC_TEXT_COLOR: string;
    readonly STROKE_ACTIVE_COLOR: string;
    readonly STROKE_INACTIVE_COLOR: string;
    readonly BASIC_FONT_SIZE: number;
    readonly BASIC_FONT: string;
    readonly TITLE: string;
    readonly TITLE_FONT: string;
    readonly SMALLER_FONT_SIZE: number;
    readonly TITLE_FONT_SIZE: number;
    readonly TEXT_OPTIONS: TextOptionsObject;
    readonly SMALLER_TEXT_OPTIONS: TextOptionsObject;
    readonly ROUND_START_SECONDS: number;
}
export interface TextOptionsObject {
    font?: string;
    fill?: string | number;
    align?: string;
    stroke?: string;
    strokeThickness?: number;
    anchor?: number;
}
