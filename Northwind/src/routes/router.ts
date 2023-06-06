import Router from "express";
import { Dash } from "../controllers/dash";
import { Supplier, Suppliers } from "../controllers/suppliers";
import { Product, Products } from "../controllers/products";
import { Order, Orders } from "../controllers/orders";
import { Employee, Employees } from "../controllers/employees";
import { Customer, Customers } from "../controllers/customers";
import { Search } from "../controllers/search";
import { idHandler } from "../middleware/idHandler";
import { searchHandler } from "../middleware/searchHandler";

const router = Router();

router.get("/dash", Dash);
router.get("/suppliers", Suppliers);
router.get("/supplier/:id?", idHandler, Supplier);
router.get("/products", Products);
router.get("/product/:id?", idHandler, Product);
router.get("/orders", Orders);
router.get("/order/:id?", idHandler, Order);
router.get("/employees", Employees);
router.get("/employee/:id?", idHandler, Employee);
router.get("/customers", Customers);
router.get("/customer/:id?", idHandler, Customer);
router.get("/search/:type?/:searchWord?", searchHandler, Search);

export default router;
