const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'jokeycraft.falix.gg',   // Örn: jokeycraft.falix.gg
  port: 25565,
  username: 'geek'       // Bot kullanıcı adı
});

const PASSWORD = 'afkbot123'; // Sunucudaki şifre

// Bot sunucuya bağlandığında
bot.on('spawn', () => {
  console.log('Bot bağlandı!');

  // İlk bağlanışta register + login
  setTimeout(() => {
    bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
    bot.chat(`/login ${PASSWORD}`);
  }, 10000); // 10 saniye bekle, sunucu hazır olsun

  // 5 dakikada bir hareket et, sunucuda AFK görünmesin
  setInterval(() => {
    bot.setControlState('forward', true);
    setTimeout(() => bot.setControlState('forward', false), 1000);
  }, 300000);
});

// Eğer bot atılırsa tekrar bağlan
bot.on('end', () => {
  console.log('Bot atıldı, tekrar bağlanıyor...');
  setTimeout(() => {
    bot.spawn();
  }, 5000);
});
