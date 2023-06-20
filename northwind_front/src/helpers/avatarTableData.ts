import { CustomersRow, EmployeesRow, SuppliersRow } from "../types/types";
import getFirstLastWords from "./getFirstLastWords";

const avatarTableData = (tableData: any[], whereTo: string) => {
  const linkSVG = (name: string) =>
    `https://avatars.dicebear.com/v2/initials/${name}.svg`;

  tableData = tableData.map(
    (el: CustomersRow & SuppliersRow & EmployeesRow) => {
      let value;

      switch (whereTo) {
        case "customer":
          value = getFirstLastWords(el.ContactName);
          break;
        case "employee":
          value = getFirstLastWords(el.FullName);
          break;
        case "supplier":
          value = getFirstLastWords(el.ContactName);
          break;
      }

      return {
        "": linkSVG(value as string),
        ...el,
      };
    }
  );

  return tableData;
};

export default avatarTableData;
