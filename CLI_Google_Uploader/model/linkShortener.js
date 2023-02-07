import inquirer from "inquirer";
import questions from "../questions.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const { shortenLink } = questions;
const reqUrl = `https://api.tinyurl.com/create?api_token=${process.env.TINY_API_KEY}`;

export default function linkShortener(id) {
  inquirer
    .prompt({
      type: "confirm",
      name: "shortLink",
      message: shortenLink,
    })
    .then(({ shortLink }) => {
      const url = `https://drive.google.com/file/d/${id}/view?usp=drivesdk`; // gets the file link from google drive;
      if (shortLink) {
        axios
          .post(reqUrl, {
            url,
            domain: "tiny.one",
          })
          .then(
            ({
              data: {
                data: { tiny_url },
              },
            }) => console.log(`Your shortened link: ${tiny_url}`)
          )
          .catch((error) => console.log(error));
      } else console.log(`Your link: ${url}`);
    })
    .catch((error) => console.log(error));
}
