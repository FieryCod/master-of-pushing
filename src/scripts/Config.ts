const BasicTextColor: number | string = "white";
const BasicFont: string = "?";
const BasicFontSize: number = 30;
const TitleFont: string = "carrier_command";
const TitleFontSize: number = 46;
const GameBackgroundColor: number = 0x000000;
const PlayerSpritesheet: string = "ship";
const Title: string = "Push Master";
const DefaultAnimation: string = "fly";
const PlayerCollisionSize: number = 28;
const StartPosEdgeOffset: number = 50;
const ActiveText: number | string = "#5418A7";
const InactiveText: number | string = "#FFFFFF";
const Anchor: number = 0.5;
const Music: Array<string> = ["music0.mp3"];

export const CONFIG = {

    GAME_BACKGROUND_COLOR: GameBackgroundColor,
    PLAYER_SPRITESHEET: PlayerSpritesheet,
    PLAYER_COLLISION_SIZE: PlayerCollisionSize,
    DEFAULT_ANIMATION_PLAYER: DefaultAnimation,
    START_POS_EDGE_OFFSET: StartPosEdgeOffset,
    ANCHOR: Anchor,
    MUSIC: Music,
    ACTIVE_TEXT: ActiveText,
    INACTIVE_TEXT: InactiveText,
    BASIC_TEXT_COLOR: BasicTextColor,
    BASIC_FONT: BasicFont,
    BASIC_FONT_SIZE: BasicFontSize,
    TITLE: Title,
    TITLE_FONT: TitleFont,
    TITLE_FONT_SIZE: TitleFontSize,

    TEXT_OPTIONS: {
        font: `${BasicFontSize}pt ${BasicFont}`,
        fill: BasicTextColor, align: "center",
        stroke: "rgba(0,0,0,0)",
        strokeThickness: 4,
    },


};

interface TextOptionsObject {
    font?: string;
    fill?: string | number;
    align?: string;
    stroke?: string;
    strokeThickness?: number;
    anchor?: number;
}
