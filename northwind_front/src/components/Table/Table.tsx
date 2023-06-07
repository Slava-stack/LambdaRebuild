import React from "react";
import { fromCmlToStrUpperFirst } from "../../helpers/camelToSpaceString";
import findIndexOfSubStrInStrsArray from "../../helpers/findIndexOfSubStrInStrsArray";
import getDate from "../../helpers/getDate";
import getAllIndexes from "../../helpers/getAllIndexes";
import { Link } from "react-router-dom";

import StyledTable from "../styles/Table.styled";
import { TableInterface } from "../../types/types";

export default function Table({ tableData, whereTo }: TableInterface) {
  let keys: string[];
  keys = tableData.length ? Object.keys(tableData[0]) : [];

  return (
    <StyledTable>
      <thead>
        <tr>
          {keys.map((el, i) => {
            el = fromCmlToStrUpperFirst(el);
            el = el.replace("i d", "id");
            const hasNeededId = el === "Order id" || i !== 0;
            if (hasNeededId) {
              return <th key={i}>{el}</th>;
            }
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((el: any, i: number) => {
          const values = Object.values(el);
          const dateIndex = findIndexOfSubStrInStrsArray(keys, "Date");
          const discountIndex = findIndexOfSubStrInStrsArray(keys, "Discount");
          const priceIndexes = getAllIndexes(keys, "Price");

          return (
            <tr key={i}>
              {values.map((value: any, i) => {
                let label = fromCmlToStrUpperFirst(keys[i]);
                label = label.replace("i d", "id");

                const isOrderIdLink = i === 0 && whereTo === "order";
                const isOtherIdLink = i === 1 && whereTo && whereTo !== "order";

                if (isOrderIdLink) {
                  return (
                    <td key={i} data-label={label}>
                      <Link to={`/${whereTo}/${values[0]}`}>{value}</Link>
                    </td>
                  );
                }

                if (isOtherIdLink) {
                  return (
                    <td key={i} data-label={label}>
                      <Link to={`/${whereTo}/${values[0]}`}>{value}</Link>
                    </td>
                  );
                }

                if (priceIndexes.includes(i)) {
                  value = "$" + value;
                }

                switch (i) {
                  case dateIndex:
                    value = getDate(value);
                    break;
                  case discountIndex:
                    value = value + "%";
                }

                if (i !== 0) {
                  return (
                    <td key={i} data-label={label}>
                      {value}
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}
