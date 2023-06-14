const getName = (name: string | undefined) => {
  if (name) {
    const reversedName = name.split(" ")?.reverse().join(" ");
    return reversedName;
  }
};

export default getName;