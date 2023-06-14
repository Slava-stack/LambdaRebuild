import React from "react";
import { Link } from "react-router-dom";
import { CustomersRow, ProductsRow } from "../../types/types";

import "./SearchList.scss";

export default function SearchList({
  values,
  tableType,
}: {
  values: ProductsRow[] | CustomersRow[];
  tableType: string;
}) {
  return (
    <>
      {values.map((el, i) => {
        if (tableType === "Products") {
          const row = el as ProductsRow;
          return (
            <div key={i} className="product-wrapper">
              <Link className="list-link" to={`/product/${row.ProductID}`}>
                {row.ProductName}
              </Link>
              <p>
                #{i + 1}, Quantity Per Unit: {row.QuantityPerUnit}, Price:{" "}
                {row.UnitPrice}, Stock: {row.UnitsInStock}
              </p>
            </div>
          );
        }
        if (tableType === "Customers") {
          const row = el as CustomersRow;
          return (
            <div key={i} className="cursomer-wrapper">
              <Link className="list-link" to={`/customer/${row.CustomerID}`}>
                {row.CompanyName}
              </Link>
              <p>
                #{i + 1}, Contact: {row.ContactName}, Title: {row.ContactTitle},
                Phone: {row.Phone}
              </p>
            </div>
          );
        }
      })}
    </>
  );
}
