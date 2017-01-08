import { Player } from "../classes/Player";

export class Main extends Phaser.State {
    private START_POS_EDGE_OFFSET: number = 50;
    private players: Array<Player> = [];
    private cursors: Phaser.CursorKeys;
    private arena: Phaser.Circle;
    create() {
        this.arena = new Phaser.Circle(450, 450, 900);
        let graphics = this.game.add.graphics(this.arena.x, this.arena.y);
        graphics.beginFill(0xadd8e6, 1);
        graphics.drawCircle(0, 0, this.arena.diameter);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.load.spritesheet("ship", "assets/sprites/humstar.png", 32, 32);
        this.addPlayer("Player1");
        this.addPlayer("Player2");
        this.addPlayer("Player3");
        this.addPlayer("Player4");
        this.addPlayer("Player5");
        this.addPlayer("Player6");
        this.initPhysics();
        this.placePlayersAtStartingPos();
    }
    initPhysics() {
        let playerCollisionGroups = [];
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.players.forEach(player => {
            this.game.physics.p2.enable(player, false);
            let playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
            player.body.setCircle(28);
            player.body.setCollisionGroup(playerCollisionGroup);
            playerCollisionGroups.push(playerCollisionGroup);
        });

        this.players.forEach(p => {
            p.body.collides(playerCollisionGroups);
        });
    }
    addPlayer(name: string) {
        let player = new Player(this.game, this.arena.x, this.arena.y, "ship");
        player.name = name;
        player.scale.set(2);
        player.anchor.x = player.anchor.y = 0.5;
        player.smoothed = false;
        player.animations.add("fly", [0, 1, 2, 3, 4, 5], 10, true);
        player.play("fly");
        this.players.push(player);
        this.game.add.existing(player);
    }
    placePlayersAtStartingPos() {
        let positions = this.players.length;
        let degreesOffset = 360 / positions;
        let angle;
        for (let i = 0; i < positions; i++) {
            angle = i * degreesOffset;
            this.players[i].body.x = this.players[i].startingPosition.x = this.arena.x + (this.arena.radius - this.START_POS_EDGE_OFFSET) * Math.cos(angle * (Math.PI / 180));
            this.players[i].body.y = this.players[i].startingPosition.y = this.arena.y + (this.arena.radius - this.START_POS_EDGE_OFFSET) * Math.sin(angle * (Math.PI / 180));
        }
    };
    update() {
        this.players.forEach(player => {
            if (!this.arena.contains(player.centerX, player.centerY)) {
                this.playerDied(player);
            }
        });

        if (this.cursors.left.isDown) {
            this.players[0].body.velocity.x -= 5;
        }
        else if (this.cursors.right.isDown) {
            this.players[0].body.velocity.x += 5;
        }

        if (this.cursors.up.isDown) {
            this.players[0].body.velocity.y -= 5;
        }
        else if (this.cursors.down.isDown) {
            this.players[0].body.velocity.y += 5;
        }
    }
    playerDied(player) {
        console.log(player.name + " died");
        player.body.setZeroVelocity();
        player.body.x = player.startingPosition.x || this.arena.x;
        player.body.y = player.startingPosition.y || this.arena.y;
    }
}
