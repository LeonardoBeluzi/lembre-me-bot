const { SlashCommandBuilder } = require("discord.js");
const findUserAndUpdateUseCase = require("../useCases/findUserAndUpdate");
const formatBirthdayDate = require("../functions/formatBirthdayDate");
const findAndUpdateCron = require("../functions/findAndUpdateCron");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set_birthday")
    .setDescription("Set birthday to reminder")
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
    ),
  async execute(interaction) {
    const day = interaction.options.getInteger("day");
    const month = interaction.options.getInteger("month");
    const userId = interaction.user.id;

    const birthday = await findUserAndUpdateUseCase.execute(userId, day, month);

    findAndUpdateCron(birthday, interaction.client);

    const birthDate = formatBirthdayDate(day, month);

    await interaction.reply(`Your birthday was set to ${birthDate}.`);
  },
};
