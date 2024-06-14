const { PrismaClient } = require("@prisma/client");
const { Collection } = require("discord.js");
const createCron = require("../functions/createCron");

module.exports = {
  async execute(client) {
    const prisma = new PrismaClient();
    const usersBirthday = await prisma.birthday.findMany();

    const cronJobs = new Collection();

    for (const birthday of usersBirthday) {
      const cron = createCron(birthday, client);
      cronJobs.set(cron.identifier, cron.job);
    }

    console.log(`${cronJobs.size} birthdays were loaded.`);

    return cronJobs;
  },
};
