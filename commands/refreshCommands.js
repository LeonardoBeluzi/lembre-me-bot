const { SlashCommandBuilder } = require("discord.js");
const deployCommands = require("../functions/deployCommands");
const userIsAdmin = require("../functions/userIsAdmin");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("refresh_commands")
    .setDescription("Refresh the bot commands"),
  async execute(interaction) {
    if (!userIsAdmin(interaction.user.id)) {
      return await interaction.reply(
        "You don't have permission to execute this command."
      );
    }

    await deployCommands();

    await interaction.reply("The commands were refreshed!");
  },
};
