import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
@suite("Game class")
class Game {
    private game: Game;

    constructor() {

    }
    beforeeach() {
        this.game = new Game();

    }
    @test("returnSth function") returnSth() {

        console.log(this.game.returnSth);
    }
}
