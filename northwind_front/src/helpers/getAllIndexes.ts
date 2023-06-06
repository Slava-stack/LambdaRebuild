const getAllIndexes = (arr: string[], val: string) => {
  const indexes = [];

  for (let i = 0; i < arr.length; i++)
    if (arr[i].includes(val)) {
      indexes.push(i);
    }
  return indexes;
};

export default getAllIndexes;
