import firstLetterUpper from "./firstLetterUpper";

const upperBoth = ["Ship name", "Total price"];

export const keysFitting = (key: string) => {
  let value = key;
  const changeFieldsFirst = ["Shipped date", "Company name", "Contact name"];
  const changeFieldLast = [
    "Contact title",
    "Product name",
    "Unit price",
    "Units in stock",
    "Units on order",
    "Order id",
    "Ship city",
    "Ship country",
    "Full name",
    "Home phone",
  ];

  if (upperBoth.includes(key)) {
    const [firstWord, secondWord] = key.split(" ");
    value = `${firstWord} ${firstLetterUpper(secondWord)}`;
  }
  if (changeFieldLast.includes(key)) {
    const [secondWord] = key.split(" ").slice(-1);
    value = firstLetterUpper(secondWord);
  }
  if (changeFieldsFirst.includes(key)) {
    const [firstWord] = key.split(" ");
    value = firstLetterUpper(firstWord);
  }
  if ("Quantity per unit" === key) {
    value = "Qt per unit";
  }

  return value;
};

export const keysFitting1024 = (key: string) => {
  let value = key;
  const changeFieldsFirst = ["Company name", "Contact name", "Product name"];
  const changeFieldLast = [
    "Total price",
    "Contact title",
    "Unit price",
    "Units in stock",
    "Order id",
    "Ship city",
    "Ship country",
    "Full name",
    "Home phone",
    "Shipped date",
    "Ship name",
  ];

  if (upperBoth.includes(key)) {
    const [firstWord, secondWord] = key.split(" ");
    value = `${firstWord} ${firstLetterUpper(secondWord)}`;
  }
  if (changeFieldLast.includes(key)) {
    const [secondWord] = key.split(" ").slice(-1);
    value = firstLetterUpper(secondWord);
  }
  if (changeFieldsFirst.includes(key)) {
    const [firstWord] = key.split(" ");
    value = firstLetterUpper(firstWord);
  }
  if ("Quantity per unit" === key) {
    value = "Qpu";
  }
  if ("Units on order" === key) {
    value = "Orders";
  }

  return value;
};
