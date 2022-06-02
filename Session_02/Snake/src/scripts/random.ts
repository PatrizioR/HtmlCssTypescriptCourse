export class Random {
  private constructor() {}

  public static next(max: number = 100, min: number = 0) {
    let rand = Math.random() * (max - min + 1);
    return parseInt(rand.toString()) - min;
  }
}
