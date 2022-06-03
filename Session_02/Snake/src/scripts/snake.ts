import { Direction } from "./enums";
import { Food } from "./food";
import { Position } from "./position";
import { Logger } from "./logger";

export class Snake {
  public direction: Direction;
  public length: number;
  public head: Position;
  public body: Position[];
  public tail?: Position;

  /**
   * Create a Snake instance
   */
  constructor(
    initialPosition: Position = new Position(0, 0),
    snakeLength: number = 2,
    direction: Direction = Direction.Left
  ) {
    this.head = initialPosition;
    this.length = Math.max(snakeLength, 2);
    this.direction = direction;
    this.body = [];
    this.tail = null;
  }

  public move(border: Position): Position {
    // move in the direction
    let oldHead = this.head;

    var xMove = 0;
    var yMove = 0;
    switch (this.direction) {
      case Direction.Up:
        yMove = -1;
        break;
      case Direction.Down:
        yMove = 1;
        break;
      case Direction.Left:
        xMove = -1;
        break;
      case Direction.Right:
        xMove = 1;
        break;
      default:
        alert(`Unknown direction ${this.direction}`);
        break;
    }

    let newHeadPosition = new Position(
      (border.x + (oldHead.x + xMove)) % border.x,
      (border.y + (oldHead.y + yMove)) % border.y
    );

    Logger.debug(
      `Move snake from ${oldHead.toString()} to ${newHeadPosition.toString()}`
    );

    this.head = newHeadPosition;
    this.body.unshift(oldHead);
    if (this.body.length > this.length - 2) {
      // remove element from body and set it as tail
      this.tail = this.body.splice(this.body.length - 1, 1)[0];
    }

    return this.head;
  }

  public intefere(element: Position) {
    return (
      this.head.intefere(element) ||
      this.body.some((item) => item.intefere(element)) ||
      this.tail?.intefere(element)
    );
  }

  public isSelfEating(): boolean {
    return (
      this.body.some(
        (item) => item.intefere(this.head) || item.intefere(this.tail)
      ) || this.head.intefere(this.tail)
    );
  }

  public tryEatFood(food: Food): boolean {
    if (this.intefere(food.position)) {
      this.length++;
      return true;
    }
    return false;
  }
}
