const findIndexOfSubStrInStrsArray = (arr: any[], word: any) => {
  const result = arr.findIndex((el) => el.includes(word));
  return result;
};

export default findIndexOfSubStrInStrsArray;
