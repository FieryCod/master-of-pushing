import { Player } from "../classes/Player";
import { RoundStartTimer } from "../classes/RoundStartTimer";
import { CONFIG } from "../Config";

const TEMP_ARENA_COLOR: number = 0xadd8e6;

// FIXME: Arena should be responsive
export class Main extends Phaser.State {

  private rounds: number;
  private currentRound: number;
  private players: Phaser.Group;
  private controlledPlayer: Player;
  private cursors: Phaser.CursorKeys;
  private arena: Phaser.Circle;
  private graphics: Phaser.Graphics;
  private winningText: string;
  private roundStartTimer: RoundStartTimer;

  init(rounds: number) {

    this.rounds = rounds || 2;
    this.currentRound = 0;
    this.players = new Phaser.Group(this.game);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.roundStartTimer = new RoundStartTimer(this.game, this.players);
    this.game.time.add(this.roundStartTimer);
  }
  create() {

    this.setupArena();
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
    this.nextRound();
    this.game.world.bringToTop(this.players);
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
    player.anchor.x = player.anchor.y = CONFIG.DEFAULT_ANCHOR;
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

    if (!this.controlledPlayer.locked) {
      if (this.cursors.left.isDown) {
        this.controlledPlayer.body.velocity.x -= 5;
      } else if (this.cursors.right.isDown) {
        this.controlledPlayer.body.velocity.x += 5;
      }

      if (this.cursors.up.isDown) {
        this.controlledPlayer.body.velocity.y -= 5;
      } else if (this.cursors.down.isDown) {
        this.controlledPlayer.body.velocity.y += 5;
      }
    }
  }
  private playerDied(player: Player) {

    player.kill();
    if (this.players.countLiving() === 1) {
      this.roundEnded();
    }
  }
  private roundEnded() {

    let roundSurvivor = this.players.getFirstAlive();
    ++roundSurvivor.points;
    if (this.currentRound >= this.rounds) {
      // TODO: Finish game and redirect to score screen;
      this.showGameResults();
    } else {
      this.nextRound();
    }
  }
  private killAll() {

    this.players.forEachAlive(player => player.kill(), this);
  }
  private nextRound() {

    ++this.currentRound;
    this.roundStartTimer.startRoundCountdown();

    if (this.players.countDead()) {
      this.players.callAll("revive", null);
    }
  }
  private playersCollideCallback(

    playerBody1: Phaser.Physics.P2.Body,
    playerBody2: Phaser.Physics.P2.Body) {
    (<Player>playerBody1.sprite).lastTouchedBy = <Player>playerBody2.sprite;
  }
  private showGameResults() {

    this.killAll();
    let delayTween = 1000;
    let duration = 3000;
    let rect = this.graphics.drawRect(0, 0, this.world.width, this.world.height);
    let text = this.game.add.text(this.game.world.centerX, 300, this.winningText, CONFIG.TEXT_OPTIONS);
    text.anchor.set(CONFIG.DEFAULT_ANCHOR);
    text.alpha = 0;
    rect.alpha = 0;
    this.game.add.tween(text).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delayTween, 0, false);
    this.game.add.tween(rect).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delayTween, 0, false);
    this.game.world.bringToTop(text);
  }
}
