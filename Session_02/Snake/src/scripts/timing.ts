import { Logger } from "./logger";

export class Timing {
  private constructor() {}

  public static async wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
