const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const weblink = "https://resilient-buttercream-284736.netlify.app/";

bot.start((ctx) => {
  ctx.reply(
    "Welcome! Use /start to open the web app.",
    Markup.inlineKeyboard([Markup.button.webApp("Open Dexpedia", weblink)])
  );
});

const handleUpdates = (req, res) => {
  bot.handleUpdate(req.body, res);
};

module.exports = { bot, handleUpdates };