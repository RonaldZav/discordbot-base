const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { MongoClient } = require("mongodb");

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
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.MessageContent,
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
    this.id = this.config.clientID;
    this.aliases = new Collection();
    this.logger = require("../utils/logger.js");
    this.mongodbSession = null;
    this.database = this.database.bind(this);

    this.connectMongoDB().then(() => {
      this.logger.log("MongoDB connected correctly.");
      return this.connect();
    }).catch(error => {
      console.error("Error al conectar a MongoDB:", error);
    });

    this.rest.on("rateLimited", (info) => {
      this.logger.log(info, "log");
    });

    require(`./Loader.js`)(this);
  }

  async connectMongoDB() {
    const mongoClient = new MongoClient(this.config.mongodb.uri, {});
    await mongoClient.connect();
    this.mongodbSession = mongoClient.db(this.config.mongodb.db);
  }

  // Método para acceder a la base de datos
  async database(query, collection = "guilds") {
    try {
      if (!this.mongodbSession) {
        await this.connectMongoDB();
      }

      let result = await this.mongodbSession.collection(collection).findOne(query);

      if (!result) {
        await this.mongodbSession.collection(collection).insertOne(query);
        result = await this.mongodbSession.collection(collection).findOne(query);
      }

      result.save = async () => {
        await this.mongodbSession.collection(collection).updateOne(query, { $set: result });
      };

      result.reload = async () => {
        let updatedResult = await this.mongodbSession.collection(collection).findOne(query);
        if (updatedResult) {
          Object.assign(result, updatedResult);
        }
        return result;
      };

      return result;

    } catch (e) {
      console.error("Error en la operación de la base de datos:", e);
    }
  }

  async connect() {
    return super.login(this.config.token);
  }
}

module.exports = RonaldZav;