import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import {Game} from "../src/scripts/Game";

@suite("Game class")
class GameTest {
    public game: Game;
    constructor() {
        this.game = new Game();
    }
    @test("Return 5") returnSth() {
        console.log("XDD");
    }
}
