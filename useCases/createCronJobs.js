const { Collection } = require("discord.js");
const createCron = require("../functions/createCron");
const { Birthday } = require("../models/birthdayModel");

module.exports = {
  async execute(client) {
    const usersBirthday = await Birthday.findAll();

    const cronJobs = new Collection();

    for (const birthday of usersBirthday) {
      const cron = createCron(birthday, client);
      cronJobs.set(cron.identifier, cron.job);
    }

    console.log(`${cronJobs.size} birthdays were loaded.`);

    return cronJobs;
  },
};
