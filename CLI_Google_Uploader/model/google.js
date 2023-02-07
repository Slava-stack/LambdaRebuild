import { google } from "googleapis";
import dotenv from "dotenv";
import { createReadStream } from "fs";
import linkShortener from "./linkShortener.js";

dotenv.config({ path: "./.env" });

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

const createFileConfig = ({ path, fileName, folderId }) => {
  const config = {
    media: {
      body: createReadStream(path),
    },
    resource: {
      name: fileName,
      parents: [folderId],
    },
  };
  return config;
};

export default async function uploadFileAndGetLink({
  fileName,
  path,
  folderId = process.env.DIR_ID,
}) {
  try {
    const {
      data: { id },
    } = await drive.files.create(
      createFileConfig({ path, fileName, folderId })
    );
    linkShortener(id);
  } catch (e) {
    console.log(e.message);
  }
}
