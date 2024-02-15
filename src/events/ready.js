const { Activity } = require("discord.js");

module.exports ={
name: "ready",
run: async (client) => { const settings = client.settings;
	
client.logger.log(`
    
      Desarrollado por RonaldZav
    Visita mi web en ronaldzav.com

  Sesion: ${client.user.username} / Servidores: ${client.guilds.cache.size}

`, "ready");

  	client.user.setActivity("ronaldzav.com", {type: Activity.Watching});

}}
