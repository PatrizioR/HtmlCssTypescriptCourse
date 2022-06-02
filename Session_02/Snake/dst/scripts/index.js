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
System.register("enums", [], function (exports_1, context_1) {
    "use strict";
    var Direction, GameStatus;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (Direction) {
                Direction[Direction["Up"] = 0] = "Up";
                Direction[Direction["Right"] = 1] = "Right";
                Direction[Direction["Left"] = 2] = "Left";
                Direction[Direction["Down"] = 3] = "Down";
            })(Direction || (Direction = {}));
            exports_1("Direction", Direction);
            (function (GameStatus) {
                GameStatus[GameStatus["Stopped"] = 0] = "Stopped";
                GameStatus[GameStatus["Started"] = 1] = "Started";
                GameStatus[GameStatus["Paused"] = 2] = "Paused";
            })(GameStatus || (GameStatus = {}));
            exports_1("GameStatus", GameStatus);
        }
    };
});
System.register("random", [], function (exports_2, context_2) {
    "use strict";
    var Random;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            Random = (function () {
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
            exports_2("Random", Random);
        }
    };
});
System.register("position", ["random"], function (exports_3, context_3) {
    "use strict";
    var random_1, Position;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (random_1_1) {
                random_1 = random_1_1;
            }
        ],
        execute: function () {
            Position = (function () {
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
                Position.createRandom = function (border) {
                    return new Position(random_1.Random.next(border.x), random_1.Random.next(border.y));
                };
                Position.prototype.toString = function () {
                    return "[".concat(this.x, "|").concat(this.y, "]");
                };
                return Position;
            }());
            exports_3("Position", Position);
        }
    };
});
System.register("food", [], function (exports_4, context_4) {
    "use strict";
    var Food;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            Food = (function () {
                function Food(position) {
                    this.position = position;
                }
                Food.prototype.canEat = function (eaterPosition) {
                    return this.position.intefere(eaterPosition);
                };
                return Food;
            }());
            exports_4("Food", Food);
        }
    };
});
System.register("logger", [], function (exports_5, context_5) {
    "use strict";
    var Logger;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            Logger = (function () {
                function Logger() {
                }
                Logger.log = function (msg) {
                    if (!this.enabled) {
                        return;
                    }
                    console.log(msg);
                };
                Logger.enabled = true;
                return Logger;
            }());
            exports_5("Logger", Logger);
        }
    };
});
System.register("snake", ["enums", "position", "logger"], function (exports_6, context_6) {
    "use strict";
    var enums_1, position_1, logger_1, Snake;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (position_1_1) {
                position_1 = position_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            }
        ],
        execute: function () {
            Snake = (function () {
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
                    var newHeadPosition = new position_1.Position((oldHead.x + xMove) % border.x, (oldHead.y + yMove) % border.y);
                    logger_1.Logger.log("Move snake from ".concat(oldHead.toString(), " to ").concat(newHeadPosition.toString()));
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
                    return (this.body.some(function (item) { return item.intefere(_this.head); }) ||
                        this.head.intefere(this.tail));
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
            exports_6("Snake", Snake);
        }
    };
});
System.register("timing", [], function (exports_7, context_7) {
    "use strict";
    var Timing;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            Timing = (function () {
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
            exports_7("Timing", Timing);
        }
    };
});
System.register("board", ["enums", "food", "logger", "position", "random", "snake", "timing"], function (exports_8, context_8) {
    "use strict";
    var enums_2, food_1, logger_2, position_2, random_2, snake_1, timing_1, Board;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (enums_2_1) {
                enums_2 = enums_2_1;
            },
            function (food_1_1) {
                food_1 = food_1_1;
            },
            function (logger_2_1) {
                logger_2 = logger_2_1;
            },
            function (position_2_1) {
                position_2 = position_2_1;
            },
            function (random_2_1) {
                random_2 = random_2_1;
            },
            function (snake_1_1) {
                snake_1 = snake_1_1;
            },
            function (timing_1_1) {
                timing_1 = timing_1_1;
            }
        ],
        execute: function () {
            Board = (function () {
                function Board(border, speed) {
                    if (border === void 0) { border = new position_2.Position(60, 30); }
                    if (speed === void 0) { speed = 3; }
                    this.status = enums_2.GameStatus.Stopped;
                    this.border = border;
                    this.snake = new snake_1.Snake(position_2.Position.createRandom(this.border), 2, random_2.Random.next(5));
                    this.spawnFood();
                    this.speed = speed;
                }
                Board.prototype.spawnFood = function () {
                    do {
                        this.food = new food_1.Food(position_2.Position.createRandom(this.border));
                    } while (this.snake.intefere(this.food.position));
                    logger_2.Logger.log("Food spawn at ".concat(this.food.position.toString()));
                };
                Board.prototype.start = function () {
                    this.status = enums_2.GameStatus.Started;
                    logger_2.Logger.log("Game started");
                    this.tick();
                };
                Board.prototype.pause = function () {
                    this.status = enums_2.GameStatus.Paused;
                    logger_2.Logger.log("Game paused");
                };
                Board.prototype.stop = function () {
                    this.status = enums_2.GameStatus.Stopped;
                    logger_2.Logger.log("Game stopped");
                };
                Board.prototype.tick = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(this.status !== enums_2.GameStatus.Stopped)) return [3, 2];
                                    this.snake.move(this.border);
                                    if (this.snake.tryEatFood(this.food)) {
                                        this.spawnFood();
                                    }
                                    if (this.snake.isSelfEating()) {
                                        logger_2.Logger.log("Game lost");
                                        this.stop();
                                        return [2];
                                    }
                                    return [4, timing_1.Timing.wait(1000 / this.speed)];
                                case 1:
                                    _a.sent();
                                    return [3, 0];
                                case 2: return [2];
                            }
                        });
                    });
                };
                return Board;
            }());
            exports_8("Board", Board);
        }
    };
});
System.register("index", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
            document.addEventListener("DOMContentLoaded", function () {
            });
        }
    };
});
//# sourceMappingURL=index.js.map