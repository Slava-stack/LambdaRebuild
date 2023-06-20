const firstLetterUpper = (word: string) => {
  const firstLetter = word[0].toUpperCase();
  const restWord = word.slice(1);
  const upperWord = firstLetter + restWord;
  return upperWord;
};

export default firstLetterUpper;
