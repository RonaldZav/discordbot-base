const { Activity } = require("discord.js");

module.exports ={
name: "ready",
run: async (client) => {
    client.logger.log(`Session started in ${client.user.username}.`);
  	client.user.setActivity("ronaldzav.com", {type: Activity.Watching});

}}
