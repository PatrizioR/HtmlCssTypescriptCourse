import { Random } from "./random";

export class Position {
  public x: number;
  public y: number;

  public constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }

  public intefere(position?: Position): boolean {
    if (position == null) {
      return false;
    }
    return this.x === position.x && this.y === position.y;
  }

  public static createRandom(border: Position, includeBorder: boolean = true) {
    return new Position(
      Random.next(border.x - (includeBorder ? 0 : 1)),
      Random.next(border.y - (includeBorder ? 0 : 1))
    );
  }

  public toString(): string {
    return `[${this.x}|${this.y}]`;
  }
}
