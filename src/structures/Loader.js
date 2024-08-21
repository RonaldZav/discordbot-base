const { PermissionsBitField, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { readdirSync } = require('fs');
const { join } = require('path');

/* Events Loader */

module.exports = (client) => {
    let countE = 0;

        const events = readdirSync(join(__dirname, '..', 'events')).filter((file) => file.endsWith('.js'));
        events.forEach((eventFile) => {
            const event = require(join(__dirname, '..', 'events', eventFile));

            client.on(event.name, (...args) => event.run(client, ...args));
            countE++;
        });


    /* Slash Commands Loader */

    const data = [];
    let count = 0;

    const slashCommandFile = readdirSync(join(__dirname, '..', 'slashCommands')).filter((files) => files.endsWith(".js"));

    for (const file of slashCommandFile) {
        const slashCommand = require(join(__dirname, '..', 'slashCommands', file));

        if (!slashCommand.name)
            return console.error(
                `slashCommandNameError: ${
                    slashCommand.split(".")[0]
                } application command name is required.`
            );

        if (!slashCommand.description)
            return console.error(
                `slashCommandDescriptionError: ${
                    slashCommand.split(".")[0]
                } application command description is required.`
            );

        client.slashCommands.set(slashCommand.name, slashCommand);

        data.push({
            name: slashCommand.name,
            description: slashCommand.description,
            type: slashCommand.type,
            options: slashCommand.options ? slashCommand.options : null,
            userPerms: slashCommand.userPerms
                ? PermissionsBitField.resolve(
                    slashCommand.userPerms
                ).toString()
                : null,
        });
        count++;
    }

    client.logger.log(`Slash commands loaded: ${count}`);
    const rest = new REST({ version: "10" }).setToken(client.config.token);
    (async () => {
        try {
            client.logger.log("Updating slash commands.");
            await rest.put(Routes.applicationCommands(client.config.clientID), {
                body: data,
            });
            client.logger.log("Commands reloaded.");
        } catch (error) {
            console.error(error);
        }
    })();
};
