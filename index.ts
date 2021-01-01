import MessageBuilder from './src/MessageBuilder';
import Bot from './src/Bot';

async function init() {
  const bot = new Bot();
  bot.client?.on('message', (m) => {
    if (m.content === '!!!test') {
      bot.sendMessageObject(
        (new MessageBuilder())
          .setMessage('創造出這台機器人的人，是個不折不扣的傻逼。')
          .build(),
      );
    }
  });
  await bot.login('Nzk0NTQ4NjYzNjUzMzY3ODQ4.X-8bGw.iQNbys1H1K1xL2u3S_2-obhX2f8');
}

init();
