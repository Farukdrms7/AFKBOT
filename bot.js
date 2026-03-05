const mineflayer = require('mineflayer');

const PASSWORD = 'afkbot123';

function createBot() {

  const bot = mineflayer.createBot({
    host: 'SUNUCU_IPIN',
    port: 25565,
    username: 'geek'
  });

  bot.on('spawn', () => {
    console.log('Bot bağlandı!');

    // Login sistemi
    setTimeout(() => {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
      bot.chat(`/login ${PASSWORD}`);
    }, 8000);

    startMovement(bot);
  });

  // Resource pack kabul
  bot.on('resourcePack', () => {
    console.log('Kaynak paketi kabul edildi.');
    bot.acceptResourcePack();
  });

  // Bağlantı koparsa yeniden oluştur
  bot.on('end', () => {
    console.log('Bağlantı koptu. 5 saniye sonra tekrar bağlanılıyor...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('Hata:', err.message);
  });
}

function startMovement(bot) {

  setInterval(() => {
    const directions = ['forward', 'back', 'left', 'right'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    bot.clearControlStates();
    bot.setControlState(randomDirection, true);
    bot.setControlState('sprint', true);
  }, 4000);

  // Engel kontrolü
  setInterval(() => {
    if (!bot.entity) return;

    const block = bot.blockAt(bot.entity.position.offset(0, 0, 1));

    if (block && block.boundingBox === 'block') {
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 500);
    }
  }, 500);
}

// Botu başlat
createBot();
