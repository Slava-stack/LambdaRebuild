import { fromCmlToStrUpperFirst } from "./camelToSpaceString";

const upperAndIdReplacer = (field: string) => {
  let newField = fromCmlToStrUpperFirst(field);
  newField = newField.replace("i d", "id");
  return newField;
};

export default upperAndIdReplacer;
