const description = {
  photoDesc:
    "Sends a photo to the Telegram Bot. Just drag and drop it into the console after -p flag",
  messageDesc: "Sends a message to the Telegram Bot",
  helpDesc: "Displays help for the command",
  messageSpecificDesc:
    'After the flag "m" or "message" write down text to send it to the Telegram Bot. ' +
    'The command looks like: node CLI_tg_sender.js m|message "hello!" sends text hello!.',
  photoSpecificDesc:
    'After the flag "p" or "photo" write down path to a photo or drag and drop it to ' +
    "the console to send it to the Telegram Bot. The command looks like: node CLI_tg_sender.js" +
    ' p|photo "hello!" sends text hello!.',
  wrongCommand: "There is no such command. Use --help to watch commands.",
};

module.exports = description;
