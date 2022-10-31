import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const conf = {
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.database
};


async function queryTimeExecution<T>(connection: any, query: string, args?: T[]):
	Promise<{ duration: number, result: any }> {
	if (args) {
		const start = new Date().getTime();
		const result: any[] = await connection.query(query, args);
		const end = new Date().getTime();
		return { duration: end - start, result };
	} else {
		const start = new Date().getTime();
		const result: any[] = await connection.query(query);
		const end = new Date().getTime();
		return { duration: end - start, result: result[0] };
	}
}

export async function getSuppliers() {
	const connection = await createConnection(conf);

	const query = 'SELECT SupplierId, CompanyName, ContactName, ContactTitle, City, Country ' +
		'FROM supplies;';
	const output = await queryTimeExecution(connection, query);
	await connection.end();
	return {
		result: output.result,
		log: [{
			query, ts: new Date(), duration: output.duration,
		}],
		queries: 1,
		results: output.result.length,
		select: 1
	};
}

export async function getSupplier(id: number) {
	const connection = await createConnection(conf);

	const query = 'SELECT SupplierID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, ' +
		'Phone, Fax, HomePage ' +
		'FROM supplies ' +
		'WHERE SupplierId = ?;';
	const output = await queryTimeExecution(connection, query, [id]);
	await connection.end();
	return {
		result: output.result[0],
		log: [{ query, ts: new Date(), duration: output.duration }],
		queries: 1,
		results: output.result[0].length,
		selectWhere: 1
	};
}

export async function getProducts() {
	const connection = await createConnection(conf);

	const query = 'SELECT ProductId, ProductName, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder ' +
		'FROM products;';
	const output = await queryTimeExecution(connection, query);
	await connection.end();
	return {
		result: output.result,
		log: [{ query, ts: new Date(), duration: output.duration }],
		queries: 1,
		results: output.result.length,
		select: 1
	};
}

export async function getProduct(id: number) {
	const connection = await createConnection(conf);

	const query = 'SELECT P.ProductID, P.ProductName, P.SupplierID, S.CompanyName, P.QuantityPerUnit, P.UnitPrice, P.UnitsInStock, P.UnitsOnOrder, ' +
		'P.ReorderLevel, P.Discontinued ' +
		'FROM products AS P ' +
		'LEFT JOIN supplies AS S ' +
		'ON P.SupplierID = S.SupplierID ' +
		'WHERE P.ProductID=?;';
	const output = await queryTimeExecution(connection, query, [id]);
	await connection.end();
	return {
		result: output.result[0],
		log: [{ query, ts: new Date(), duration: output.duration }],
		queries: 1,
		results: output.result[0].length,
		selectLeftJoinWhere: 1
	};
}

export async function getOrders() {
	const connection = await createConnection(conf);

	const query = 'SELECT O.OrderID, SUM(OD.UnitPrice * OD.Quantity) AS TotalPrice, COUNT(*) AS Products, ' +
		'SUM(OD.Quantity) AS Quantity, O.ShippedDate, O.ShipName, O.ShipCity, O.ShipCountry ' +
		'FROM orders AS O ' +
		'LEFT JOIN orderDetails AS OD ' +
		'ON O.OrderID = OD.OrderID ' +
		'GROUP BY O.OrderID;';
	const output = await queryTimeExecution(connection, query);
	await connection.end();
	return {
		result: output.result,
		log: [{ query, ts: new Date(), duration: output.duration }],
		queries: 1,
		results: output.result.length,
		selectLeftJoin: 1
	};
}

export async function getOrder(id: number) {
	const connection = await createConnection(conf);


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
	const output1 = await queryTimeExecution(connection, query1, [id]);
	const query2 = 'SELECT O.ProductID, P.ProductName, O.Quantity, O.UnitPrice, ' +
		'O.Quantity * O.UnitPrice AS TotalPrice, O.Discount * 100 AS Discount ' +
		'FROM orderDetails as O LEFT JOIN products AS P ON O.ProductID = P.ProductID WHERE OrderID = ?;';
	const output2 = await queryTimeExecution(connection, query2, [id]);
	await connection.end();
	return {
		result: { OrderInformation: output1.result[0], ProductsInOrder: output2.result[0] },
		log: [{ query: query1, ts: new Date(), duration: output1.duration },
			{ query: query2, ts: new Date(), duration: output2.duration, }],
		queries: 2,
		results: output1.result.length + output2.result.length,
		selectLeftJoinWhere: 3
	};
}

export async function getEmployees() {
	const connection = await createConnection(conf);

	const query = 'SELECT EmployeeID, CONCAT(LastName, " ", FirstName) AS FullName, Title, City, Country ' +
		'FROM employees2;';
	const output = await queryTimeExecution(connection, query);
	await connection.end();
	return {
		result: output.result,
		log: [{ query, ts: new Date(), duration: output.duration }],
		queries: 1,
		results: output.result.length,
		select: 1
	};
}

export async function getEmployee(id: number) {
	const connection = await createConnection(conf);

	const query = 'SELECT e1.EmployeeID, CONCAT(e1.FirstName, " ", e1.LastName) AS EmployeeFullName, e1.Title, e1.TitleOfCourtesy, e1.BirthDate, ' +
		'e1.HireDate, e1.Address, e1.City, e1.Region, e1.PostalCode, e1.Country, e1.HomePhone, e1.Extension, e1.Notes, ' +
		'e1.ReportsTo, CONCAT(e2.LastName, " ", e2.FirstName) AS fullName ' +
		'FROM northwind.employees2 AS e1 ' +
		'LEFT JOIN northwind.employees2 AS e2 ON e1.ReportsTo = e2.EmployeeID WHERE e1.EmployeeID=?;';
	const output = await queryTimeExecution(connection, query, [id]);
	await connection.end();
	return {
		result: output.result[0],
		log: [{ query, ts: new Date(), duration: output.duration }],
		queries: 1,
		results: output.result[0].length,
		selectLeftJoinWhere: 1
	};
}

export async function getCustomers() {
	const connection = await createConnection(conf);

	const query = 'SELECT CustomerID, CompanyName, ContactName, ContactTitle, City, Country ' +
		'FROM customers;';
	const output = await queryTimeExecution(connection, query);
	await connection.end();
	return {
		result: output.result,
		log: [{ query, ts: new Date(), duration: output.duration }],
		queries: 1,
		results: output.result.length,
		select: 1
	};
}

export async function getCustomer(id: string) {
	const connection = await createConnection(conf);

	const query = 'SELECT CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax ' +
		'FROM customers ' +
		'WHERE CustomerID=?;';
	const output = await queryTimeExecution(connection, query, [id]);
	await connection.end();
	return {
		result: output.result[0],
		log: [{ query, ts: new Date(), duration: output.duration }],
		queries: 1,
		results: output.result[0].length,
		selectWhere: 1
	};
}

export async function searchProduct(product: string) {
	const connection = await createConnection(conf);

	const query = 'SELECT ProductID, ProductName, QuantityPerUnit, UnitPrice, UnitsInStock ' +
		'FROM products ' +
		'WHERE ProductName LIKE CONCAT("%", ?, "%");';
	const output = await queryTimeExecution(connection, query, [product]);
	await connection.end();
	return {
		result: output.result[0],
		log: [{ query, ts: new Date(), duration: output.duration }],
		queries: 1,
		results: output.result[0].length,
		selectWhere: 1
	};
}

export async function searchCustomers(product: string) {
	const connection = await createConnection(conf);

	const query = 'SELECT CustomerID, CompanyName, ContactName, ContactTitle, Phone ' +
		'FROM customers ' +
		'WHERE CONCAT_WS( ",",CompanyName, ContactName, ContactTitle) LIKE CONCAT("%", ?, "%");';
	const output = await queryTimeExecution(connection, query, [product]);
	await connection.end();
	return {
		result: output.result[0],
		log: [{ query, ts: new Date(), duration: output.duration }],
		queries: 1,
		results: output.result[0].length,
		selectWhere: 1
	};
}
