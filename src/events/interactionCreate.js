const { PermissionsBitField, InteractionType, ActionRowBuilder, EmbedBuilder, ChannelType, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Embed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {

    /* Carga slashCommands y previene errores de permisos */
    if (interaction.isCommand()) {
      const command = client.slashCommands.get(interaction.commandName);

      if (!command) return;

      const embed = new EmbedBuilder().setColor("Red");

      if (command.botPerms) {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
          embed.setDescription(`No tengo permisos suficientes para hacer esto.`);
          return interaction.reply({ embeds: [embed] });
        }
      }

      if (command.userPerms) {
        if (!interaction.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
          embed.setDescription(`No tienes permisos suficientes.`);
          return interaction.reply({ embeds: [embed] });
        }
      }

      try {
        await command.run(client, interaction, "!");
      } catch (error) {
        const errorMessage = `¡Ha ocurrido un error! Avisa al equipo de soporte.`;

        if (interaction.replied) {
          await interaction.editReply({ content: errorMessage }).catch(() => {});
        } else {
          await interaction.reply({ ephemeral: true, content: errorMessage }).catch(() => {});
        }
        console.error(error);
      }
    };

    /* Eventos personalizados despues de esto */

  }
};
