const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Bem-vindo! Use /task para realizar uma tarefa.');
});

bot.onText(/\/task/, (msg) => {
  const chatId = msg.chat.id;
  const playStoreLink = 'https://play.google.com/store/apps/details?id=YOUR_GAME_ID';
  bot.sendMessage(chatId, `Clique no link para baixar o jogo: ${playStoreLink}`);
  bot.sendMessage(chatId, 'Compartilhe o link para o jogo com seus amigos!');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text.toLowerCase();

  if (messageText.includes('amigo')) {
    bot.sendMessage(chatId, 'Obrigado por convidar um amigo! Você ganhou 10 pontos.');
  }
});
