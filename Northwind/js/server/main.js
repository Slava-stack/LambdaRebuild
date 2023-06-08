"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("../routes/router"));
const errorHandler_1 = __importDefault(require("../middleware/errorHandler"));
const errorHandler_2 = __importDefault(require("../middleware/errorHandler"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/", router_1.default);
app.use(errorHandler_1.default, errorHandler_2.default);
app.listen(PORT, () => {
    console.log("Server's been started.");
});
