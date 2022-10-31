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
exports.searchCustomers = exports.searchProduct = exports.getCustomer = exports.getCustomers = exports.getEmployee = exports.getEmployees = exports.getOrder = exports.getOrders = exports.getProduct = exports.getProducts = exports.getSupplier = exports.getSuppliers = void 0;
const promise_1 = require("mysql2/promise");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const conf = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
};
function queryTimeExecution(connection, query, args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (args) {
            const start = new Date().getTime();
            const result = yield connection.query(query, args);
            const end = new Date().getTime();
            return { duration: end - start, result };
        }
        else {
            const start = new Date().getTime();
            const result = yield connection.query(query);
            const end = new Date().getTime();
            return { duration: end - start, result: result[0] };
        }
    });
}
function getSuppliers() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query = 'SELECT SupplierId, CompanyName, ContactName, ContactTitle, City, Country ' +
            'FROM supplies;';
        const output = yield queryTimeExecution(connection, query);
        yield connection.end();
        return {
            result: output.result,
            log: [{
                    query, ts: new Date(), duration: output.duration,
                }],
            queries: 1,
            results: output.result.length,
            select: 1
        };
    });
}
exports.getSuppliers = getSuppliers;
function getSupplier(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query = 'SELECT SupplierID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, ' +
            'Phone, Fax, HomePage ' +
            'FROM supplies ' +
            'WHERE SupplierId = ?;';
        const output = yield queryTimeExecution(connection, query, [id]);
        yield connection.end();
        return {
            result: output.result[0],
            log: [{ query, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result[0].length,
            selectWhere: 1
        };
    });
}
exports.getSupplier = getSupplier;
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query = 'SELECT ProductId, ProductName, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder ' +
            'FROM products;';
        const output = yield queryTimeExecution(connection, query);
        yield connection.end();
        return {
            result: output.result,
            log: [{ query, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result.length,
            select: 1
        };
    });
}
exports.getProducts = getProducts;
function getProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query = 'SELECT P.ProductID, P.ProductName, P.SupplierID, S.CompanyName, P.QuantityPerUnit, P.UnitPrice, P.UnitsInStock, P.UnitsOnOrder, ' +
            'P.ReorderLevel, P.Discontinued ' +
            'FROM products AS P ' +
            'LEFT JOIN supplies AS S ' +
            'ON P.SupplierID = S.SupplierID ' +
            'WHERE P.ProductID=?;';
        const output = yield queryTimeExecution(connection, query, [id]);
        yield connection.end();
        return {
            result: output.result[0],
            log: [{ query, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result[0].length,
            selectLeftJoinWhere: 1
        };
    });
}
exports.getProduct = getProduct;
function getOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query = 'SELECT O.OrderID, SUM(OD.UnitPrice * OD.Quantity) AS TotalPrice, COUNT(*) AS Products, ' +
            'SUM(OD.Quantity) AS Quantity, O.ShippedDate, O.ShipName, O.ShipCity, O.ShipCountry ' +
            'FROM orders AS O ' +
            'LEFT JOIN orderDetails AS OD ' +
            'ON O.OrderID = OD.OrderID ' +
            'GROUP BY O.OrderID;';
        const output = yield queryTimeExecution(connection, query);
        yield connection.end();
        return {
            result: output.result,
            log: [{ query, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result.length,
            selectLeftJoin: 1
        };
    });
}
exports.getOrders = getOrders;
function getOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query1 = 'SELECT O.CustomerID, O.ShipName, COUNT(*) AS TotalProducts, ' +
            'SUM(OD.Quantity) AS Quantity, SUM(OD.UnitPrice * OD.Quantity) AS TotalPrice, ' +
            'SUM(OD.UnitPrice * OD.Discount * OD.Quantity) AS TotalDiscount, S.CompanyName, O.Freight, O.OrderDate, ' +
            'O.RequiredDate, O.ShippedDate, O.ShipCity, O.ShipRegion, O.ShipPostalCode, O.ShipCountry ' +
            'FROM orders AS O ' +
            'LEFT JOIN shippers AS S ' +
            'ON O.ShipVia = S.ShipperID ' +
            'LEFT JOIN orderDetails AS OD ' +
            'ON O.OrderID = OD.OrderID ' +
            'WHERE O.OrderID=? ' +
            'GROUP BY O.OrderID;';
        const output1 = yield queryTimeExecution(connection, query1, [id]);
        const query2 = 'SELECT O.ProductID, P.ProductName, O.Quantity, O.UnitPrice, ' +
            'O.Quantity * O.UnitPrice AS TotalPrice, O.Discount * 100 AS Discount ' +
            'FROM orderDetails as O LEFT JOIN products AS P ON O.ProductID = P.ProductID WHERE OrderID = ?;';
        const output2 = yield queryTimeExecution(connection, query2, [id]);
        yield connection.end();
        return {
            result: { OrderInformation: output1.result[0], ProductsInOrder: output2.result[0] },
            log: [{ query: query1, ts: new Date(), duration: output1.duration },
                { query: query2, ts: new Date(), duration: output2.duration, }],
            queries: 2,
            results: output1.result.length + output2.result.length,
            selectLeftJoinWhere: 3
        };
    });
}
exports.getOrder = getOrder;
function getEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query = 'SELECT EmployeeID, CONCAT(LastName, " ", FirstName) AS FullName, Title, City, Country ' +
            'FROM employees2;';
        const output = yield queryTimeExecution(connection, query);
        yield connection.end();
        return {
            result: output.result,
            log: [{ query, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result.length,
            select: 1
        };
    });
}
exports.getEmployees = getEmployees;
function getEmployee(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query = 'SELECT e1.EmployeeID, CONCAT(e1.FirstName, " ", e1.LastName) AS EmployeeFullName, e1.Title, e1.TitleOfCourtesy, e1.BirthDate, ' +
            'e1.HireDate, e1.Address, e1.City, e1.Region, e1.PostalCode, e1.Country, e1.HomePhone, e1.Extension, e1.Notes, ' +
            'e1.ReportsTo, CONCAT(e2.LastName, " ", e2.FirstName) AS fullName ' +
            'FROM northwind.employees2 AS e1 ' +
            'LEFT JOIN northwind.employees2 AS e2 ON e1.ReportsTo = e2.EmployeeID WHERE e1.EmployeeID=?;';
        const output = yield queryTimeExecution(connection, query, [id]);
        yield connection.end();
        return {
            result: output.result[0],
            log: [{ query, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result[0].length,
            selectLeftJoinWhere: 1
        };
    });
}
exports.getEmployee = getEmployee;
function getCustomers() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query = 'SELECT CustomerID, CompanyName, ContactName, ContactTitle, City, Country ' +
            'FROM customers;';
        const output = yield queryTimeExecution(connection, query);
        yield connection.end();
        return {
            result: output.result,
            log: [{ query, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result.length,
            select: 1
        };
    });
}
exports.getCustomers = getCustomers;
function getCustomer(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query = 'SELECT CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax ' +
            'FROM customers ' +
            'WHERE CustomerID=?;';
        const output = yield queryTimeExecution(connection, query, [id]);
        yield connection.end();
        return {
            result: output.result[0],
            log: [{ query, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result[0].length,
            selectWhere: 1
        };
    });
}
exports.getCustomer = getCustomer;
function searchProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query = 'SELECT ProductID, ProductName, QuantityPerUnit, UnitPrice, UnitsInStock ' +
            'FROM products ' +
            'WHERE ProductName LIKE CONCAT("%", ?, "%");';
        const output = yield queryTimeExecution(connection, query, [product]);
        yield connection.end();
        return {
            result: output.result[0],
            log: [{ query, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result[0].length,
            selectWhere: 1
        };
    });
}
exports.searchProduct = searchProduct;
function searchCustomers(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(conf);
        const query = 'SELECT CustomerID, CompanyName, ContactName, ContactTitle, Phone ' +
            'FROM customers ' +
            'WHERE CONCAT_WS( ",",CompanyName, ContactName, ContactTitle) LIKE CONCAT("%", ?, "%");';
        const output = yield queryTimeExecution(connection, query, [product]);
        yield connection.end();
        return {
            result: output.result[0],
            log: [{ query, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result[0].length,
            selectWhere: 1
        };
    });
}
exports.searchCustomers = searchCustomers;
