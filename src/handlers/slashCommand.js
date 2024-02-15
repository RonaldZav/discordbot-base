const { readdirSync } = require("fs");
const { PermissionsBitField, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");

module.exports = async (client) => {
  try {
    const data = [];
    let count = 0;

    const slashCommandFiles = readdirSync("./src/slashCommands/").filter(file => file.endsWith(".js"));

    for (const file of slashCommandFiles) {
      const slashCommand = require(`../slashCommands/${file}`);

      if (!slashCommand.name || !slashCommand.description) {
        console.error(`Missing name or description for command in file: ${file}`);
        continue;
      }

      client.slashCommands.set(slashCommand.name, slashCommand);

      data.push({
        name: slashCommand.name,
        description: slashCommand.description,
        type: slashCommand.type,
        options: slashCommand.options || null,
        userPerms: slashCommand.userPerms
          ? PermissionsBitField.resolve(slashCommand.userPerms).toString()
          : null,
      });
      count++;
    }

    if(!client.debug) client.logger.log(`Comandos cargados: ${count}`, "cmd");
    const rest = new REST({ version: "10" }).setToken(client.config.token);

    await rest.put(Routes.applicationCommands(client.config.clientID), {
      body: data,
    });
    if(!client.debug) client.logger.log("Comandos actualizados.", "cmd");
  } catch (error) {
    console.error("Error al actualizar comandos:", error);
  }
};
