const mineflayer = require('mineflayer');

const PASSWORD = 'afkbot123';

let reconnecting = false;

function createBot() {

  if (reconnecting) return;
  reconnecting = true;

  console.log("Bot başlatılıyor...");

  const bot = mineflayer.createBot({
    host: 'JokeyCraft.enderman.cloud',
    port: 25565,
    username: 'Sunucu'
  });

  bot.once('spawn', () => {
    console.log("Bot bağlandı.");
    reconnecting = false;
    startMovement(bot);
  });

  bot.on('messagestr', (msg) => {
    if (msg.includes('/register')) {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
    }

    if (msg.includes('/login')) {
      bot.chat(`/login ${PASSWORD}`);
    }
  });

  bot.on('resourcePack', () => {
    bot.acceptResourcePack();
  });

  bot.on('end', () => {
    console.log("Bağlantı koptu. 30 saniye sonra tekrar denenecek...");
    setTimeout(() => {
      reconnecting = false;
      createBot();
    }, 30000); // 30 saniye bekle
  });

  bot.on('error', (err) => {
    console.log("Hata:", err.message);
  });
}

function startMovement(bot) {

  setInterval(() => {
    const directions = ['forward', 'back', 'left', 'right'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    bot.clearControlStates();
    bot.setControlState(randomDirection, true);
    bot.setControlState('sprint', true);
  }, 6000);

  setInterval(() => {
    if (!bot.entity) return;

    const block = bot.blockAt(bot.entity.position.offset(0, 0, 1));
    if (block && block.boundingBox === 'block') {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 400);
    }
  }, 700);
}

createBot();
