import { Board } from "./board";
import { GameStatus } from "./enums";
import { Logger } from "./logger";
import { NumberHelper } from "./number-helper";
import { Position } from "./position";

document.addEventListener("DOMContentLoaded", () => {
  // Handler when the DOM is fully loaded
  Logger.log("DOM Content ready, initialize...");
  let curBoard: Board = null;
  (window as any).start = () => {
    let setWidth: number = NumberHelper.toIntOrDefault(
      (document.getElementById("board-width") as any)?.value
    );
    let setHeight: number = NumberHelper.toIntOrDefault(
      (document.getElementById("board-height") as any)?.value
    );
    let snakeLength = NumberHelper.toIntOrDefault(
      (document.getElementById("board-snake-length") as any)?.value
    );
    let snakeSpeed = NumberHelper.toIntOrDefault(
      (document.getElementById("board-snake-speed") as any)?.value
    );
    let border: Position = null;
    if (setWidth != null && setHeight != null) {
      border = new Position(setWidth, setHeight);
    }
    var canvas: any = document.getElementById("board-canvas");
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    (window as any).board = curBoard = new Board(
      ctx,
      border,
      snakeLength,
      snakeSpeed
    );

    curBoard.start();
    HtmlToJavascript.disableAllButtons();
    HtmlToJavascript.enablePauseButton();
    HtmlToJavascript.enableStopButton();

    let lastKey: string = null;
    HtmlToJavascript.initializeKeyHook((e) => {
      // we need to act for the keys
      if (e.key === lastKey) {
        return;
      }
      lastKey = e.key;

      switch (e.key) {
        case "w":
          curBoard.moveSnakeUp();
          break;
        case "s":
          curBoard.moveSnakeDown();
          break;
        case "a":
          curBoard.moveSnakeLeft();
          break;
        case "d":
          curBoard.moveSnakeRight();
          break;
        default:
          Logger.log(`Key ${e.key} not supported`);
      }
    });
  };

  (window as any).pause = () => {
    if (!curBoard) {
      return;
    }

    curBoard.pause();
  };

  (window as any).stop = () => {
    if (!curBoard) {
      return;
    }

    curBoard.stop();
    HtmlToJavascript.disableAllButtons();
    HtmlToJavascript.enableStartButton();
  };

  Logger.log("Initialize done.");

  (window as any).start();
});

class HtmlToJavascript {
  public static disableAllButtons(): void {
    let buttonsStatus = document.querySelectorAll(".button-status") as any;
    for (let i = 0; i < buttonsStatus.length; i++) {
      buttonsStatus[i].disabled = true;
    }
  }

  public static enableStartButton(): void {
    (document.querySelector("#board-start") as any).disabled = false;
  }

  public static enablePauseButton(): void {
    (document.querySelector("#board-pause") as any).disabled = false;
  }

  public static enableStopButton(): void {
    (document.querySelector("#board-stop") as any).disabled = false;
  }

  public static initializeKeyHook(
    onKeyUp: (event: KeyboardEvent) => void
  ): void {
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      (window as any).mozRequestAnimationFrame ||
      (window as any).webkitRequestAnimationFrame ||
      (window as any).msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    window.addEventListener("keyup", onKeyUp, false);
  }
}
