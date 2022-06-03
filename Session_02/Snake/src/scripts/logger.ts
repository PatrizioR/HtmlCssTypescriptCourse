export enum Level {
  Debug,
  Info,
  Warning,
  Error,
}
export class Logger {
  public static enabled: boolean = true;
  public static level: Level = Level.Info;
  private constructor() {}

  public static debug(msg: any) {
    if (!this.enabled || this.level > Level.Debug) {
      return;
    }

    console.log(msg);
  }

  public static log(msg: any) {
    if (!this.enabled || this.level > Level.Info) {
      return;
    }

    console.log(msg);
  }

  public static warn(msg: any) {
    if (!this.enabled || this.level > Level.Warning) {
      return;
    }

    console.warn(msg);
  }

  public static error(msg: any) {
    console.error(msg);
  }
}
