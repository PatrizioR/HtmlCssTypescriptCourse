/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/board.ts":
/*!******************************!*\
  !*** ./src/scripts/board.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Board = void 0;
var enums_1 = __webpack_require__(/*! ./enums */ "./src/scripts/enums.ts");
var food_1 = __webpack_require__(/*! ./food */ "./src/scripts/food.ts");
var logger_1 = __webpack_require__(/*! ./logger */ "./src/scripts/logger.ts");
var position_1 = __webpack_require__(/*! ./position */ "./src/scripts/position.ts");
var random_1 = __webpack_require__(/*! ./random */ "./src/scripts/random.ts");
var snake_1 = __webpack_require__(/*! ./snake */ "./src/scripts/snake.ts");
var timing_1 = __webpack_require__(/*! ./timing */ "./src/scripts/timing.ts");
var Board = (function () {
    function Board(ctx, border, snakeLength, speed) {
        this.status = enums_1.GameStatus.Stopped;
        this.scale = 10;
        this.ctx = ctx;
        this.border = border !== null && border !== void 0 ? border : new position_1.Position(60, 30);
        this.snake = new snake_1.Snake(position_1.Position.createRandom(this.border), snakeLength !== null && snakeLength !== void 0 ? snakeLength : 10, random_1.Random.next(3));
        this.spawnFood();
        this.speed = speed !== null && speed !== void 0 ? speed : 10;
    }
    Board.prototype.spawnFood = function () {
        do {
            this.food = new food_1.Food(position_1.Position.createRandom(this.border, false));
        } while (this.snake.intefere(this.food.position));
        logger_1.Logger.log("Food spawn at ".concat(this.food.position.toString()));
    };
    Board.prototype.start = function () {
        this.status = enums_1.GameStatus.Started;
        logger_1.Logger.log("Game started");
        this.tick();
    };
    Board.prototype.pause = function () {
        if (this.status === enums_1.GameStatus.Started) {
            this.status = enums_1.GameStatus.Paused;
            logger_1.Logger.log("Game paused");
        }
        else if (this.status === enums_1.GameStatus.Paused) {
            this.status = enums_1.GameStatus.Started;
            logger_1.Logger.log("Game continued");
        }
    };
    Board.prototype.stop = function () {
        this.status = enums_1.GameStatus.Stopped;
        logger_1.Logger.log("Game stopped");
    };
    Board.prototype.tick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.status !== enums_1.GameStatus.Stopped)) return [3, 2];
                        if (this.status === enums_1.GameStatus.Started) {
                            if (this.snake.isSelfEating()) {
                                logger_1.Logger.log("Game lost");
                                this.stop();
                                return [2];
                            }
                            this.snake.move(this.border);
                            if (this.snake.tryEatFood(this.food)) {
                                this.spawnFood();
                            }
                        }
                        this.draw(this.ctx);
                        return [4, timing_1.Timing.wait(1000.0 / this.speed)];
                    case 1:
                        _a.sent();
                        return [3, 0];
                    case 2: return [2];
                }
            });
        });
    };
    Board.prototype.moveSnake = function (direction) {
        if (this.snake == null) {
            logger_1.Logger.log("Snake can't be moved, not initialized");
            return;
        }
        if (this.snake.direction === direction) {
            logger_1.Logger.debug("Snake already move in this direction");
            return;
        }
        if ((this.snake.direction === enums_1.Direction.Up && direction === enums_1.Direction.Down) ||
            (this.snake.direction === enums_1.Direction.Down && direction === enums_1.Direction.Up) ||
            (this.snake.direction === enums_1.Direction.Left &&
                direction === enums_1.Direction.Right) ||
            (this.snake.direction === enums_1.Direction.Right && direction === enums_1.Direction.Left)) {
            logger_1.Logger.log("Snake can't be moved to opposite direction");
            return;
        }
        this.snake.direction = direction !== null && direction !== void 0 ? direction : enums_1.Direction.Left;
        logger_1.Logger.debug("Snakes direction changed to ".concat(direction));
    };
    Board.prototype.moveSnakeUp = function () {
        this.moveSnake(enums_1.Direction.Up);
    };
    Board.prototype.moveSnakeDown = function () {
        this.moveSnake(enums_1.Direction.Down);
    };
    Board.prototype.moveSnakeLeft = function () {
        this.moveSnake(enums_1.Direction.Left);
    };
    Board.prototype.moveSnakeRight = function () {
        this.moveSnake(enums_1.Direction.Right);
    };
    Board.prototype.draw = function (ctx) {
        if (ctx == null) {
            logger_1.Logger.log("Can't draw, canvas is not set");
            return;
        }
        this.canvasClear();
        this.canvasBorder();
        this.canvasFood();
        this.canvasSnake();
    };
    Board.prototype.canvasClear = function () {
        this.ctx.clearRect(0, 0, this.border.x * this.scale, this.border.y * this.scale);
    };
    Board.prototype.canvasBorder = function () {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.border.x * this.scale, 0);
        this.ctx.lineTo(this.border.x * this.scale, this.border.y * this.scale);
        this.ctx.lineTo(0, this.border.y * this.scale);
        this.ctx.lineTo(0, 0);
        this.ctx.stroke();
        this.ctx.closePath();
    };
    Board.prototype.canvasFood = function () {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.food.position.x * this.scale, this.food.position.y * this.scale, this.scale, this.scale);
        this.ctx.stroke();
        this.ctx.closePath();
    };
    Board.prototype.canvasDrawSnakePart = function (position, color) {
        if (!position) {
            return;
        }
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(position.x * this.scale, position.y * this.scale, this.scale, this.scale);
        this.ctx.closePath();
    };
    Board.prototype.canvasSnake = function () {
        var _a;
        this.canvasDrawSnakePart(this.snake.head, "red");
        if (((_a = this.snake.body) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            for (var _i = 0, _b = this.snake.body; _i < _b.length; _i++) {
                var bodyItem = _b[_i];
                this.canvasDrawSnakePart(bodyItem, "blue");
            }
        }
        this.canvasDrawSnakePart(this.snake.tail, "black");
    };
    return Board;
}());
exports.Board = Board;


/***/ }),

/***/ "./src/scripts/enums.ts":
/*!******************************!*\
  !*** ./src/scripts/enums.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameStatus = exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Down"] = 3] = "Down";
})(Direction = exports.Direction || (exports.Direction = {}));
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["Stopped"] = 0] = "Stopped";
    GameStatus[GameStatus["Started"] = 1] = "Started";
    GameStatus[GameStatus["Paused"] = 2] = "Paused";
})(GameStatus = exports.GameStatus || (exports.GameStatus = {}));


/***/ }),

/***/ "./src/scripts/food.ts":
/*!*****************************!*\
  !*** ./src/scripts/food.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Food = void 0;
var Food = (function () {
    function Food(position) {
        this.position = position;
    }
    Food.prototype.canEat = function (eaterPosition) {
        return this.position.intefere(eaterPosition);
    };
    return Food;
}());
exports.Food = Food;


/***/ }),

/***/ "./src/scripts/logger.ts":
/*!*******************************!*\
  !*** ./src/scripts/logger.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = exports.Level = void 0;
var Level;
(function (Level) {
    Level[Level["Debug"] = 0] = "Debug";
    Level[Level["Info"] = 1] = "Info";
    Level[Level["Warning"] = 2] = "Warning";
    Level[Level["Error"] = 3] = "Error";
})(Level = exports.Level || (exports.Level = {}));
var Logger = (function () {
    function Logger() {
    }
    Logger.debug = function (msg) {
        if (!this.enabled || this.level > Level.Debug) {
            return;
        }
        console.log(msg);
    };
    Logger.log = function (msg) {
        if (!this.enabled || this.level > Level.Info) {
            return;
        }
        console.log(msg);
    };
    Logger.warn = function (msg) {
        if (!this.enabled || this.level > Level.Warning) {
            return;
        }
        console.warn(msg);
    };
    Logger.error = function (msg) {
        console.error(msg);
    };
    Logger.enabled = true;
    Logger.level = Level.Info;
    return Logger;
}());
exports.Logger = Logger;


/***/ }),

/***/ "./src/scripts/number-helper.ts":
/*!**************************************!*\
  !*** ./src/scripts/number-helper.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumberHelper = void 0;
var NumberHelper = (function () {
    function NumberHelper() {
    }
    NumberHelper.toIntOrDefault = function (input, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (input == null || input === "") {
            return defaultValue;
        }
        var parsedValue = parseInt(input);
        if (parsedValue === NaN) {
            return defaultValue;
        }
        return parsedValue;
    };
    return NumberHelper;
}());
exports.NumberHelper = NumberHelper;


/***/ }),

/***/ "./src/scripts/position.ts":
/*!*********************************!*\
  !*** ./src/scripts/position.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Position = void 0;
var random_1 = __webpack_require__(/*! ./random */ "./src/scripts/random.ts");
var Position = (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    Position.prototype.intefere = function (position) {
        if (position == null) {
            return false;
        }
        return this.x === position.x && this.y === position.y;
    };
    Position.createRandom = function (border, includeBorder) {
        if (includeBorder === void 0) { includeBorder = true; }
        return new Position(random_1.Random.next(border.x - (includeBorder ? 0 : 1)), random_1.Random.next(border.y - (includeBorder ? 0 : 1)));
    };
    Position.prototype.toString = function () {
        return "[".concat(this.x, "|").concat(this.y, "]");
    };
    return Position;
}());
exports.Position = Position;


/***/ }),

/***/ "./src/scripts/random.ts":
/*!*******************************!*\
  !*** ./src/scripts/random.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Random = void 0;
var Random = (function () {
    function Random() {
    }
    Random.next = function (max, min) {
        if (max === void 0) { max = 100; }
        if (min === void 0) { min = 0; }
        var rand = Math.random() * (max - min + 1);
        return parseInt(rand.toString()) - min;
    };
    return Random;
}());
exports.Random = Random;


/***/ }),

/***/ "./src/scripts/snake.ts":
/*!******************************!*\
  !*** ./src/scripts/snake.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Snake = void 0;
var enums_1 = __webpack_require__(/*! ./enums */ "./src/scripts/enums.ts");
var position_1 = __webpack_require__(/*! ./position */ "./src/scripts/position.ts");
var logger_1 = __webpack_require__(/*! ./logger */ "./src/scripts/logger.ts");
var Snake = (function () {
    function Snake(initialPosition, snakeLength, direction) {
        if (initialPosition === void 0) { initialPosition = new position_1.Position(0, 0); }
        if (snakeLength === void 0) { snakeLength = 2; }
        if (direction === void 0) { direction = enums_1.Direction.Left; }
        this.head = initialPosition;
        this.length = Math.max(snakeLength, 2);
        this.direction = direction;
        this.body = [];
        this.tail = null;
    }
    Snake.prototype.move = function (border) {
        var oldHead = this.head;
        var xMove = 0;
        var yMove = 0;
        switch (this.direction) {
            case enums_1.Direction.Up:
                yMove = -1;
                break;
            case enums_1.Direction.Down:
                yMove = 1;
                break;
            case enums_1.Direction.Left:
                xMove = -1;
                break;
            case enums_1.Direction.Right:
                xMove = 1;
                break;
            default:
                alert("Unknown direction ".concat(this.direction));
                break;
        }
        var newHeadPosition = new position_1.Position((border.x + (oldHead.x + xMove)) % border.x, (border.y + (oldHead.y + yMove)) % border.y);
        logger_1.Logger.debug("Move snake from ".concat(oldHead.toString(), " to ").concat(newHeadPosition.toString()));
        this.head = newHeadPosition;
        this.body.unshift(oldHead);
        if (this.body.length > this.length - 2) {
            this.tail = this.body.splice(this.body.length - 1, 1)[0];
        }
        return this.head;
    };
    Snake.prototype.intefere = function (element) {
        var _a;
        return (this.head.intefere(element) ||
            this.body.some(function (item) { return item.intefere(element); }) ||
            ((_a = this.tail) === null || _a === void 0 ? void 0 : _a.intefere(element)));
    };
    Snake.prototype.isSelfEating = function () {
        var _this = this;
        return (this.body.some(function (item) { return item.intefere(_this.head) || item.intefere(_this.tail); }) || this.head.intefere(this.tail));
    };
    Snake.prototype.tryEatFood = function (food) {
        if (this.intefere(food.position)) {
            this.length++;
            return true;
        }
        return false;
    };
    return Snake;
}());
exports.Snake = Snake;


/***/ }),

/***/ "./src/scripts/timing.ts":
/*!*******************************!*\
  !*** ./src/scripts/timing.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Timing = void 0;
var Timing = (function () {
    function Timing() {
    }
    Timing.wait = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
            });
        });
    };
    return Timing;
}());
exports.Timing = Timing;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var board_1 = __webpack_require__(/*! ./board */ "./src/scripts/board.ts");
var logger_1 = __webpack_require__(/*! ./logger */ "./src/scripts/logger.ts");
var number_helper_1 = __webpack_require__(/*! ./number-helper */ "./src/scripts/number-helper.ts");
var position_1 = __webpack_require__(/*! ./position */ "./src/scripts/position.ts");
document.addEventListener("DOMContentLoaded", function () {
    logger_1.Logger.log("DOM Content ready, initialize...");
    var curBoard = null;
    window.start = function () {
        var _a, _b, _c, _d;
        var setWidth = number_helper_1.NumberHelper.toIntOrDefault((_a = document.getElementById("board-width")) === null || _a === void 0 ? void 0 : _a.value);
        var setHeight = number_helper_1.NumberHelper.toIntOrDefault((_b = document.getElementById("board-height")) === null || _b === void 0 ? void 0 : _b.value);
        var snakeLength = number_helper_1.NumberHelper.toIntOrDefault((_c = document.getElementById("board-snake-length")) === null || _c === void 0 ? void 0 : _c.value);
        var snakeSpeed = number_helper_1.NumberHelper.toIntOrDefault((_d = document.getElementById("board-snake-speed")) === null || _d === void 0 ? void 0 : _d.value);
        var border = null;
        if (setWidth != null && setHeight != null) {
            border = new position_1.Position(setWidth, setHeight);
        }
        var canvas = document.getElementById("board-canvas");
        var ctx = canvas.getContext("2d");
        window.board = curBoard = new board_1.Board(ctx, border, snakeLength, snakeSpeed);
        curBoard.start();
        HtmlToJavascript.disableAllButtons();
        HtmlToJavascript.enablePauseButton();
        HtmlToJavascript.enableStopButton();
        var lastKey = null;
        HtmlToJavascript.initializeKeyHook(function (e) {
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
                    logger_1.Logger.log("Key ".concat(e.key, " not supported"));
            }
        });
    };
    window.pause = function () {
        if (!curBoard) {
            return;
        }
        curBoard.pause();
    };
    window.stop = function () {
        if (!curBoard) {
            return;
        }
        curBoard.stop();
        HtmlToJavascript.disableAllButtons();
        HtmlToJavascript.enableStartButton();
    };
    logger_1.Logger.log("Initialize done.");
    window.start();
});
var HtmlToJavascript = (function () {
    function HtmlToJavascript() {
    }
    HtmlToJavascript.disableAllButtons = function () {
        var buttonsStatus = document.querySelectorAll(".button-status");
        for (var i = 0; i < buttonsStatus.length; i++) {
            buttonsStatus[i].disabled = true;
        }
    };
    HtmlToJavascript.enableStartButton = function () {
        document.querySelector("#board-start").disabled = false;
    };
    HtmlToJavascript.enablePauseButton = function () {
        document.querySelector("#board-pause").disabled = false;
    };
    HtmlToJavascript.enableStopButton = function () {
        document.querySelector("#board-stop").disabled = false;
    };
    HtmlToJavascript.initializeKeyHook = function (onKeyUp) {
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
        window.addEventListener("keyup", onKeyUp, false);
    };
    return HtmlToJavascript;
}());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkVBQWdEO0FBQ2hELHdFQUE4QjtBQUM5Qiw4RUFBa0M7QUFDbEMsb0ZBQXNDO0FBQ3RDLDhFQUFrQztBQUNsQywyRUFBZ0M7QUFDaEMsOEVBQWtDO0FBRWxDO0lBV0UsZUFDRSxHQUE2QixFQUM3QixNQUFpQixFQUNqQixXQUFvQixFQUNwQixLQUFjO1FBVlQsV0FBTSxHQUFlLGtCQUFVLENBQUMsT0FBTyxDQUFDO1FBRXhDLFVBQUssR0FBVyxFQUFFLENBQUM7UUFVeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLElBQUksbUJBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FDcEIsbUJBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUNsQyxXQUFXLGFBQVgsV0FBVyxjQUFYLFdBQVcsR0FBSSxFQUFFLEVBQ2pCLGVBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFjLENBQzVCLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLHlCQUFTLEdBQWhCO1FBQ0UsR0FBRztZQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsbUJBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2pFLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUVsRCxlQUFNLENBQUMsR0FBRyxDQUFDLHdCQUFpQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLHFCQUFLLEdBQVo7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLGtCQUFVLENBQUMsT0FBTyxDQUFDO1FBQ2pDLGVBQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVNLHFCQUFLLEdBQVo7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssa0JBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxrQkFBVSxDQUFDLE1BQU0sQ0FBQztZQUNoQyxlQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzNCO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLGtCQUFVLENBQUMsTUFBTSxFQUFFO1lBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsa0JBQVUsQ0FBQyxPQUFPLENBQUM7WUFDakMsZUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVNLG9CQUFJLEdBQVg7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLGtCQUFVLENBQUMsT0FBTyxDQUFDO1FBQ2pDLGVBQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVZLG9CQUFJLEdBQWpCOzs7Ozs2QkFDUyxLQUFJLENBQUMsTUFBTSxLQUFLLGtCQUFVLENBQUMsT0FBTzt3QkFDdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLGtCQUFVLENBQUMsT0FBTyxFQUFFOzRCQUN0QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0NBRTdCLGVBQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQ0FDWixXQUFPOzZCQUNSOzRCQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0NBRXBDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs2QkFDbEI7eUJBQ0Y7d0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3BCLFdBQU0sZUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs7d0JBQXRDLFNBQXNDLENBQUM7Ozs7OztLQUUxQztJQUVNLHlCQUFTLEdBQWhCLFVBQWlCLFNBQW9CO1FBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDdEIsZUFBTSxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1lBQ3BELE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3RDLGVBQU0sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztZQUNyRCxPQUFPO1NBQ1I7UUFFRCxJQUNFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssaUJBQVMsQ0FBQyxFQUFFLElBQUksU0FBUyxLQUFLLGlCQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3ZFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssaUJBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxLQUFLLGlCQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3ZFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssaUJBQVMsQ0FBQyxJQUFJO2dCQUN0QyxTQUFTLEtBQUssaUJBQVMsQ0FBQyxLQUFLLENBQUM7WUFDaEMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxpQkFBUyxDQUFDLEtBQUssSUFBSSxTQUFTLEtBQUssaUJBQVMsQ0FBQyxJQUFJLENBQUMsRUFDMUU7WUFDQSxlQUFNLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7WUFDekQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxhQUFULFNBQVMsY0FBVCxTQUFTLEdBQUksaUJBQVMsQ0FBQyxJQUFJLENBQUM7UUFDbkQsZUFBTSxDQUFDLEtBQUssQ0FBQyxzQ0FBK0IsU0FBUyxDQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU0sMkJBQVcsR0FBbEI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVNLDZCQUFhLEdBQXBCO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSw2QkFBYSxHQUFwQjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sOEJBQWMsR0FBckI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLG9CQUFJLEdBQVgsVUFBWSxHQUE2QjtRQUN2QyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDZixlQUFNLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDNUMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBR25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUdwQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFHbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTywyQkFBVyxHQUFuQjtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUNoQixDQUFDLEVBQ0QsQ0FBQyxFQUNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQzNCLENBQUM7SUFDSixDQUFDO0lBRU8sNEJBQVksR0FBcEI7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLDBCQUFVLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDakMsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsS0FBSyxDQUNYLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLG1DQUFtQixHQUEzQixVQUE0QixRQUFrQixFQUFFLEtBQWE7UUFDM0QsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDZixRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ3ZCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDdkIsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsS0FBSyxDQUNYLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTywyQkFBVyxHQUFuQjs7UUFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakQsSUFBSSxXQUFJLENBQUMsS0FBSyxDQUFDLElBQUksMENBQUUsTUFBTSxJQUFHLENBQUMsRUFBRTtZQUMvQixLQUFxQixVQUFlLEVBQWYsU0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQWYsY0FBZSxFQUFmLElBQWUsRUFBRTtnQkFBakMsSUFBSSxRQUFRO2dCQUNmLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDNUM7U0FDRjtRQUVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0gsWUFBQztBQUFELENBQUM7QUF0TVksc0JBQUs7Ozs7Ozs7Ozs7Ozs7O0FDUmxCLElBQVksU0FLWDtBQUxELFdBQVksU0FBUztJQUNuQixxQ0FBRTtJQUNGLDJDQUFLO0lBQ0wseUNBQUk7SUFDSix5Q0FBSTtBQUNOLENBQUMsRUFMVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUtwQjtBQUVELElBQVksVUFJWDtBQUpELFdBQVksVUFBVTtJQUNwQixpREFBTztJQUNQLGlEQUFPO0lBQ1AsK0NBQU07QUFDUixDQUFDLEVBSlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFJckI7Ozs7Ozs7Ozs7Ozs7O0FDVEQ7SUFNRSxjQUFZLFFBQWtCO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFTSxxQkFBTSxHQUFiLFVBQWMsYUFBdUI7UUFDbkMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUM7QUFiWSxvQkFBSTs7Ozs7Ozs7Ozs7Ozs7QUNGakIsSUFBWSxLQUtYO0FBTEQsV0FBWSxLQUFLO0lBQ2YsbUNBQUs7SUFDTCxpQ0FBSTtJQUNKLHVDQUFPO0lBQ1AsbUNBQUs7QUFDUCxDQUFDLEVBTFcsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBS2hCO0FBQ0Q7SUFHRTtJQUF1QixDQUFDO0lBRVYsWUFBSyxHQUFuQixVQUFvQixHQUFRO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUM3QyxPQUFPO1NBQ1I7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFYSxVQUFHLEdBQWpCLFVBQWtCLEdBQVE7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzVDLE9BQU87U0FDUjtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVhLFdBQUksR0FBbEIsVUFBbUIsR0FBUTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDL0MsT0FBTztTQUNSO1FBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRWEsWUFBSyxHQUFuQixVQUFvQixHQUFRO1FBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQTlCYSxjQUFPLEdBQVksSUFBSSxDQUFDO0lBQ3hCLFlBQUssR0FBVSxLQUFLLENBQUMsSUFBSSxDQUFDO0lBOEIxQyxhQUFDO0NBQUE7QUFoQ1ksd0JBQU07Ozs7Ozs7Ozs7Ozs7O0FDTm5CO0lBQUE7SUFjQSxDQUFDO0lBYmUsMkJBQWMsR0FBNUIsVUFBNkIsS0FBVSxFQUFFLFlBQTJCO1FBQTNCLGtEQUEyQjtRQUNsRSxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNqQyxPQUFPLFlBQVksQ0FBQztTQUNyQjtRQUVELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVsQyxJQUFJLFdBQVcsS0FBSyxHQUFHLEVBQUU7WUFDdkIsT0FBTyxZQUFZLENBQUM7U0FDckI7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDO0FBZFksb0NBQVk7Ozs7Ozs7Ozs7Ozs7O0FDQXpCLDhFQUFrQztBQUVsQztJQUlFLGtCQUFtQixDQUFVLEVBQUUsQ0FBVTtRQUN2QyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVNLDJCQUFRLEdBQWYsVUFBZ0IsUUFBbUI7UUFDakMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3BCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVhLHFCQUFZLEdBQTFCLFVBQTJCLE1BQWdCLEVBQUUsYUFBNkI7UUFBN0Isb0RBQTZCO1FBQ3hFLE9BQU8sSUFBSSxRQUFRLENBQ2pCLGVBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMvQyxlQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDaEQsQ0FBQztJQUNKLENBQUM7SUFFTSwyQkFBUSxHQUFmO1FBQ0UsT0FBTyxXQUFJLElBQUksQ0FBQyxDQUFDLGNBQUksSUFBSSxDQUFDLENBQUMsTUFBRyxDQUFDO0lBQ2pDLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQztBQTFCWSw0QkFBUTs7Ozs7Ozs7Ozs7Ozs7QUNGckI7SUFDRTtJQUF1QixDQUFDO0lBRVYsV0FBSSxHQUFsQixVQUFtQixHQUFpQixFQUFFLEdBQWU7UUFBbEMsK0JBQWlCO1FBQUUsNkJBQWU7UUFDbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDekMsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDO0FBUFksd0JBQU07Ozs7Ozs7Ozs7Ozs7O0FDQW5CLDJFQUFvQztBQUVwQyxvRkFBc0M7QUFDdEMsOEVBQWtDO0FBRWxDO0lBVUUsZUFDRSxlQUE4QyxFQUM5QyxXQUF1QixFQUN2QixTQUFxQztRQUZyQyx3REFBZ0MsbUJBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLDZDQUF1QjtRQUN2Qix3Q0FBdUIsaUJBQVMsQ0FBQyxJQUFJO1FBRXJDLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0sb0JBQUksR0FBWCxVQUFZLE1BQWdCO1FBRTFCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFeEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsUUFBUSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3RCLEtBQUssaUJBQVMsQ0FBQyxFQUFFO2dCQUNmLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDWCxNQUFNO1lBQ1IsS0FBSyxpQkFBUyxDQUFDLElBQUk7Z0JBQ2pCLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ1YsTUFBTTtZQUNSLEtBQUssaUJBQVMsQ0FBQyxJQUFJO2dCQUNqQixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsTUFBTTtZQUNSLEtBQUssaUJBQVMsQ0FBQyxLQUFLO2dCQUNsQixLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLE1BQU07WUFDUjtnQkFDRSxLQUFLLENBQUMsNEJBQXFCLElBQUksQ0FBQyxTQUFTLENBQUUsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNO1NBQ1Q7UUFFRCxJQUFJLGVBQWUsR0FBRyxJQUFJLG1CQUFRLENBQ2hDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUMzQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FDNUMsQ0FBQztRQUVGLGVBQU0sQ0FBQyxLQUFLLENBQ1YsMEJBQW1CLE9BQU8sQ0FBQyxRQUFRLEVBQUUsaUJBQU8sZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFFLENBQ3pFLENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRXRDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFTSx3QkFBUSxHQUFmLFVBQWdCLE9BQWlCOztRQUMvQixPQUFPLENBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxJQUFLLFdBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQXRCLENBQXNCLENBQUM7YUFDaEQsVUFBSSxDQUFDLElBQUksMENBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUM3QixDQUFDO0lBQ0osQ0FBQztJQUVNLDRCQUFZLEdBQW5CO1FBQUEsaUJBTUM7UUFMQyxPQUFPLENBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osVUFBQyxJQUFJLElBQUssV0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLEVBQXBELENBQW9ELENBQy9ELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUVNLDBCQUFVLEdBQWpCLFVBQWtCLElBQVU7UUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0gsWUFBQztBQUFELENBQUM7QUF4Rlksc0JBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSGxCO0lBQ0U7SUFBdUIsQ0FBQztJQUVKLFdBQUksR0FBeEIsVUFBeUIsRUFBVTs7O2dCQUNqQyxXQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLGlCQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUF2QixDQUF1QixDQUFDLEVBQUM7OztLQUMxRDtJQUNILGFBQUM7QUFBRCxDQUFDO0FBTlksd0JBQU07Ozs7Ozs7VUNGbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBLDJFQUFnQztBQUVoQyw4RUFBa0M7QUFDbEMsbUdBQStDO0FBQy9DLG9GQUFzQztBQUV0QyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7SUFFNUMsZUFBTSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQy9DLElBQUksUUFBUSxHQUFVLElBQUksQ0FBQztJQUMxQixNQUFjLENBQUMsS0FBSyxHQUFHOztRQUN0QixJQUFJLFFBQVEsR0FBVyw0QkFBWSxDQUFDLGNBQWMsQ0FDaEQsTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBUywwQ0FBRSxLQUFLLENBQ3ZELENBQUM7UUFDRixJQUFJLFNBQVMsR0FBVyw0QkFBWSxDQUFDLGNBQWMsQ0FDakQsTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBUywwQ0FBRSxLQUFLLENBQ3hELENBQUM7UUFDRixJQUFJLFdBQVcsR0FBRyw0QkFBWSxDQUFDLGNBQWMsQ0FDM0MsTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFTLDBDQUFFLEtBQUssQ0FDOUQsQ0FBQztRQUNGLElBQUksVUFBVSxHQUFHLDRCQUFZLENBQUMsY0FBYyxDQUMxQyxNQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQVMsMENBQUUsS0FBSyxDQUM3RCxDQUFDO1FBQ0YsSUFBSSxNQUFNLEdBQWEsSUFBSSxDQUFDO1FBQzVCLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3pDLE1BQU0sR0FBRyxJQUFJLG1CQUFRLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxNQUFNLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRCxJQUFJLEdBQUcsR0FBNkIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzRCxNQUFjLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxJQUFJLGFBQUssQ0FDMUMsR0FBRyxFQUNILE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxDQUNYLENBQUM7UUFFRixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFcEMsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDO1FBQzNCLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLFVBQUMsQ0FBQztZQUVuQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO2dCQUNyQixPQUFPO2FBQ1I7WUFDRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUVoQixRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2IsS0FBSyxHQUFHO29CQUNOLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDdkIsTUFBTTtnQkFDUixLQUFLLEdBQUc7b0JBQ04sUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUN6QixNQUFNO2dCQUNSLEtBQUssR0FBRztvQkFDTixRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3pCLE1BQU07Z0JBQ1IsS0FBSyxHQUFHO29CQUNOLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDMUIsTUFBTTtnQkFDUjtvQkFDRSxlQUFNLENBQUMsR0FBRyxDQUFDLGNBQU8sQ0FBQyxDQUFDLEdBQUcsbUJBQWdCLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUQsTUFBYyxDQUFDLEtBQUssR0FBRztRQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTztTQUNSO1FBRUQsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQztJQUVELE1BQWMsQ0FBQyxJQUFJLEdBQUc7UUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE9BQU87U0FDUjtRQUVELFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBRUYsZUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTlCLE1BQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVIO0lBQUE7SUFnQ0EsQ0FBQztJQS9CZSxrQ0FBaUIsR0FBL0I7UUFDRSxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQVEsQ0FBQztRQUN2RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUNsQztJQUNILENBQUM7SUFFYSxrQ0FBaUIsR0FBL0I7UUFDRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDbkUsQ0FBQztJQUVhLGtDQUFpQixHQUEvQjtRQUNHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNuRSxDQUFDO0lBRWEsaUNBQWdCLEdBQTlCO1FBQ0csUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQVMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ2xFLENBQUM7SUFFYSxrQ0FBaUIsR0FBL0IsVUFDRSxPQUF1QztRQUV2QyxJQUFJLHFCQUFxQixHQUN2QixNQUFNLENBQUMscUJBQXFCO1lBQzNCLE1BQWMsQ0FBQyx3QkFBd0I7WUFDdkMsTUFBYyxDQUFDLDJCQUEyQjtZQUMxQyxNQUFjLENBQUMsdUJBQXVCLENBQUM7UUFDMUMsTUFBTSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO1FBRXJELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbmFrZS8uL3NyYy9zY3JpcHRzL2JvYXJkLnRzIiwid2VicGFjazovL3NuYWtlLy4vc3JjL3NjcmlwdHMvZW51bXMudHMiLCJ3ZWJwYWNrOi8vc25ha2UvLi9zcmMvc2NyaXB0cy9mb29kLnRzIiwid2VicGFjazovL3NuYWtlLy4vc3JjL3NjcmlwdHMvbG9nZ2VyLnRzIiwid2VicGFjazovL3NuYWtlLy4vc3JjL3NjcmlwdHMvbnVtYmVyLWhlbHBlci50cyIsIndlYnBhY2s6Ly9zbmFrZS8uL3NyYy9zY3JpcHRzL3Bvc2l0aW9uLnRzIiwid2VicGFjazovL3NuYWtlLy4vc3JjL3NjcmlwdHMvcmFuZG9tLnRzIiwid2VicGFjazovL3NuYWtlLy4vc3JjL3NjcmlwdHMvc25ha2UudHMiLCJ3ZWJwYWNrOi8vc25ha2UvLi9zcmMvc2NyaXB0cy90aW1pbmcudHMiLCJ3ZWJwYWNrOi8vc25ha2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc25ha2UvLi9zcmMvc2NyaXB0cy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb24sIEdhbWVTdGF0dXMgfSBmcm9tIFwiLi9lbnVtc1wiO1xyXG5pbXBvcnQgeyBGb29kIH0gZnJvbSBcIi4vZm9vZFwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi9sb2dnZXJcIjtcclxuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi9wb3NpdGlvblwiO1xyXG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi9yYW5kb21cIjtcclxuaW1wb3J0IHsgU25ha2UgfSBmcm9tIFwiLi9zbmFrZVwiO1xyXG5pbXBvcnQgeyBUaW1pbmcgfSBmcm9tIFwiLi90aW1pbmdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb2FyZCB7XHJcbiAgcHVibGljIGJvcmRlcjogUG9zaXRpb247XHJcbiAgcHVibGljIHNuYWtlOiBTbmFrZTtcclxuICBwdWJsaWMgZm9vZDogRm9vZDtcclxuICBwdWJsaWMgc3BlZWQ6IG51bWJlcjtcclxuICBwdWJsaWMgc3RhdHVzOiBHYW1lU3RhdHVzID0gR2FtZVN0YXR1cy5TdG9wcGVkO1xyXG4gIHB1YmxpYyBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICBwdWJsaWMgc2NhbGU6IG51bWJlciA9IDEwO1xyXG4gIC8qKlxyXG4gICAqIEluaXRpYXRlIGJvYXJkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICAgIGJvcmRlcj86IFBvc2l0aW9uLFxyXG4gICAgc25ha2VMZW5ndGg/OiBudW1iZXIsXHJcbiAgICBzcGVlZD86IG51bWJlclxyXG4gICkge1xyXG4gICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICB0aGlzLmJvcmRlciA9IGJvcmRlciA/PyBuZXcgUG9zaXRpb24oNjAsIDMwKTtcclxuICAgIHRoaXMuc25ha2UgPSBuZXcgU25ha2UoXHJcbiAgICAgIFBvc2l0aW9uLmNyZWF0ZVJhbmRvbSh0aGlzLmJvcmRlciksXHJcbiAgICAgIHNuYWtlTGVuZ3RoID8/IDEwLFxyXG4gICAgICBSYW5kb20ubmV4dCgzKSBhcyBEaXJlY3Rpb25cclxuICAgICk7XHJcbiAgICB0aGlzLnNwYXduRm9vZCgpO1xyXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkID8/IDEwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNwYXduRm9vZCgpIHtcclxuICAgIGRvIHtcclxuICAgICAgdGhpcy5mb29kID0gbmV3IEZvb2QoUG9zaXRpb24uY3JlYXRlUmFuZG9tKHRoaXMuYm9yZGVyLCBmYWxzZSkpO1xyXG4gICAgfSB3aGlsZSAodGhpcy5zbmFrZS5pbnRlZmVyZSh0aGlzLmZvb2QucG9zaXRpb24pKTtcclxuXHJcbiAgICBMb2dnZXIubG9nKGBGb29kIHNwYXduIGF0ICR7dGhpcy5mb29kLnBvc2l0aW9uLnRvU3RyaW5nKCl9YCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhcnQoKSB7XHJcbiAgICB0aGlzLnN0YXR1cyA9IEdhbWVTdGF0dXMuU3RhcnRlZDtcclxuICAgIExvZ2dlci5sb2coXCJHYW1lIHN0YXJ0ZWRcIik7XHJcbiAgICB0aGlzLnRpY2soKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwYXVzZSgpIHtcclxuICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gR2FtZVN0YXR1cy5TdGFydGVkKSB7XHJcbiAgICAgIHRoaXMuc3RhdHVzID0gR2FtZVN0YXR1cy5QYXVzZWQ7XHJcbiAgICAgIExvZ2dlci5sb2coXCJHYW1lIHBhdXNlZFwiKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMgPT09IEdhbWVTdGF0dXMuUGF1c2VkKSB7XHJcbiAgICAgIHRoaXMuc3RhdHVzID0gR2FtZVN0YXR1cy5TdGFydGVkO1xyXG4gICAgICBMb2dnZXIubG9nKFwiR2FtZSBjb250aW51ZWRcIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RvcCgpIHtcclxuICAgIHRoaXMuc3RhdHVzID0gR2FtZVN0YXR1cy5TdG9wcGVkO1xyXG4gICAgTG9nZ2VyLmxvZyhcIkdhbWUgc3RvcHBlZFwiKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyB0aWNrKCkge1xyXG4gICAgd2hpbGUgKHRoaXMuc3RhdHVzICE9PSBHYW1lU3RhdHVzLlN0b3BwZWQpIHtcclxuICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSBHYW1lU3RhdHVzLlN0YXJ0ZWQpIHtcclxuICAgICAgICBpZiAodGhpcy5zbmFrZS5pc1NlbGZFYXRpbmcoKSkge1xyXG4gICAgICAgICAgLy8gbG9zdFxyXG4gICAgICAgICAgTG9nZ2VyLmxvZyhcIkdhbWUgbG9zdFwiKTtcclxuICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNuYWtlLm1vdmUodGhpcy5ib3JkZXIpO1xyXG4gICAgICAgIGlmICh0aGlzLnNuYWtlLnRyeUVhdEZvb2QodGhpcy5mb29kKSkge1xyXG4gICAgICAgICAgLy8gcmVzcGF3biBmb29kXHJcbiAgICAgICAgICB0aGlzLnNwYXduRm9vZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRyYXcodGhpcy5jdHgpO1xyXG4gICAgICBhd2FpdCBUaW1pbmcud2FpdCgxMDAwLjAgLyB0aGlzLnNwZWVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb3ZlU25ha2UoZGlyZWN0aW9uOiBEaXJlY3Rpb24pIHtcclxuICAgIGlmICh0aGlzLnNuYWtlID09IG51bGwpIHtcclxuICAgICAgTG9nZ2VyLmxvZyhcIlNuYWtlIGNhbid0IGJlIG1vdmVkLCBub3QgaW5pdGlhbGl6ZWRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zbmFrZS5kaXJlY3Rpb24gPT09IGRpcmVjdGlvbikge1xyXG4gICAgICBMb2dnZXIuZGVidWcoXCJTbmFrZSBhbHJlYWR5IG1vdmUgaW4gdGhpcyBkaXJlY3Rpb25cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICh0aGlzLnNuYWtlLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlVwICYmIGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkRvd24pIHx8XHJcbiAgICAgICh0aGlzLnNuYWtlLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkRvd24gJiYgZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVXApIHx8XHJcbiAgICAgICh0aGlzLnNuYWtlLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkxlZnQgJiZcclxuICAgICAgICBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5SaWdodCkgfHxcclxuICAgICAgKHRoaXMuc25ha2UuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUmlnaHQgJiYgZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTGVmdClcclxuICAgICkge1xyXG4gICAgICBMb2dnZXIubG9nKFwiU25ha2UgY2FuJ3QgYmUgbW92ZWQgdG8gb3Bwb3NpdGUgZGlyZWN0aW9uXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zbmFrZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb24gPz8gRGlyZWN0aW9uLkxlZnQ7XHJcbiAgICBMb2dnZXIuZGVidWcoYFNuYWtlcyBkaXJlY3Rpb24gY2hhbmdlZCB0byAke2RpcmVjdGlvbn1gKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb3ZlU25ha2VVcCgpIHtcclxuICAgIHRoaXMubW92ZVNuYWtlKERpcmVjdGlvbi5VcCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbW92ZVNuYWtlRG93bigpIHtcclxuICAgIHRoaXMubW92ZVNuYWtlKERpcmVjdGlvbi5Eb3duKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb3ZlU25ha2VMZWZ0KCkge1xyXG4gICAgdGhpcy5tb3ZlU25ha2UoRGlyZWN0aW9uLkxlZnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG1vdmVTbmFrZVJpZ2h0KCkge1xyXG4gICAgdGhpcy5tb3ZlU25ha2UoRGlyZWN0aW9uLlJpZ2h0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICBpZiAoY3R4ID09IG51bGwpIHtcclxuICAgICAgTG9nZ2VyLmxvZyhcIkNhbid0IGRyYXcsIGNhbnZhcyBpcyBub3Qgc2V0XCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBjbGVhciBjYW52YXMgZmlyc3RcclxuICAgIHRoaXMuY2FudmFzQ2xlYXIoKTtcclxuXHJcbiAgICAvLyBkcmF3IGJvcmRlclxyXG4gICAgdGhpcy5jYW52YXNCb3JkZXIoKTtcclxuXHJcbiAgICAvLyBkcmF3IGZvb2RcclxuICAgIHRoaXMuY2FudmFzRm9vZCgpO1xyXG5cclxuICAgIC8vIGRyYXcgc25ha2VcclxuICAgIHRoaXMuY2FudmFzU25ha2UoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2FudmFzQ2xlYXIoKSB7XHJcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIHRoaXMuYm9yZGVyLnggKiB0aGlzLnNjYWxlLFxyXG4gICAgICB0aGlzLmJvcmRlci55ICogdGhpcy5zY2FsZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2FudmFzQm9yZGVyKCkge1xyXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgdGhpcy5jdHgubW92ZVRvKDAsIDApO1xyXG4gICAgdGhpcy5jdHgubGluZVRvKHRoaXMuYm9yZGVyLnggKiB0aGlzLnNjYWxlLCAwKTtcclxuICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmJvcmRlci54ICogdGhpcy5zY2FsZSwgdGhpcy5ib3JkZXIueSAqIHRoaXMuc2NhbGUpO1xyXG4gICAgdGhpcy5jdHgubGluZVRvKDAsIHRoaXMuYm9yZGVyLnkgKiB0aGlzLnNjYWxlKTtcclxuICAgIHRoaXMuY3R4LmxpbmVUbygwLCAwKTtcclxuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhbnZhc0Zvb2QoKSB7XHJcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImdyZWVuXCI7XHJcbiAgICB0aGlzLmN0eC5maWxsUmVjdChcclxuICAgICAgdGhpcy5mb29kLnBvc2l0aW9uLnggKiB0aGlzLnNjYWxlLFxyXG4gICAgICB0aGlzLmZvb2QucG9zaXRpb24ueSAqIHRoaXMuc2NhbGUsXHJcbiAgICAgIHRoaXMuc2NhbGUsXHJcbiAgICAgIHRoaXMuc2NhbGVcclxuICAgICk7XHJcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjYW52YXNEcmF3U25ha2VQYXJ0KHBvc2l0aW9uOiBQb3NpdGlvbiwgY29sb3I6IHN0cmluZykge1xyXG4gICAgaWYgKCFwb3NpdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcclxuICAgIHRoaXMuY3R4LmZpbGxSZWN0KFxyXG4gICAgICBwb3NpdGlvbi54ICogdGhpcy5zY2FsZSxcclxuICAgICAgcG9zaXRpb24ueSAqIHRoaXMuc2NhbGUsXHJcbiAgICAgIHRoaXMuc2NhbGUsXHJcbiAgICAgIHRoaXMuc2NhbGVcclxuICAgICk7XHJcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2FudmFzU25ha2UoKSB7XHJcbiAgICB0aGlzLmNhbnZhc0RyYXdTbmFrZVBhcnQodGhpcy5zbmFrZS5oZWFkLCBcInJlZFwiKTtcclxuICAgIGlmICh0aGlzLnNuYWtlLmJvZHk/Lmxlbmd0aCA+IDApIHtcclxuICAgICAgZm9yIChsZXQgYm9keUl0ZW0gb2YgdGhpcy5zbmFrZS5ib2R5KSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNEcmF3U25ha2VQYXJ0KGJvZHlJdGVtLCBcImJsdWVcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhbnZhc0RyYXdTbmFrZVBhcnQodGhpcy5zbmFrZS50YWlsLCBcImJsYWNrXCIpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZW51bSBEaXJlY3Rpb24ge1xyXG4gIFVwLFxyXG4gIFJpZ2h0LFxyXG4gIExlZnQsXHJcbiAgRG93bixcclxufVxyXG5cclxuZXhwb3J0IGVudW0gR2FtZVN0YXR1cyB7XHJcbiAgU3RvcHBlZCxcclxuICBTdGFydGVkLFxyXG4gIFBhdXNlZCxcclxufVxyXG4iLCJpbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuL3Bvc2l0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9vZCB7XHJcbiAgcHVibGljIHBvc2l0aW9uOiBQb3NpdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhdGUgZm9vZCBhdCBhIGNlcnRhaW4gcG9zaXRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogUG9zaXRpb24pIHtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjYW5FYXQoZWF0ZXJQb3NpdGlvbjogUG9zaXRpb24pIHtcclxuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLmludGVmZXJlKGVhdGVyUG9zaXRpb24pO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZW51bSBMZXZlbCB7XHJcbiAgRGVidWcsXHJcbiAgSW5mbyxcclxuICBXYXJuaW5nLFxyXG4gIEVycm9yLFxyXG59XHJcbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xyXG4gIHB1YmxpYyBzdGF0aWMgZW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIHN0YXRpYyBsZXZlbDogTGV2ZWwgPSBMZXZlbC5JbmZvO1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGRlYnVnKG1zZzogYW55KSB7XHJcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCB8fCB0aGlzLmxldmVsID4gTGV2ZWwuRGVidWcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKG1zZyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGxvZyhtc2c6IGFueSkge1xyXG4gICAgaWYgKCF0aGlzLmVuYWJsZWQgfHwgdGhpcy5sZXZlbCA+IExldmVsLkluZm8pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKG1zZyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHdhcm4obXNnOiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5lbmFibGVkIHx8IHRoaXMubGV2ZWwgPiBMZXZlbC5XYXJuaW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLndhcm4obXNnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZXJyb3IobXNnOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIE51bWJlckhlbHBlciB7XHJcbiAgcHVibGljIHN0YXRpYyB0b0ludE9yRGVmYXVsdChpbnB1dDogYW55LCBkZWZhdWx0VmFsdWU6IG51bWJlciA9IG51bGwpIHtcclxuICAgIGlmIChpbnB1dCA9PSBudWxsIHx8IGlucHV0ID09PSBcIlwiKSB7XHJcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhcnNlZFZhbHVlID0gcGFyc2VJbnQoaW5wdXQpO1xyXG5cclxuICAgIGlmIChwYXJzZWRWYWx1ZSA9PT0gTmFOKSB7XHJcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhcnNlZFZhbHVlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi9yYW5kb21cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb3NpdGlvbiB7XHJcbiAgcHVibGljIHg6IG51bWJlcjtcclxuICBwdWJsaWMgeTogbnVtYmVyO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoeD86IG51bWJlciwgeT86IG51bWJlcikge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW50ZWZlcmUocG9zaXRpb24/OiBQb3NpdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHBvc2l0aW9uID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMueCA9PT0gcG9zaXRpb24ueCAmJiB0aGlzLnkgPT09IHBvc2l0aW9uLnk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJhbmRvbShib3JkZXI6IFBvc2l0aW9uLCBpbmNsdWRlQm9yZGVyOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQb3NpdGlvbihcclxuICAgICAgUmFuZG9tLm5leHQoYm9yZGVyLnggLSAoaW5jbHVkZUJvcmRlciA/IDAgOiAxKSksXHJcbiAgICAgIFJhbmRvbS5uZXh0KGJvcmRlci55IC0gKGluY2x1ZGVCb3JkZXIgPyAwIDogMSkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYFske3RoaXMueH18JHt0aGlzLnl9XWA7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBSYW5kb20ge1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwdWJsaWMgc3RhdGljIG5leHQobWF4OiBudW1iZXIgPSAxMDAsIG1pbjogbnVtYmVyID0gMCkge1xyXG4gICAgbGV0IHJhbmQgPSBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpO1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KHJhbmQudG9TdHJpbmcoKSkgLSBtaW47XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gXCIuL2VudW1zXCI7XHJcbmltcG9ydCB7IEZvb2QgfSBmcm9tIFwiLi9mb29kXCI7XHJcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4vcG9zaXRpb25cIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU25ha2Uge1xyXG4gIHB1YmxpYyBkaXJlY3Rpb246IERpcmVjdGlvbjtcclxuICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XHJcbiAgcHVibGljIGhlYWQ6IFBvc2l0aW9uO1xyXG4gIHB1YmxpYyBib2R5OiBQb3NpdGlvbltdO1xyXG4gIHB1YmxpYyB0YWlsPzogUG9zaXRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIFNuYWtlIGluc3RhbmNlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbml0aWFsUG9zaXRpb246IFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKDAsIDApLFxyXG4gICAgc25ha2VMZW5ndGg6IG51bWJlciA9IDIsXHJcbiAgICBkaXJlY3Rpb246IERpcmVjdGlvbiA9IERpcmVjdGlvbi5MZWZ0XHJcbiAgKSB7XHJcbiAgICB0aGlzLmhlYWQgPSBpbml0aWFsUG9zaXRpb247XHJcbiAgICB0aGlzLmxlbmd0aCA9IE1hdGgubWF4KHNuYWtlTGVuZ3RoLCAyKTtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgdGhpcy5ib2R5ID0gW107XHJcbiAgICB0aGlzLnRhaWwgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG1vdmUoYm9yZGVyOiBQb3NpdGlvbik6IFBvc2l0aW9uIHtcclxuICAgIC8vIG1vdmUgaW4gdGhlIGRpcmVjdGlvblxyXG4gICAgbGV0IG9sZEhlYWQgPSB0aGlzLmhlYWQ7XHJcblxyXG4gICAgdmFyIHhNb3ZlID0gMDtcclxuICAgIHZhciB5TW92ZSA9IDA7XHJcbiAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgRGlyZWN0aW9uLlVwOlxyXG4gICAgICAgIHlNb3ZlID0gLTE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRGlyZWN0aW9uLkRvd246XHJcbiAgICAgICAgeU1vdmUgPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERpcmVjdGlvbi5MZWZ0OlxyXG4gICAgICAgIHhNb3ZlID0gLTE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRGlyZWN0aW9uLlJpZ2h0OlxyXG4gICAgICAgIHhNb3ZlID0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBhbGVydChgVW5rbm93biBkaXJlY3Rpb24gJHt0aGlzLmRpcmVjdGlvbn1gKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbmV3SGVhZFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKFxyXG4gICAgICAoYm9yZGVyLnggKyAob2xkSGVhZC54ICsgeE1vdmUpKSAlIGJvcmRlci54LFxyXG4gICAgICAoYm9yZGVyLnkgKyAob2xkSGVhZC55ICsgeU1vdmUpKSAlIGJvcmRlci55XHJcbiAgICApO1xyXG5cclxuICAgIExvZ2dlci5kZWJ1ZyhcclxuICAgICAgYE1vdmUgc25ha2UgZnJvbSAke29sZEhlYWQudG9TdHJpbmcoKX0gdG8gJHtuZXdIZWFkUG9zaXRpb24udG9TdHJpbmcoKX1gXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuaGVhZCA9IG5ld0hlYWRQb3NpdGlvbjtcclxuICAgIHRoaXMuYm9keS51bnNoaWZ0KG9sZEhlYWQpO1xyXG4gICAgaWYgKHRoaXMuYm9keS5sZW5ndGggPiB0aGlzLmxlbmd0aCAtIDIpIHtcclxuICAgICAgLy8gcmVtb3ZlIGVsZW1lbnQgZnJvbSBib2R5IGFuZCBzZXQgaXQgYXMgdGFpbFxyXG4gICAgICB0aGlzLnRhaWwgPSB0aGlzLmJvZHkuc3BsaWNlKHRoaXMuYm9keS5sZW5ndGggLSAxLCAxKVswXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5oZWFkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGludGVmZXJlKGVsZW1lbnQ6IFBvc2l0aW9uKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLmhlYWQuaW50ZWZlcmUoZWxlbWVudCkgfHxcclxuICAgICAgdGhpcy5ib2R5LnNvbWUoKGl0ZW0pID0+IGl0ZW0uaW50ZWZlcmUoZWxlbWVudCkpIHx8XHJcbiAgICAgIHRoaXMudGFpbD8uaW50ZWZlcmUoZWxlbWVudClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNTZWxmRWF0aW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5ib2R5LnNvbWUoXHJcbiAgICAgICAgKGl0ZW0pID0+IGl0ZW0uaW50ZWZlcmUodGhpcy5oZWFkKSB8fCBpdGVtLmludGVmZXJlKHRoaXMudGFpbClcclxuICAgICAgKSB8fCB0aGlzLmhlYWQuaW50ZWZlcmUodGhpcy50YWlsKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0cnlFYXRGb29kKGZvb2Q6IEZvb2QpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLmludGVmZXJlKGZvb2QucG9zaXRpb24pKSB7XHJcbiAgICAgIHRoaXMubGVuZ3RoKys7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi9sb2dnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1pbmcge1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIHdhaXQobXM6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuL2JvYXJkXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0dXMgfSBmcm9tIFwiLi9lbnVtc1wiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi9sb2dnZXJcIjtcclxuaW1wb3J0IHsgTnVtYmVySGVscGVyIH0gZnJvbSBcIi4vbnVtYmVyLWhlbHBlclwiO1xyXG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuL3Bvc2l0aW9uXCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgLy8gSGFuZGxlciB3aGVuIHRoZSBET00gaXMgZnVsbHkgbG9hZGVkXHJcbiAgTG9nZ2VyLmxvZyhcIkRPTSBDb250ZW50IHJlYWR5LCBpbml0aWFsaXplLi4uXCIpO1xyXG4gIGxldCBjdXJCb2FyZDogQm9hcmQgPSBudWxsO1xyXG4gICh3aW5kb3cgYXMgYW55KS5zdGFydCA9ICgpID0+IHtcclxuICAgIGxldCBzZXRXaWR0aDogbnVtYmVyID0gTnVtYmVySGVscGVyLnRvSW50T3JEZWZhdWx0KFxyXG4gICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC13aWR0aFwiKSBhcyBhbnkpPy52YWx1ZVxyXG4gICAgKTtcclxuICAgIGxldCBzZXRIZWlnaHQ6IG51bWJlciA9IE51bWJlckhlbHBlci50b0ludE9yRGVmYXVsdChcclxuICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtaGVpZ2h0XCIpIGFzIGFueSk/LnZhbHVlXHJcbiAgICApO1xyXG4gICAgbGV0IHNuYWtlTGVuZ3RoID0gTnVtYmVySGVscGVyLnRvSW50T3JEZWZhdWx0KFxyXG4gICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1zbmFrZS1sZW5ndGhcIikgYXMgYW55KT8udmFsdWVcclxuICAgICk7XHJcbiAgICBsZXQgc25ha2VTcGVlZCA9IE51bWJlckhlbHBlci50b0ludE9yRGVmYXVsdChcclxuICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtc25ha2Utc3BlZWRcIikgYXMgYW55KT8udmFsdWVcclxuICAgICk7XHJcbiAgICBsZXQgYm9yZGVyOiBQb3NpdGlvbiA9IG51bGw7XHJcbiAgICBpZiAoc2V0V2lkdGggIT0gbnVsbCAmJiBzZXRIZWlnaHQgIT0gbnVsbCkge1xyXG4gICAgICBib3JkZXIgPSBuZXcgUG9zaXRpb24oc2V0V2lkdGgsIHNldEhlaWdodCk7XHJcbiAgICB9XHJcbiAgICB2YXIgY2FudmFzOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkLWNhbnZhc1wiKTtcclxuICAgIHZhciBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgKHdpbmRvdyBhcyBhbnkpLmJvYXJkID0gY3VyQm9hcmQgPSBuZXcgQm9hcmQoXHJcbiAgICAgIGN0eCxcclxuICAgICAgYm9yZGVyLFxyXG4gICAgICBzbmFrZUxlbmd0aCxcclxuICAgICAgc25ha2VTcGVlZFxyXG4gICAgKTtcclxuXHJcbiAgICBjdXJCb2FyZC5zdGFydCgpO1xyXG4gICAgSHRtbFRvSmF2YXNjcmlwdC5kaXNhYmxlQWxsQnV0dG9ucygpO1xyXG4gICAgSHRtbFRvSmF2YXNjcmlwdC5lbmFibGVQYXVzZUJ1dHRvbigpO1xyXG4gICAgSHRtbFRvSmF2YXNjcmlwdC5lbmFibGVTdG9wQnV0dG9uKCk7XHJcblxyXG4gICAgbGV0IGxhc3RLZXk6IHN0cmluZyA9IG51bGw7XHJcbiAgICBIdG1sVG9KYXZhc2NyaXB0LmluaXRpYWxpemVLZXlIb29rKChlKSA9PiB7XHJcbiAgICAgIC8vIHdlIG5lZWQgdG8gYWN0IGZvciB0aGUga2V5c1xyXG4gICAgICBpZiAoZS5rZXkgPT09IGxhc3RLZXkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbGFzdEtleSA9IGUua2V5O1xyXG5cclxuICAgICAgc3dpdGNoIChlLmtleSkge1xyXG4gICAgICAgIGNhc2UgXCJ3XCI6XHJcbiAgICAgICAgICBjdXJCb2FyZC5tb3ZlU25ha2VVcCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInNcIjpcclxuICAgICAgICAgIGN1ckJvYXJkLm1vdmVTbmFrZURvd24oKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJhXCI6XHJcbiAgICAgICAgICBjdXJCb2FyZC5tb3ZlU25ha2VMZWZ0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZFwiOlxyXG4gICAgICAgICAgY3VyQm9hcmQubW92ZVNuYWtlUmlnaHQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBMb2dnZXIubG9nKGBLZXkgJHtlLmtleX0gbm90IHN1cHBvcnRlZGApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAod2luZG93IGFzIGFueSkucGF1c2UgPSAoKSA9PiB7XHJcbiAgICBpZiAoIWN1ckJvYXJkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjdXJCb2FyZC5wYXVzZSgpO1xyXG4gIH07XHJcblxyXG4gICh3aW5kb3cgYXMgYW55KS5zdG9wID0gKCkgPT4ge1xyXG4gICAgaWYgKCFjdXJCb2FyZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY3VyQm9hcmQuc3RvcCgpO1xyXG4gICAgSHRtbFRvSmF2YXNjcmlwdC5kaXNhYmxlQWxsQnV0dG9ucygpO1xyXG4gICAgSHRtbFRvSmF2YXNjcmlwdC5lbmFibGVTdGFydEJ1dHRvbigpO1xyXG4gIH07XHJcblxyXG4gIExvZ2dlci5sb2coXCJJbml0aWFsaXplIGRvbmUuXCIpO1xyXG5cclxuICAod2luZG93IGFzIGFueSkuc3RhcnQoKTtcclxufSk7XHJcblxyXG5jbGFzcyBIdG1sVG9KYXZhc2NyaXB0IHtcclxuICBwdWJsaWMgc3RhdGljIGRpc2FibGVBbGxCdXR0b25zKCk6IHZvaWQge1xyXG4gICAgbGV0IGJ1dHRvbnNTdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbi1zdGF0dXNcIikgYXMgYW55O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidXR0b25zU3RhdHVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGJ1dHRvbnNTdGF0dXNbaV0uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBlbmFibGVTdGFydEJ1dHRvbigpOiB2b2lkIHtcclxuICAgIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkLXN0YXJ0XCIpIGFzIGFueSkuZGlzYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZW5hYmxlUGF1c2VCdXR0b24oKTogdm9pZCB7XHJcbiAgICAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNib2FyZC1wYXVzZVwiKSBhcyBhbnkpLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGVuYWJsZVN0b3BCdXR0b24oKTogdm9pZCB7XHJcbiAgICAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNib2FyZC1zdG9wXCIpIGFzIGFueSkuZGlzYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZUtleUhvb2soXHJcbiAgICBvbktleVVwOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHZvaWRcclxuICApOiB2b2lkIHtcclxuICAgIHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPVxyXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICh3aW5kb3cgYXMgYW55KS5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgKHdpbmRvdyBhcyBhbnkpLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAod2luZG93IGFzIGFueSkubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25LZXlVcCwgZmFsc2UpO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=