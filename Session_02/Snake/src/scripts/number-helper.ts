export class NumberHelper {
  public static toIntOrDefault(input: any, defaultValue: number = null) {
    if (input == null || input === "") {
      return defaultValue;
    }

    let parsedValue = parseInt(input);

    if (parsedValue === NaN) {
      return defaultValue;
    }

    return parsedValue;
  }
}
