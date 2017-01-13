import { Player } from "../classes/Player";

import {CONFIG} from "../Config";
const TEMP_ARENA_COLOR: number = 0xadd8e6;

export class Main extends Phaser.State {
    private rounds: number;
    private currentRound: number;
    private players: Phaser.Group;
    private cursors: Phaser.CursorKeys;
    private arena: Phaser.Circle;
    init(rounds: number) {
        this.rounds = rounds || 3;
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
    setupArena() {
        this.arena = new Phaser.Circle(450, 450, 900);
        // TODO: Replace temp graphic for arena
        let graphics = this.game.add.graphics(this.arena.x, this.arena.y);
        graphics.beginFill(TEMP_ARENA_COLOR, 1);
        graphics.drawCircle(0, 0, this.arena.diameter);
        // --
    }
    initPhysics() {
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
    addPlayer(name: string) {

        let player = new Player(this.game, this.arena.x, this.arena.y, CONFIG.PLAYER_SPRITESHEET);

        player.name = name;
        player.scale.set(2);
        player.anchor.x = player.anchor.y = 0.5;
        player.smoothed = false;

        player.animations.add(CONFIG.DEFAULT_ANIMATION_PLAYER, [0, 1, 2, 3, 4, 5], 10, true);
        player.play(CONFIG.DEFAULT_ANIMATION_PLAYER);

        this.players.add(player);
    }
    assignStartPositionsToPlayers () {
        let positions: number = this.players.length;
        let degreesOffset: number = 360 / positions;
        let angle: number;
        let player: Player;
        for (let i = 0; i < positions; ++i) {
            angle = i * degreesOffset;
            player = this.players.getChildAt(i) as Player;
            player.body.x = player.startingPosition.x = this.arena.x + (this.arena.radius - CONFIG.START_POS_EDGE_OFFSET) * Math.cos(angle * (Math.PI / 180));
            player.body.y = player.startingPosition.y = this.arena.y + (this.arena.radius - CONFIG.START_POS_EDGE_OFFSET) * Math.sin(angle * (Math.PI / 180));
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
}
