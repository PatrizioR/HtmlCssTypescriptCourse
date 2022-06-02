import { Direction, GameStatus } from "./enums";
import { Food } from "./food";
import { Logger } from "./logger";
import { Position } from "./position";
import { Random } from "./random";
import { Snake } from "./snake";
import { Timing } from "./timing";

export class Board {
  public border: Position;
  public snake: Snake;
  public food: Food;
  public speed: number;
  public status: GameStatus = GameStatus.Stopped;
  /**
   * Initiate board
   */
  constructor(border: Position = new Position(60, 30), speed: number = 3) {
    this.border = border;
    this.snake = new Snake(
      Position.createRandom(this.border),
      2,
      Random.next(5) as Direction
    );
    this.spawnFood();
    this.speed = speed;
  }

  public spawnFood() {
    do {
      this.food = new Food(Position.createRandom(this.border));
    } while (this.snake.intefere(this.food.position));

    Logger.log(`Food spawn at ${this.food.position.toString()}`);
  }

  public start() {
    this.status = GameStatus.Started;
    Logger.log("Game started");
    this.tick();
  }

  public pause() {
    this.status = GameStatus.Paused;
    Logger.log("Game paused");
  }

  public stop() {
    this.status = GameStatus.Stopped;
    Logger.log("Game stopped");
  }

  public async tick() {
    while (this.status !== GameStatus.Stopped) {
      this.snake.move(this.border);
      if (this.snake.tryEatFood(this.food)) {
        // respawn food
        this.spawnFood();
      }
      if (this.snake.isSelfEating()) {
        // lost
        Logger.log("Game lost");
        this.stop();
        return;
      }
      await Timing.wait(1000 / this.speed);
    }
  }
}
