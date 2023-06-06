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

export default getDate;
