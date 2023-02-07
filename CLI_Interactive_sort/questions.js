require("colors");

const questions = {
  choiceQuestion: `${"How would you like to sort the values?".blue.bold}
${"1)".blue.italic.bold} Words by name (from A to Z)
${"2)".blue.italic.bold} Show digits in ascending order
${"3)".blue.italic.bold} Show digits in descending order
${"4)".blue.italic.bold} Words by quantity of letters
${"5)".blue.italic.bold} Only unique words
${"6)".blue.italic.bold} Only unique values

Select ${"(1 - 6)".blue.bold} and press ${"ENTER".blue.bold}: `,
  hello: `Hello! Please enter words ${
    "or/and".brightGreen
  } digits separated by spaces: `,
  bye: "Good bye! Come back again".blue,
  help: "Enter the number according to the list of actions: ".red,
  $continue: "Would you like to continue?(y): ",
};

module.exports = questions;
