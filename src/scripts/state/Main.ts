import { RoundStartTimer } from "../classes/RoundStartTimer";
import { GameTimer } from "../classes/GameTimer";
import { Player } from "../classes/Player";
import { Arena } from "../classes/Arena";
import { WeaponManager } from "../classes/Weapons/WeaponManager";
import { CONFIG } from "../Config";

const TEMP_ARENA_COLOR: number = 0xadd8e6;

// FIXME: Arena should be responsive
export class Main extends Phaser.State {
    private AirConsole: AirConsole;
    private rounds: number;
    private currentRound: number;
    private players: Phaser.Group;
    private controlledPlayer: Player;
    private cursors: Phaser.CursorKeys;
    private arena: Arena;
    private winningText: string;
    private roundStartTimer: RoundStartTimer;
    private gameTimer: GameTimer;
    private space: Phaser.Key;
    private weaponManager: WeaponManager;

    public init(rounds: number) {
        this.rounds = rounds || 2;
        this.currentRound = 0;
        this.players = new Phaser.Group(this.game);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.arena = new Arena(this.game, this.world.centerX, this.world.centerY, this.world.height - 100);
        this.gameTimer = new GameTimer(this.game, this.arena, this.world.centerX, 35);
        this.roundStartTimer = new RoundStartTimer(this.game, this.players);
        this.game.time.add(this.roundStartTimer);
        this.game.time.add(this.gameTimer);
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.weaponManager = new WeaponManager(this.game);
        this.roundStartTimer.onRoundStart.add(this.gameTimer.start, this.gameTimer);
    }
    public create() {
        this.addPlayer("Player1");
        this.addPlayer("Player2");
        this.addPlayer("Player3");
        this.addPlayer("Player4");
        this.addPlayer("Player5");
        this.addPlayer("Player6");
        this.controlledPlayer = <Player>this.players.getChildAt(0);
        this.initPhysics();
        this.assignStartPositionsToPlayers();
        this.players.callAll("postionAtStart", null);
        this.roundStartTimer.start();
        this.roundStartTimer.startRoundCountdown();
        // TODO: arena is drawn second time here with reset method
        // this.nextRound();

        this.game.world.bringToTop(this.players);
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
        let player = new Player(this.game, this.arena.x, this.arena.y, name);
        player.events.onKilled.add(this.checkIfRoundEnded, this, 0, player);
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
            player.body.x = player.startPosition.x = this.arena.x + (this.arena.collision.radius - CONFIG.START_POS_EDGE_OFFSET) * Math.cos(angle * (Math.PI / 180));
            player.body.y = player.startPosition.y = this.arena.y + (this.arena.collision.radius - CONFIG.START_POS_EDGE_OFFSET) * Math.sin(angle * (Math.PI / 180));
        }
    };
    public update() {
        this.players.forEachAlive(player => {
            if (!player.fellOffArena && !this.arena.collision.contains(player.body.x, player.body.y)) {
                player.kill();
            }
        }, this);
        if (this.space.isDown) {
            this.weaponManager.use(this.controlledPlayer);
        }
        if (!this.controlledPlayer.locked) {
            if (this.cursors.left.isDown) {
                this.controlledPlayer.body.velocity.x -= 5;
                this.controlledPlayer.body.angle = 90;
            } else if (this.cursors.right.isDown) {
                this.controlledPlayer.body.velocity.x += 5;
                this.controlledPlayer.body.angle = -90;
            }

            if (this.cursors.up.isDown) {
                this.controlledPlayer.body.velocity.y -= 5;
                this.controlledPlayer.body.angle = 180;
            } else if (this.cursors.down.isDown) {
                this.controlledPlayer.body.velocity.y += 5;
                this.controlledPlayer.body.angle = 0;
            }
        }
    }
    private checkIfRoundEnded(player: Player) {
        if (this.players.countLiving() <= 1) {
            this.roundEnded();
        }
    }
    private roundEnded() {
        let roundSurvivor = this.players.getFirstAlive();
        if (roundSurvivor) {
            ++roundSurvivor.points;
        }
        if (this.currentRound >= this.rounds) {
            // TODO: Finish game and redirect to score screen;
            this.showGameResults();
        } else {
            this.nextRound();
        }
    }
    private killAll() {
        this.players.callAll("kill", null);
    }
    private nextRound() {
        ++this.currentRound;
        this.arena.reset();
        this.gameTimer.reset();
        this.roundStartTimer.startRoundCountdown();
        if (this.players.countDead()) {
            this.players.callAll("revive", null);
        }
    }
    private playersCollideCallback(playerBody1: Phaser.Physics.P2.Body, playerBody2: Phaser.Physics.P2.Body) {
        (<Player>playerBody1.sprite).lastTouchedBy = <Player>playerBody2.sprite;
    }
    private showGameResults() {
    }
}
