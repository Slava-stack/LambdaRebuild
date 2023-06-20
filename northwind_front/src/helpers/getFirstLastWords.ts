const getFirstLastWords = (name: string) => {
  const wordsArr = name.split(" ").filter((el) => el !== "");
  const [firstWord] = wordsArr;
  const [lastWord] = wordsArr.slice(wordsArr.length - 1);
  return `${firstWord}-${lastWord}`;
};

export default getFirstLastWords;
