import React from "react";
import findIndexOfSubStrInStrsArray from "../../helpers/findIndexOfSubStrInStrsArray";
import getDate from "../../helpers/getDate";
import getAllIndexes from "../../helpers/getAllIndexes";
import { Link } from "react-router-dom";
import { TableInterface } from "../../types/types";
import firstLetterUpper from "../../helpers/firstLetterUpper";
import avatarTableData from "../../helpers/avatarTableData";
import { keysFitting } from "../../helpers/keysFitting";
import upperAndIdReplacer from "../../helpers/upperAndIdReplacer";
import useWindowWidthResize from "../../hooks/windowWidth";
import labelsFitting from "../../helpers/labelsFitting";

import "./Table.scss";

export default function Table({ tableData, whereTo }: TableInterface) {
  const windowWidth = useWindowWidthResize();

  const isTableWithPic = ["customer", "employee", "supplier"].includes(whereTo);
  if (isTableWithPic) {
    tableData = avatarTableData(tableData, whereTo);
  }

  let keys: string[];
  keys = tableData.length ? Object.keys(tableData[0]) : [];

  const clickHandler = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="table-header">
        <p>{`${firstLetterUpper(whereTo)}s`}</p>
        <button onClick={clickHandler}>
          <span className="material-icons">redo</span>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {keys.map((el, i) => {
              el = upperAndIdReplacer(el);

              const isNotWantedField =
                ["supplier", "product", "employee", "customer"].includes(
                  whereTo
                ) && el.includes("id");

              if (!isNotWantedField) {
                return <th key={i}>{keysFitting(el)}</th>;
              }
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((el, i: number) => {
            const values = Object.values(el);
            const priceIndexes = getAllIndexes(keys, "Price");
            const dateIndex = findIndexOfSubStrInStrsArray(keys, "Date");
            const discountIndex = findIndexOfSubStrInStrsArray(
              keys,
              "Discount"
            );

            return (
              <tr key={i}>
                {values.map((value: any, i) => {
                  const label = labelsFitting(keys[i], windowWidth);

                  const isOrderIdLink = i === 0 && whereTo === "order";
                  const isProductIdLink = i === 1 && whereTo === "product";
                  const isOtherIdLink =
                    i === 2 && !["order", "product"].includes(whereTo);
                  const isEmpSupImg =
                    ["employee", "supplier"].includes(whereTo) && i === 0;
                  const isCustImg = ["customer"].includes(whereTo) && i === 0;
                  const isOtherId =
                    ["employee", "supplier", "customer"].includes(whereTo) &&
                    i === 1;
                  const isProductId = whereTo === "product" && i === 0;

                  if (isOtherId || isProductId) {
                    return;
                  }
                  if (isOrderIdLink || isProductIdLink) {
                    value = (
                      <Link to={`/${whereTo}/${values[0]}`}>{value}</Link>
                    );
                  }
                  if (isOtherIdLink) {
                    value = (
                      <Link to={`/${whereTo}/${values[1]}`}>{value}</Link>
                    );
                  }
                  if (isEmpSupImg || isCustImg) {
                    return (
                      <td key={i} className="img-cell">
                        <img src={value} alt="avatar" />
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
                  return (
                    <td key={i} data-label={label}>
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
