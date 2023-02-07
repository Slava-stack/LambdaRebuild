process.env["NTBA_FIX_319"] = 1; // Needed to get rid of the issue
process.env["NTBA_FIX_350"] = 1; // Needed to get rid of the issue
const TelegramBot = require("node-telegram-bot-api");
const SECRET = require("./.env");
const { getPic } = require("./utils/getPic");

const bot = new TelegramBot(token, { polling: true });
bot.onText(/(.+)/, async (msg, match) => {
  const { id: chatId, first_name, last_name } = msg.chat;
  const messageFromUser = match[1];
  const resp = `Вы написали "${messageFromUser}"`;
  if (messageFromUser.toLowerCase() === "photo") {
    console.log(`Пользователь ${first_name} ${last_name} запросил картинку.`);
    const pic = await getPic();
    await bot.sendPhoto(chatId, pic);
    return;
  }
  console.log(
    `Пользователь ${first_name} ${last_name} написал: ${messageFromUser}`
  );
  await bot.sendMessage(chatId, resp);
});

console.log("Telegram bot successfully started...");
