export class Logger {
  public static enabled: boolean = true;
  private constructor() {}
  public static log(msg: any) {
    if (!this.enabled) {
      return;
    }

    console.log(msg);
  }
}
