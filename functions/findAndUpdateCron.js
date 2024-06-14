const createCron = require("./createCron");

module.exports = (birthday, client) => {
  const cronIdentifier = `birthday_${birthday.id}`;

  const currentCronJob = client.crons.get(cronIdentifier);

  if (currentCronJob) {
    currentCronJob.stop();
    client.crons.delete(cronIdentifier);
  }

  const cron = createCron(birthday, client);
  client.crons.set(cron.identifier, cron.job);
};
