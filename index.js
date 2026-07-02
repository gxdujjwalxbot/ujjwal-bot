const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const TelegramBot = require('node-telegram-bot-api');

const tgBot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

tgBot.onText(/\/start/, async (msg) => {
    const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${msg.chat.id}`);
    const sock = makeWASocket({ auth: state });

    const code = await sock.requestPairingCode('918414938563'); // Yahan apna WhatsApp number likhna
    tgBot.sendMessage(msg.chat.id, `Pairing Code: ${code}`);
    sock.ev.on('creds.update', saveCreds);
});

console.log("Bot Online!");
