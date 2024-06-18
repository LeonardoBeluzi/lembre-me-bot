require("dotenv").config();
const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const readCommands = require("./functions/readCommands");
const cronJobs = require("./useCases/createCronJobs");

async function main() {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    presence: {
      activities: [
        {
          name: "counting days",
          type: ActivityType.Custom,
        },
      ],
    },
  });

  client.commands = readCommands();

  client.once(Events.ClientReady, (readyClient) => {
    console.log("Logged in!");
  });

  client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  });

  await client.login(process.env.DISCORD_TOKEN);

  client.crons = await cronJobs.execute(client);
}

main();
