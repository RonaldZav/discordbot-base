const { EmbedBuilder, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Medir latencia cliente a servidor.",

    run: async (client, interaction) => { await interaction.deferReply({ ephemeral: false });
	
        await interaction.editReply({ content: `Midiendo latencia...` }).then(async () => {
            const ping = Date.now() - interaction.createdAt;

            await interaction.editReply({
				content: "",
                embeds: [new EmbedBuilder()
				.setAuthor({ name: "Pong", iconURL: client.user.displayAvatarURL() })
				.setColor("#a9ff5a")
				.setDescription("```Tengo " + ping + "ms de latencia.``` ")
				.setFooter({ text: `Solicitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
				.setTimestamp()]
            });
        })
    }
}
