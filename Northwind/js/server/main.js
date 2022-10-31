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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const getCountryCode_1 = require("../functions/getCountryCode");
const getColo_1 = require("../functions/getColo");
const path_1 = __importDefault(require("path"));
const dbFunction_1 = require("../functions/dbFunction");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.get('/', (req, res) => {
});
app.get('/dash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (ip && !Array.isArray(ip)) {
        const code = yield (0, getCountryCode_1.getCountryCode)(ip);
        if (code) {
            res.send({ countryCode: code, colo: yield (0, getColo_1.getColo)(code) });
        }
    }
}));
app.get('/suppliers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, dbFunction_1.getSuppliers)());
}));
app.get('/supplier/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.send(yield (0, dbFunction_1.getSupplier)(+id));
}));
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, dbFunction_1.getProducts)());
}));
app.get('/product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.send(yield (0, dbFunction_1.getProduct)(+id));
}));
app.get('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, dbFunction_1.getOrders)());
}));
app.get('/order/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.send(yield (0, dbFunction_1.getOrder)(+id));
}));
app.get('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, dbFunction_1.getEmployees)());
}));
app.get('/employee/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.send(yield (0, dbFunction_1.getEmployee)(+id));
}));
app.get('/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, dbFunction_1.getCustomers)());
}));
app.get('/customer/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.send(yield (0, dbFunction_1.getCustomer)(id));
}));
app.get('/search/:type/:searchWord', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchWord } = req.params;
    const { type } = req.params;
    if (type === 'Products') {
        res.send(yield (0, dbFunction_1.searchProduct)(searchWord));
    }
    else if (type === 'Customers') {
        res.send(yield (0, dbFunction_1.searchCustomers)(searchWord));
    }
}));
app.listen(PORT, () => {
    console.log("Server's been started.");
});
