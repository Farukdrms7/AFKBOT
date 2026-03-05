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

  startRandomMovement();
});

// Rastgele hareket sistemi
function startRandomMovement() {
  setInterval(() => {
    const directions = ['forward', 'back', 'left', 'right'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    bot.setControlState(randomDirection, true);
    bot.setControlState('sprint', true);

    // 2 saniye koşsun
    setTimeout(() => {
      bot.clearControlStates();
    }, 2000);

  }, 5000); // 5 saniyede bir yön değiştirir
}

// Atılırsa tekrar bağlan
bot.on('end', () => {
  console.log('Bot atıldı, tekrar bağlanıyor...');
  setTimeout(() => {
    bot.spawn();
  }, 5000);
});
