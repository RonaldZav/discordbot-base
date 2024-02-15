const RonaldZav = require("./structures/Client");
const client = new RonaldZav();
const { Client, GatewayIntentBits, Partials, WebhookClient } = require("discord.js");

client.connect()

process.on('unhandledRejection', (reason, p) => { console.log(reason, p); });
process.on('uncaughtException', (err, origin) => { console.log(err, origin); });
process.on('uncaughtExceptionMonitor', (err, origin) => { console.log(err, origin); });

module.exports = client;