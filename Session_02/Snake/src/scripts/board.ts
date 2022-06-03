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
  public ctx: CanvasRenderingContext2D;
  public scale: number = 10;
  /**
   * Initiate board
   */
  constructor(
    ctx: CanvasRenderingContext2D,
    border?: Position,
    snakeLength?: number,
    speed?: number
  ) {
    this.ctx = ctx;
    this.border = border ?? new Position(60, 30);
    this.snake = new Snake(
      Position.createRandom(this.border),
      snakeLength ?? 10,
      Random.next(3) as Direction
    );
    this.spawnFood();
    this.speed = speed ?? 10;
  }

  public spawnFood() {
    do {
      this.food = new Food(Position.createRandom(this.border, false));
    } while (this.snake.intefere(this.food.position));

    Logger.log(`Food spawn at ${this.food.position.toString()}`);
  }

  public start() {
    this.status = GameStatus.Started;
    Logger.log("Game started");
    this.tick();
  }

  public pause() {
    if (this.status === GameStatus.Started) {
      this.status = GameStatus.Paused;
      Logger.log("Game paused");
    } else if (this.status === GameStatus.Paused) {
      this.status = GameStatus.Started;
      Logger.log("Game continued");
    }
  }

  public stop() {
    this.status = GameStatus.Stopped;
    Logger.log("Game stopped");
  }

  public async tick() {
    while (this.status !== GameStatus.Stopped) {
      if (this.status === GameStatus.Started) {
        if (this.snake.isSelfEating()) {
          // lost
          Logger.log("Game lost");
          this.stop();
          return;
        }
        this.snake.move(this.border);
        if (this.snake.tryEatFood(this.food)) {
          // respawn food
          this.spawnFood();
        }
      }
      this.draw(this.ctx);
      await Timing.wait(1000.0 / this.speed);
    }
  }

  public moveSnake(direction: Direction) {
    if (this.snake == null) {
      Logger.log("Snake can't be moved, not initialized");
      return;
    }

    if (this.snake.direction === direction) {
      Logger.debug("Snake already move in this direction");
      return;
    }

    if (
      (this.snake.direction === Direction.Up && direction === Direction.Down) ||
      (this.snake.direction === Direction.Down && direction === Direction.Up) ||
      (this.snake.direction === Direction.Left &&
        direction === Direction.Right) ||
      (this.snake.direction === Direction.Right && direction === Direction.Left)
    ) {
      Logger.log("Snake can't be moved to opposite direction");
      return;
    }

    this.snake.direction = direction ?? Direction.Left;
    Logger.debug(`Snakes direction changed to ${direction}`);
  }

  public moveSnakeUp() {
    this.moveSnake(Direction.Up);
  }

  public moveSnakeDown() {
    this.moveSnake(Direction.Down);
  }

  public moveSnakeLeft() {
    this.moveSnake(Direction.Left);
  }

  public moveSnakeRight() {
    this.moveSnake(Direction.Right);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (ctx == null) {
      Logger.log("Can't draw, canvas is not set");
      return;
    }
    // clear canvas first
    this.canvasClear();

    // draw border
    this.canvasBorder();

    // draw food
    this.canvasFood();

    // draw snake
    this.canvasSnake();
  }

  private canvasClear() {
    this.ctx.clearRect(
      0,
      0,
      this.border.x * this.scale,
      this.border.y * this.scale
    );
  }

  private canvasBorder() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.border.x * this.scale, 0);
    this.ctx.lineTo(this.border.x * this.scale, this.border.y * this.scale);
    this.ctx.lineTo(0, this.border.y * this.scale);
    this.ctx.lineTo(0, 0);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private canvasFood() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(
      this.food.position.x * this.scale,
      this.food.position.y * this.scale,
      this.scale,
      this.scale
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private canvasDrawSnakePart(position: Position, color: string) {
    if (!position) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.fillRect(
      position.x * this.scale,
      position.y * this.scale,
      this.scale,
      this.scale
    );
    this.ctx.closePath();
  }

  private canvasSnake() {
    this.canvasDrawSnakePart(this.snake.head, "red");
    if (this.snake.body?.length > 0) {
      for (let bodyItem of this.snake.body) {
        this.canvasDrawSnakePart(bodyItem, "blue");
      }
    }

    this.canvasDrawSnakePart(this.snake.tail, "black");
  }
}
