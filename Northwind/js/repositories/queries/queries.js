"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries = {
    customersQuery: "SELECT CustomerID, CompanyName, ContactName, ContactTitle, City, Country " +
        "FROM Customers;",
    customerQuery: "SELECT CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax " +
        "FROM Customers " +
        "WHERE CustomerID=?;",
    employeesQuery: 'SELECT EmployeeID, CONCAT(LastName, " ", FirstName) AS FullName, Title, City, Country ' +
        "FROM Employees;",
    employeeQuery: 'SELECT e1.EmployeeID, CONCAT(e1.FirstName, " ", e1.LastName) AS EmployeeFullName, e1.Title, e1.TitleOfCourtesy, e1.BirthDate, ' +
        "e1.HireDate, e1.Address, e1.City, e1.Region, e1.PostalCode, e1.Country, e1.HomePhone, e1.Extension, e1.Notes, " +
        'e1.ReportsTo, CONCAT(e2.LastName, " ", e2.FirstName) AS fullName ' +
        "FROM northwind.Employees AS e1 " +
        "LEFT JOIN northwind.Employees AS e2 ON e1.ReportsTo = e2.EmployeeID WHERE e1.EmployeeID=?;",
    ordersQuery: "SELECT O.OrderID, SUM(OD.UnitPrice * OD.Quantity) AS TotalPrice, COUNT(*) AS Products, " +
        "SUM(OD.Quantity) AS Quantity, O.ShippedDate, O.ShipName, O.ShipCity, O.ShipCountry " +
        "FROM Orders AS O " +
        "LEFT JOIN OrderDetails AS OD " +
        "ON O.OrderID = OD.OrderID " +
        "GROUP BY O.OrderID;",
    orderQuery1: "SELECT O.CustomerID, O.ShipName, COUNT(*) AS TotalProducts, " +
        "SUM(OD.Quantity) AS Quantity, S.CompanyName AS ShipVia, SUM(OD.UnitPrice * OD.Quantity) AS TotalPrice, " +
        "SUM(OD.UnitPrice * OD.Discount * OD.Quantity) AS TotalDiscount, S.CompanyName, O.Freight, O.OrderDate, " +
        "O.RequiredDate, O.ShippedDate, O.ShipCity, O.ShipRegion, O.ShipPostalCode, O.ShipCountry " +
        "FROM Orders AS O " +
        "LEFT JOIN Shippers AS S " +
        "ON O.ShipVia = S.ShipperID " +
        "LEFT JOIN OrderDetails AS OD " +
        "ON O.OrderID = OD.OrderID " +
        "WHERE O.OrderID=? " +
        "GROUP BY O.OrderID;",
    orderQuery2: "SELECT O.ProductID, P.ProductName, O.Quantity, O.UnitPrice, " +
        "O.Quantity * O.UnitPrice AS TotalPrice, O.Discount * 100 AS Discount " +
        "FROM OrderDetails as O LEFT JOIN Products AS P ON O.ProductID = P.ProductID WHERE OrderID = ?;",
    productsQuery: "SELECT ProductId, ProductName, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder " +
        "FROM Products;",
    productQuery: "SELECT P.ProductID, P.ProductName, P.SupplierID, S.CompanyName, P.QuantityPerUnit, P.UnitPrice, P.UnitsInStock, P.UnitsOnOrder, " +
        "P.ReorderLevel, P.Discontinued " +
        "FROM Products AS P " +
        "LEFT JOIN Supplies AS S " +
        "ON P.SupplierID = S.SupplierID " +
        "WHERE P.ProductID=?;",
    searchProductsQuery: "SELECT ProductID, ProductName, QuantityPerUnit, UnitPrice, UnitsInStock " +
        "FROM Products " +
        'WHERE ProductName LIKE CONCAT("%", ?, "%");',
    searchCustomersQuery: "SELECT CustomerID, CompanyName, ContactName, ContactTitle, Phone " +
        "FROM Customers " +
        'WHERE CONCAT_WS( ",",CompanyName, ContactName, ContactTitle) LIKE CONCAT("%", ?, "%");',
    suppliersQuery: "SELECT SupplierId, CompanyName, ContactName, ContactTitle, City, Country " +
        "FROM Supplies;",
    supplierQuery: "SELECT SupplierID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, " +
        "Phone, Fax, HomePage " +
        "FROM Supplies " +
        "WHERE SupplierId = ?;",
};
exports.default = queries;
