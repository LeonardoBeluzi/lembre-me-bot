const { CronJob } = require("cron");

module.exports = (birthday, client) => {
  const identifier = `birthday_${birthday.id}`;

  const job = new CronJob(
    `00 * 22 ${birthday.day} ${birthday.month} *`,
    async function () {
      const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
      channel.send(
        `<@&${process.env.DISCORD_ROLE_ID}> hoje é aniversário do <@!${birthday.userId}>!!!`
      );
      channel.send("https://i.imgur.com/2V4BQw8.gif");
    },
    null,
    true
  );

  return {
    identifier,
    job,
  };
};
