const inquirer = require("inquirer");
const { appendFileSync, readFileSync } = require("fs");
const {
  enterName,
  entereGender,
  enterAge,
  search,
  enterUserToFind,
  noName,
} = require("./messages");

const nameQuestion = () => {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: enterName,
    })
    .then((answer) =>
      !!answer.name ? questionsContinuation(answer) : searcher()
    );
};

const questionsContinuation = (objName) => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "gender",
        message: entereGender,
        choices: ["male", "female"],
      },
      {
        type: "input",
        name: "age",
        message: enterAge,
        validate: (input) => {
          if (isNaN(input)) return "Only numbers";
          return true;
        },
      },
    ])
    .then((answers) => {
      let aboutUser = Object.assign(objName, answers);
      appendFileSync("DB.txt", `${JSON.stringify(aboutUser)}\n`); // may cuz bugs cuz of \r
      nameQuestion();
    });
};

const searcher = () => {
  inquirer
    .prompt({
      type: "confirm",
      name: "searchInDB",
      message: search,
    })
    .then(({ searchInDB }) => {
      if (searchInDB) {
        const objectsFromDB = readFileSync("DB.txt", "utf8")
          .split("\n")
          .filter((el) => !!el)
          .map(JSON.parse);
        console.log(objectsFromDB);
        findByName(objectsFromDB);
      }
    });
};

const findByName = (objectsFromDB) => {
  inquirer
    .prompt({
      type: "input",
      name: "userName",
      message: enterUserToFind,
    })
    .then(({ userName }) => {
      const nameArr = objectsFromDB.filter(
        (el) => el.name.toLowerCase() === userName.toLowerCase()
      );
      const final = nameArr.map((el) => JSON.stringify(el));
      if (final.length) {
        console.log(`User ${userName} was found.`);
        final.forEach((el) => console.log(el));
        return;
      }
      console.log(noName);
    });
};

nameQuestion();
