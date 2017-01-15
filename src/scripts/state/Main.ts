import { Player } from "../classes/Player";
import {CONFIG} from "../Config";
const TEMP_ARENA_COLOR: number = 0xadd8e6;

// FIXME: Arena should be responsive
// FIXME: USE PRIVATE, PUBLIC when you define functions
export class Main extends Phaser.State {

    private rounds: number;
    private currentRound: number;
    private players: Phaser.Group;
    private cursors: Phaser.CursorKeys;
    private arena: Phaser.Circle;
    private graphics: Phaser.Graphics;

    init(rounds: number) {
        this.rounds = rounds || 1;
        this.currentRound = 1;
        this.players = new Phaser.Group(this.game);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }
    create() {

        this.setupArena();
        this.game.world.bringToTop(this.players);
        this.addPlayer("Player1");
        this.addPlayer("Player2");
        this.addPlayer("Player3");
        this.addPlayer("Player4");
        this.addPlayer("Player5");
        this.addPlayer("Player6");
        this.initPhysics();
        this.assignStartPositionsToPlayers();
        this.players.callAll("postionAtStart", null);
    }
    private setupArena() {
        this.arena = new Phaser.Circle(this.world.centerX, this.world.centerY, this.world.height);
        // TODO: Replace temp graphic for arena
        this.graphics = this.game.add.graphics(0, 0);
        this.graphics.beginFill(TEMP_ARENA_COLOR, 1);
        this.graphics.drawCircle(this.world.centerX, this.world.centerY, this.arena.diameter);
        // --
    }
    private initPhysics(): void {
        let playerCollisionGroups = [];
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.players.forEach(player => {
            this.game.physics.p2.enable(player, false);
            let playerCollisionGroup = this.game.physics.p2.createCollisionGroup();

            player.body.setCircle(CONFIG.PLAYER_COLLISION_SIZE);

            player.body.setCollisionGroup(playerCollisionGroup);
            playerCollisionGroups.push(playerCollisionGroup);
        }, this);

        this.players.forEach(p => p.body.collides(playerCollisionGroups, this.playersCollideCallback), this);
    }
    private addPlayer(name: string) {

        let player = new Player(this.game, this.arena.x, this.arena.y, CONFIG.PLAYER_SPRITESHEET);

        player.name = name;
        player.scale.set(2);
        player.anchor.x = player.anchor.y = 0.5;
        player.smoothed = false;

        player.animations.add(CONFIG.DEFAULT_ANIMATION_PLAYER, [0, 1, 2, 3, 4, 5], 10, true);
        player.play(CONFIG.DEFAULT_ANIMATION_PLAYER);

        this.players.add(player);
    }
    private assignStartPositionsToPlayers() {
        let positions: number = this.players.length;
        let degreesOffset: number = 360 / positions;
        let angle: number;
        let player: Player;
        for (let i = 0; i < positions; ++i) {
            angle = i * degreesOffset;
            player = this.players.getChildAt(i) as Player;
            player.body.x = player.startPosition.x = this.arena.x + (this.arena.radius - CONFIG.START_POS_EDGE_OFFSET) * Math.cos(angle * (Math.PI / 180));
            player.body.y = player.startPosition.y = this.arena.y + (this.arena.radius - CONFIG.START_POS_EDGE_OFFSET) * Math.sin(angle * (Math.PI / 180));
        }
    };
    update() {
        this.players.forEachAlive(player => {
            if (!this.arena.contains(player.body.x, player.body.y)) {
                this.playerDied(player);
            }
        }, this);
        let player = <Player>this.players.getChildAt(0);
        if (this.cursors.left.isDown) {
            player.body.velocity.x -= 5;
        }
        else if (this.cursors.right.isDown) {
            player.body.velocity.x += 5;
        }

        if (this.cursors.up.isDown) {
            player.body.velocity.y -= 5;
        }
        else if (this.cursors.down.isDown) {
            player.body.velocity.y += 5;
        }
    }
    playerDied(player: Player) {
        player.kill();
        if (this.players.countLiving() === 1) {
            this.roundEnded();
        }
    }
    roundEnded() {
        let roundSurvivor = this.players.getFirstAlive();
        ++roundSurvivor.points;
        if (this.currentRound >= this.rounds) {
            // TODO: Finish game and redirect to score screen;
            this.showGameResults();
        } else {
            this.nextRound();
        }
    }

    nextRound() {
        ++this.currentRound;
        this.players.callAll("revive", null);
    }
    playersCollideCallback(playerBody1: Phaser.Physics.P2.Body, playerBody2: Phaser.Physics.P2.Body) {
        (<Player>playerBody1.sprite).lastTouchedBy = <Player>playerBody2.sprite;
    }
    private showGameResults() {
        setTimeout(() => {
            this.game.stage.setBackgroundColor(0x2b363a);
            this.graphics.beginFill(CONFIG.GAME_BACKGROUND_COLOR, 0.75);
            let rect = this.graphics.drawRect(0, 0, this.world.width, this.world.height);
            this.game.world.bringToTop(rect);
            let text = this.game.add.text(this.game.world.centerX, 300, "YEA YOU WON", CONFIG.TEXT_OPTIONS);
            text.anchor.set(CONFIG.ANCHOR);
            // TODO: lepiej walnąć czarnoprzeźroczystą tablice z punktami:
            // TODO: lepiej nie usuwać planszy i graczy bo będzie brzydki efekt
        }, 1000);
    }
}
