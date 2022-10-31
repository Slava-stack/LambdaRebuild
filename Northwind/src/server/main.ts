import express from 'express';
import dotenv from 'dotenv';
import { getCountryCode } from "../functions/getCountryCode";
import { getColo } from "../functions/getColo";
import path from 'path';
import {
	getCustomer,
	getCustomers,
	getEmployee,
	getEmployees,
	getOrder,
	getOrders,
	getProduct,
	getProducts,
	getSupplier,
	getSuppliers, searchCustomers, searchProduct
} from "../functions/dbFunction";

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {

});
app.get('/dash', async (req, res) => {
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	// I might face some problems with ip but functions should work well
	if (ip && !Array.isArray(ip)) {
		const code = await getCountryCode(ip);
		if (code) {
			res.send({ countryCode: code, colo: await getColo(code) });
		}
		// mb else { return 'no such country ;D'};
	}
});
app.get('/suppliers', async (req, res) => {
	res.send(await getSuppliers());
});
app.get('/supplier/:id', async (req, res) => {
	const { id } = req.params;
	res.send(await getSupplier(+id));
});
app.get('/products', async (req, res) => {
	res.send(await getProducts());
});
app.get('/product/:id', async (req, res) => {
	const { id } = req.params;
	res.send(await getProduct(+id));
});
app.get('/orders', async (req, res) => {
	res.send(await getOrders());
});
app.get('/order/:id', async (req, res) => {
	const { id } = req.params;
	res.send(await getOrder(+id));
});
app.get('/employees', async (req, res) => {
	res.send(await getEmployees());
});
app.get('/employee/:id', async (req, res) => {
	const { id } = req.params;
	res.send(await getEmployee(+id));
});
app.get('/customers', async (req, res) => {
	res.send(await getCustomers());
});
app.get('/customer/:id', async (req, res) => {
	const { id } = req.params;
	res.send(await getCustomer(id));
});
app.get('/search/:type/:searchWord', async (req, res) => {
	const { searchWord } = req.params;
	const { type } = req.params;
	if (type === 'Products') {
		res.send(await searchProduct(searchWord));
	} else if (type === 'Customers') {
		res.send(await searchCustomers(searchWord));
	}
});

app.listen(PORT, () => {
	console.log("Server's been started.");
});