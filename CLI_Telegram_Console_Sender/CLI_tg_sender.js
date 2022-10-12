process.env["NTBA_FIX_319"] = 1;
process.env["NTBA_FIX_350"] = 1;
const tgData = require("./.env")    // contains token and userId
const TelegramBot = require('node-telegram-bot-api');
const program = require('commander');
const { photoDesc, messageDesc, helpDesc, messageSpecificDesc, photoSpecificDesc } = require('./description');

const bot = new TelegramBot(token, { polling: true });

program.version("1.0.1");

program.command('message')
  .description(messageDesc)
  .alias('m')
  .argument('message')
  .action(async arg => {
    await bot.sendMessage(userId, arg);
    process.exit();
  });

program.command('photo')
  .description(photoDesc)
  .alias('p')
  .argument('path')
  .action(async arg => {
    await bot.sendPhoto(userId, arg);
    process.exit();
  });

program.command('help')
  .description(helpDesc)
  .argument('[command]')
  .action(arg => {
    if (arg === 'message' || arg === 'm') {
      console.log(messageSpecificDesc);
      return;
    }
    if (arg === 'photo' || arg === 'p') {
      console.log(photoSpecificDesc);
      return;
    }
    console.log("There is no such command. Use --help to watch commands.");
    process.exit();
  });

program.parse(process.argv);