import { Position } from "./position";

export class Food {
  public position: Position;

  /**
   * Initiate food at a certain position
   */
  constructor(position: Position) {
    this.position = position;
  }

  public canEat(eaterPosition: Position) {
    return this.position.intefere(eaterPosition);
  }
}
