const { CronJob } = require("cron");

module.exports = (birthday, client) => {
  const identifier = `birthday_${birthday.id}`;
  const cronExpression = `1 0 1 ${birthday.day} ${birthday.month} *`;

  function cronFunction() {
    const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);

    if (!channel) {
      console.log(`Channel ID ${process.env.DISCORD_CHANNEL_ID} not found`);
      return;
    }

    channel.send(
      `<@&${process.env.DISCORD_ROLE_ID}> hoje é aniversário do <@!${birthday.userId}>!!!`
    );
    channel.send("https://i.imgur.com/2V4BQw8.gif");
  }

  const job = new CronJob(cronExpression, cronFunction);

  console.log(`cron job created for ${birthday.userId}`);

  const nextDates = job.nextDates(1);

  console.log(
    "The job will run on:",
    nextDates.map((d) => d.toISO())
  );

  job.start();

  return {
    identifier,
    job,
  };
};
