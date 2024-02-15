const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");

class RonaldZav extends Client {
  constructor() {
    super({
      failIfNotExists: true,
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
      },
      intents: [
        GatewayIntentBits.Guilds,
		    GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
		    GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildInvites,
      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
      ],
    });
    this.commands = new Collection();

    this.slashCommands = new Collection();
    this.config = require("../client.js");
    this.debug = this.config.debug;
    this.prefix = settings.prefix;
    this.embedColor = settings.embedColor;
    this.aliases = new Collection();
    this.commands = new Collection();
    this.logger = require("../utils/logger.js");
    if (!this.token) this.token = this.config.token;

    this.rest.on("rateLimited", (info) => { this.logger.log(info, "log"); });

		["slashCommand", "events"].forEach((handler) => { require(`../handlers/${handler}`)(this); });
  }
  
  connect() { return super.login(this.token); }

}

module.exports = RonaldZav;
