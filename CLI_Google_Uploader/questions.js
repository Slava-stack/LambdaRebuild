export default {
  shortenLink: "Would you like to get a shortened link?",
  picPath: "Drag and drop an img here and press ENTER:",
  newFileName: "Write down new name for the file without extension: ",
  isUploadNameCorrect: (name) => {
    return `You are uploading file with the name: ${name}
    Would you like to change the name of the file?`;
  },
};
