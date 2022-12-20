"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const redisClient_1 = require("./config/redisClient");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Must allow-list only the FE / domain
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
const PORT = (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.PORT) !== null && _b !== void 0 ? _b : 3001;
(0, routes_1.configRoutes)(app);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    // Test connection to MongoDB and Redis
    try {
        yield redisClient_1.redisClient.connect();
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error("[REDIS] Error - Unable to connect to Redis");
    }
    // eslint-disable-next-line no-console
    console.log(`[EXPRESS] Running on port: ${PORT}`);
}));
