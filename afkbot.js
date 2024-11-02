// Import the mineflayer library
const mineflayer = require('mineflayer');

// Create the bot with login info
const bot = mineflayer.createBot({
  host: 'your.server.ip', // Server IP address
  port: 25565,            // Server port (default is 25565 for Minecraft)
  username: 'yourUsername', // Minecraft username (or email for Mojang accounts)
  password: 'yourPassword', // Optional: Only required for premium accounts
});

// Log to console when connected
bot.on('login', () => {
  console.log('Bot has logged in and is now AFK.');
});

// Respond to server messages
bot.on('chat', (username, message) => {
  if (username !== bot.username) {
    console.log(`${username} says: ${message}`);
  }
});

// Prevent bot from getting kicked by sending periodic messages or moving
function stayAFK() {
  bot.setControlState('jump', true); // Makes the bot jump
  setTimeout(() => bot.setControlState('jump', false), 500);
}

// Call the stayAFK function every 5 minutes
setInterval(stayAFK, 5 * 60 * 1000);

// Handle errors and disconnects
bot.on('kicked', (reason) => console.log(`Kicked: ${reason}`));
bot.on('error', (err) => console.log(`Error: ${err.message}`));
