const TelegramBot = require('node-telegram-bot-api');

// Substitua pelo seu token de bot do Telegram
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: false });

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body || '{}');
  const chatId = body.chatId;
  const text = body.text;
  
  if (chatId && text) {
    try {
      if (text === '/start') {
        await bot.sendMessage(chatId, 'Bem-vindo! Use /task para realizar uma tarefa.');
      } else if (text === '/task') {
        const playStoreLink = 'https://play.google.com/store/apps/details?id=YOUR_GAME_ID';
        await bot.sendMessage(chatId, `Clique no link para baixar o jogo: ${playStoreLink}`);
        await bot.sendMessage(chatId, 'Compartilhe o link para o jogo com seus amigos!');
      } else if (text.toLowerCase().includes('amigo')) {
        await bot.sendMessage(chatId, 'Obrigado por convidar um amigo! Você ganhou 10 pontos.');
      }
      
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Mensagem enviada com sucesso' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Erro ao enviar a mensagem', error: error.message }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Parâmetros ausentes' }),
    };
  }
};
