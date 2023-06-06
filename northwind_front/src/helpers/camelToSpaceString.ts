const camelToSpaceString = (string: string) => {
  /**
   * "/g" - The g flag indicates that the regular expression should be tested against all possible matches in a string.
   * " $1" - Found letter in brackets in this case "([A-Z])" will be set back with space at the beginning. Example: "chatId" --> "chat Id" $1 --> "I" --> " I".
   */

  const result = string.replace(/([A-Z])/g, " $1").trim();
  return result;
};

export const fromCmlToStrUpperFirst = (str: string) => {
  const result = camelToSpaceString(str).toLowerCase();
  const elFirstLetter = result.slice(0, 1).toUpperCase();
  const newStr = elFirstLetter + result.slice(1);

  return newStr;
};

export default camelToSpaceString;
