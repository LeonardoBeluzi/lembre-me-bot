const fs = require("node:fs");
const path = require("node:path");
const { Collection } = require("discord.js");

module.exports = () => {
  const commands = new Collection();

  const foldersPath = path.join(path.resolve("./"), "commands");
  const commandFiles = fs
    .readdirSync(foldersPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(foldersPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }

  console.log(`${commands.size} application (/) commands were read.`);

  return commands;
};
