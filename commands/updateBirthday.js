const { SlashCommandBuilder } = require("discord.js");
const findUserAndUpdateUseCase = require("../useCases/findUserAndUpdate");
const userIsAdmin = require("../functions/userIsAdmin");
const formatBirthdayDate = require("../functions/formatBirthdayDate");
const findAndUpdateCron = require("../functions/findAndUpdateCron");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("update_birthday")
    .setDescription("Update birthday to reminder")
    .addIntegerOption((option) =>
      option
        .setName("day")
        .setDescription("day of birth")
        .setRequired(true)
        .setMaxValue(31)
        .setMinValue(1)
    )
    .addIntegerOption((option) =>
      option
        .setName("month")
        .setDescription("month of birth")
        .setRequired(true)
        .setMaxValue(12)
        .setMinValue(1)
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("birthday person").setRequired(true)
    ),
  async execute(interaction) {
    if (!userIsAdmin(interaction.user.id)) {
      return await interaction.reply(
        "You don't have permission to execute this command."
      );
    }

    const day = interaction.options.getInteger("day");
    const month = interaction.options.getInteger("month");
    const user = interaction.options.getUser("user");

    await interaction.deferReply();

    const birthday = await findUserAndUpdateUseCase.execute(
      user.id,
      day,
      month
    );

    findAndUpdateCron(birthday, interaction.client);

    const birthDate = formatBirthdayDate(day, month);

    await interaction.editReply(`${user}'s birthday was set to ${birthDate}.`);
  },
};
