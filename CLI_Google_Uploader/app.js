import {google} from 'googleapis';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import axios from 'axios';

const tinyApiKey = 'svNjB9S3ETK18wMY54ktvUHtWV4PoVyxrUJ6Rc0k8KDhnaSn6SncopxT33VL';
const reqUrl = `https://api.tinyurl.com/create?api_token=${tinyApiKey}`;
const CLIENT_ID = '982429572292-70otvf8p8a3elu6eosspr0gkog0esqo0.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
// https://developers.google.com/oauthplayground/?code=4/0AdQt8qjGHrTSNkxERctQUz5Ka85CcHqO40Az7Ov5p0CHeVYn4KmguK7hME6KQpn0CHh4Aw&scope=https://www.googleapis.com/auth/drive
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04VqVqWnelex2CgYIARAAGAQSNwF-L9IrBTR5-WZv51HcuG60rMflQUkqWUfm55TenvGhPXC73v_9c7iTneg7bxkA8mauPaE5XNk';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
const drive = google.drive({version: 'v3', auth: oauth2Client});

async function uploadFileAndGetLink(fileName, filePath) {
    try {
        const response = await drive.files.create({
            media: {
                body: fs.createReadStream(filePath)
            },
            resource: {
                name: fileName,
                parents: ['1xgrDtdu9QiQu2vdTgnP1hZOMqUeo9s8j']
            },
        });
        linkShortener(response.data.id);
    } catch (e) {
        console.log(e.message);
    }
}

function linkShortener(id) {
    inquirer.prompt({
        type: "confirm",
        name: "shortLink",
        message: "Would you like to get a shortened link?",
    }).then(answer => {
        const url = `https://drive.google.com/file/d/${id}/view?usp=drivesdk`;  // get the link from google drive;
        if (answer.shortLink) {
            axios.post(reqUrl, {
                url,
                domain: "tiny.one",
            }).then(response =>
                console.log(`Your shortened link: ${response.data.data.tiny_url}`))
                .catch(error => console.log(error))
        } else console.log(`Your link: ${url}`);
    }).catch(error => console.log(error));
}

inquirer.prompt([{
    type: "input",
    name: "picPath",
    message: "Drag and drop an img here and press ENTER:",
}]).then(answer => {
    let {picPath} = answer;
    let {base, ext} = path.parse(picPath);
    console.log(`Path to the file   |  ${picPath}
File name          |  ${base}
File's extension   |  ${ext.slice(1)}`);
    inquirer.prompt({
        type: "confirm",
        name: "verifying",
        message: `You are uploading file with the name: ${base}
Would you like to change the name of the file?`,
    }).then(async answer => {
        if (answer.verifying) {
            inquirer.prompt([{
                type: "input",
                name: "newFileName",
                message: "Write down new name for the file without extension: "
            }]).then(answer => {        // mb async
                const {newFileName} = answer
                uploadFileAndGetLink(`${newFileName}${ext}`, picPath);
            });
        } else {
            await uploadFileAndGetLink(base, picPath);
        }
    }).catch(error => console.log(error));
}).catch(error => console.log(error));