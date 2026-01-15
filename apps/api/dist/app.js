"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later. - Rate Limit Exceeded"
});
const app = (0, express_1.default)();
// Prevent Express from generating ETags (avoids conditional GET 304s for dynamic endpoints).
app.disable("etag");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(exports.limiter);
app.use("/api", routes_1.default);
exports.default = app;
