import { DateOptionsInteraface } from "../types/types";

const getDate = (strDate: string) => {
  const options: DateOptionsInteraface = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const date = new Date(strDate).toLocaleDateString(undefined, options);

  return date;
};

export const getDateV2 = (strDate: string) => {
  console.log(strDate);
  const tIndex = strDate.indexOf("T");
  const newDate = strDate.slice(0, tIndex);
  return newDate;
};

export default getDate;
