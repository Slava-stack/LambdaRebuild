import inquirer from "inquirer";
import { parse } from "path";
import dotenv from "dotenv";
import questions from "./questions.js";
import uploadFileAndGetLink from "./model/google.js";
import showMetaDataFile from "./showMetaDataFile.js";

dotenv.config({ path: "./.env" });

const { picPath, newFileName, isUploadNameCorrect } = questions;

inquirer
  .prompt([
    {
      type: "input",
      name: "picPath",
      message: picPath,
    },
  ])
  .then(({ picPath: path }) => {
    let { base: fileName, ext } = parse(path);
    showMetaDataFile(path, fileName, ext);
    inquirer
      .prompt({
        type: "confirm",
        name: "verifying",
        message: isUploadNameCorrect(fileName),
      })
      .then(({ verifying }) => {
        if (verifying) {
          inquirer
            .prompt([
              {
                type: "input",
                name: "newFileName",
                message: newFileName,
              },
            ])
            .then((answer) => {
              const { newFileName } = answer;
              uploadFileAndGetLink({
                fileName: `${newFileName}${ext}`,
                path,
              });
            });
          return;
        }
        uploadFileAndGetLink({ fileName, path });
      })
      .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));
