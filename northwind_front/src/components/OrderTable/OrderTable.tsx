import React from "react";
import { OrderProducts } from "../../types/types";
import { Link } from "react-router-dom";

import "./OrderTable.scss";

export default function OrderTable({
  tableData,
}: {
  tableData: OrderProducts[];
}) {
  const tableHeaders = [
    "Product",
    "Quantity",
    "Order Price",
    "Total Price",
    "Discount",
  ];

  return (
    <div className="table-container">
      <div className="product-ordered">
        <p>Products in Order</p>
      </div>
      <table className="in-order-table">
        <thead>
          <tr>
            {tableHeaders.map((el, i) => {
              return <th key={i}>{el}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((product, i) => {
            const keyVal = Object.entries(product);
            return (
              <tr key={i}>
                {keyVal.map((el, j) => {
                  let value = el[1];
                  const idLinkValue = keyVal[0][1];
                  if (j === 1) {
                    value = <Link to={`/product/${idLinkValue}`}>{value}</Link>;
                  }
                  if (j !== 0) {
                    return <td key={j}>{value}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
