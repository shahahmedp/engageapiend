"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const logConfig_json_1 = __importDefault(require("../config/logConfig.json"));
exports.logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.File(logConfig_json_1.default.file),
        new winston_1.transports.Console(logConfig_json_1.default.console),
    ],
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), winston_1.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
    })),
});
