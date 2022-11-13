"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Must allow-list only the FE / domain
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
const port = (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.PORT) !== null && _b !== void 0 ? _b : 3001;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is runnings on PORT:${port}`);
});
