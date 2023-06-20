import { fromCmlToStrUpperFirst } from "./camelToSpaceString";
import { keysFitting, keysFitting1024 } from "./keysFitting";

const labelsFitting = (field: string, windowWidth: number) => {
  let label = fromCmlToStrUpperFirst(field);
  label = label.replace("i d", "id");
  label = windowWidth < 1024 ? keysFitting1024(label) : keysFitting(label);
  return label;
};

export default labelsFitting;
