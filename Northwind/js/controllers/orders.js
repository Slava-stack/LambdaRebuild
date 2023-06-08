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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Orders = void 0;
const orders_1 = require("../repositories/orders");
const Orders = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, orders_1.getOrders)());
    }
    catch (err) {
        next(err);
    }
});
exports.Orders = Orders;
const Order = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        res.send(yield (0, orders_1.getOrder)(+id));
    }
    catch (err) {
        next(err);
    }
});
exports.Order = Order;
