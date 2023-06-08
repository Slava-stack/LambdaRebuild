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
exports.Customer = exports.Customers = void 0;
const customers_1 = require("../repositories/customers");
const Customers = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, customers_1.getCustomers)());
    }
    catch (err) {
        next(err);
    }
});
exports.Customers = Customers;
const Customer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        res.send(yield (0, customers_1.getCustomer)(id));
    }
    catch (err) {
        next(err);
    }
});
exports.Customer = Customer;
