const readline = require("readline");
const { choiceQuestion, hello, bye, $continue } = require("./questions");
require("colors");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("close", () => console.log(bye));

const again = () => {
  rl.setPrompt($continue);
  rl.prompt();
  rl.on("line", (userInput) => {
    if (userInput.toLowerCase() === "y") {
      return question();
    }
    rl.close();
  });
};

const checkNaN = (answer, $isNaN) => {
  switch ($isNaN) {
    case true: {
      const filtered = answer.filter((el) => {
        if (isNaN(Number(el))) {
          return el;
        }
      });
      return filtered;
    }
    case false: {
      const filtered = answer.filter((el) => {
        if (!isNaN(Number(el))) {
          return el;
        }
      });
      return filtered;
    }
  }
};

const question = () => {
  rl.question(hello, (answer) => {
    rl.question(choiceQuestion, (number) => {
      answer = answer.trim().split(" ");
      switch (number.toLowerCase().trim()) {
        case "1":
          console.log(checkNaN(answer, true).sort());
          again();
          break;
        case "2":
          console.log(checkNaN(answer, false).sort((a, b) => a - b));
          again();
          break;
        case "3":
          console.log(checkNaN(answer, false).sort((a, b) => b - a));
          again();
          break;
        case "4":
          console.log(
            checkNaN(answer, true).sort((a, b) => a.length - b.length)
          );
          again();
          break;
        case "5":
          console.log([...new Set(checkNaN(answer, false))]);
          again();
          break;
        case "6":
          console.log([...new Set(answer)]);
          again();
          break;
        default:
          rl.close();
      }
    });
  });
};

question();
