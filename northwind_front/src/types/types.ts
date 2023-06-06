export interface QueriesInterface {
  queries: Logging[];
  addQuery: (arg: Logging) => void;
  queryResult: number;
  addQueryResult: (queryResult: number) => void;
}

export interface LayoutInterface {
  showLayout: boolean;
  showAside: boolean;

  setShowLayout: (arg: boolean) => void;
  setShowAside: (arg: boolean) => void;
}

export interface HeaderHamInterface {
  showHam: boolean;

  setShowHam: (arg: boolean) => void;
}

export interface DashResponseInterface {
  data: { colo: string; countryCode: string };
}

export interface Logging {
  query: string;
  ts: Date;
  duration: number;
}

export interface QueryTypes {
  select: number;
  selectWhere: number;
  selectLeftJoin: number;
  selectLeftJoinWhere: number;
}

interface ResponseAPI {
  log: Logging[];
  queries: number;
  results: number;
  select?: number;
  selectWhere?: number;
  selectLeftJoin?: number;
  selectLeftJoinWhere?: number;
}

export interface EmployeesRow {
  EmployeeID: number;
  FullName: string;
  Title: string;
  City: string;
  Country: string;
}

export interface CustomersRow {
  CustomerID: string;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
  City: string;
  Country: string;
}

export interface ProductsRow {
  ProductId: number;
  ProductName: string;
  QuantityPerUnit: string;
  UnitPrice: string;
  UnitsInStock: number;
  UnitsOnOrder: number;
}

export interface SuppliersRow {
  SupplierId: number;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
  City: string;
  Country: string;
}

export interface OrdersRow {
  OrderID: number;
  TotalPrice: string;
  Products: number;
  Quantity: string;
  ShippedDate: string;
  ShipName: string;
  ShipCity: string;
  ShipCountry: string;
}

export interface SupplierInfoInterface {
  SupplierID: number;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
  Address: string;
  City: string;
  Region: string;
  PostalCode: string;
  Country: string;
  Phone: string;
  Fax: string;
  HomePage: string;
}

export interface EmployeeInfoInterface {
  EmployeeID: number;
  EmployeeFullName: string;
  Title: string;
  TitleOfCourtesy: string;
  BirthDate: string;
  HireDate: string;
  Address: string;
  City: string;
  Region: string;
  PostalCode: string;
  Country: string;
  HomePhone: string;
  Extension: string;
  Notes: string;
  ReportsTo: number;
  fullName: string;
}

export interface ProductInfoInterface {
  ProductID: number;
  ProductName: string;
  SupplierID: number;
  CompanyName: string;
  QuantityPerUnit: string;
  UnitPrice: string;
  UnitsInStock: number;
  UnitsOnOrder: number;
  ReorderLevel: number;
  Discontinued: {
    type: "Buffer";
    data: [0 | 1];
  };
}

export interface CustomerInfoInterface {
  CustomerID: string;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
  Address: string;
  City: string;
  Region: string;
  PostalCode: string;
  Country: string;
  Phone: string;
  Fax: string;
}

export interface OrderInfoInterface {
  OrderInformation: [
    {
      CustomerID: string;
      ShipName: string;
      TotalProducts: number;
      Quantity: string;
      TotalPrice: string;
      TotalDiscount: string;
      CompanyName: string;
      Freight: string;
      OrderDate: string;
      RequiredDate: string;
      ShippedDate: string;
      ShipCity: string;
      ShipRegion: string;
      ShipPostalCode: string;
      ShipCountry: string;
    }
  ];
  ProductsInOrder: OrderProducts[];
}

interface OrderProducts {
  ProductID: number;
  ProductName: string;
  Quantity: number;
  UnitPrice: string;
  TotalPrice: string;
  Discount: string;
}

export type EmployeesReponseAPI = ResponseAPI & { result: EmployeesRow[] };
export type EmployeeResponseAPI = ResponseAPI & {
  result: EmployeeInfoInterface[];
};
export type ProductsReponseAPI = ResponseAPI & { result: ProductsRow[] };
export type ProductReponseAPI = ResponseAPI & {
  result: ProductInfoInterface[];
};
export type CustomersReponseAPI = ResponseAPI & { result: CustomersRow[] };
export type CustomerResponseAPI = ResponseAPI & {
  result: CustomerInfoInterface[];
};
export type SuppliersReponseAPI = ResponseAPI & { result: SuppliersRow[] };
export type SupplierResponseAPI = ResponseAPI & {
  result: SupplierInfoInterface[];
};
export type OrdersReponseAPI = ResponseAPI & { result: OrdersRow[] };
export type OrderResponseAPI = ResponseAPI & { result: OrderInfoInterface };
export type SearchResponseAPI =
  | (ResponseAPI & { result: ProductsRow[] })
  | (ResponseAPI & { result: CustomersRow[] });

export interface TableEmployeesInterface {
  currentPage: number;
  visibleDataRows: EmployeesRow[];
}

export interface TableCustomersInterface {
  currentPage: number;
  visibleDataRows: CustomersRow[];
}

export interface TableSuppliersInterface {
  currentPage: number;
  visibleDataRows: SuppliersRow[];
}

export interface TableProductsInterface {
  currentPage: number;
  visibleDataRows: ProductsRow[];
}

export interface TableOrdersInterface {
  currentPage: number;
  visibleDataRows: OrdersRow[];
}

export interface TableStructureInterface {
  arr: any[];
  valuesPerPage: number;

  firstLastRecords: (pageNum: number) => {
    firstRecord: number;
    lastRecord: number;
  };
  visibleRecords: (pageNum: number) => any[];
  amountOfValues: (pageNum: number) => number;
  arrayOfPages: () => number[];
}

export interface DateOptionsInteraface {
  year: "numeric";
  month: "numeric";
  day: "numeric";
}

export interface StyledFlexWrapper {
  direction?: string;
  align?: string;
  justify?: string;
  position?: string;
  inset?: number | string;
  margin?: string | number;
}

export interface WordAndTableInterface {
  tableType: string;
  searchWord: string;
}

export interface PaginatedTableInterface {
  itemsPerPage: number;
  items: any[];
  whereTo?: string;
  setPageParams?: (page: string) => void;
  initialPage?: number | string;
}

export interface ColumnsFlexWrapperInterface {
  columns?: number;
  width?: string;
}

export interface TableInterface {
  tableData: any[];
  whereTo: string;
}

export interface SubmitHandlerInterface {
  search: { value: string };
  table: { value: string };
}
