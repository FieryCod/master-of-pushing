export class Main extends Phaser.State {
    private ship: any;
    private cursors: Phaser.CursorKeys;
    create() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.load.spritesheet('ship', 'assets/sprites/humstar.png', 32, 32);
        this.game.load.image("cat", "assets/cat.png");
        this.game.load.image("lol", "assets/lol.jpg");
        this.game.add.sprite(0, 0, "bradberry");
        this.ship = this.game.add.sprite(0, 0, 'ship');
        this.ship.scale.set(2);
        this.ship.smoothed = false;
        this.ship.animations.add('fly', [0, 1, 2, 3, 4, 5], 10, true);
        this.ship.play('fly');
        this.initPhysics();
    }
    initPhysics() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.9;
        this.game.physics.p2.enable(this.ship, false);
        let playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.ship.body.setCircle(28);
        this.ship.body.setCollisionGroup(playerCollisionGroup);
    }
    update() {
        this.ship.body.setZeroVelocity();
        if (this.cursors.left.isDown) {
            this.ship.body.moveLeft(200);
        }
        else if (this.cursors.right.isDown) {
            this.ship.body.moveRight(200);
        }

        if (this.cursors.up.isDown) {
            this.ship.body.moveUp(200);
        }
        else if (this.cursors.down.isDown) {
            this.ship.body.moveDown(200);
        }
    }
}
