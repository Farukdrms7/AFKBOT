const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'jokeycraft.falix.gg',
  port: 25565,
  username: 'geek'
});

const PASSWORD = 'afkbot123';

bot.on('spawn', () => {
  console.log('Bot bağlandı!');

  // Register + Login
  setTimeout(() => {
    bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
    bot.chat(`/login ${PASSWORD}`);
  }, 10000);

  startSmartMovement();
});

function startSmartMovement() {

  setInterval(() => {

    const directions = ['forward', 'back', 'left', 'right'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    bot.clearControlStates();
    bot.setControlState(randomDirection, true);
    bot.setControlState('sprint', true);

  }, 4000); // 4 saniyede yön değiştir

  // Engel kontrol sistemi
  setInterval(() => {
    const block = bot.blockAt(bot.entity.position.offset(0, 0, 1));

    if (block && block.boundingBox === 'block') {
      bot.setControlState('jump', true);

      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 500);
    }

  }, 500);
}

// Atılırsa tekrar bağlan
bot.on('end', () => {
  console.log('Bot atıldı, tekrar bağlanıyor...');
  setTimeout(() => {
    bot.spawn();
  }, 5000);
});
