require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const { hasPermission } = require("./utils/permissions");
console.log("TOKEN RAW:", process.env.DISCORD_TOKEN);
console.log("TOKEN LENGTH:", process.env.DISCORD_TOKEN?.length);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.login(process.env.DISCORD_TOKEN);

client.commands = new Collection();
client.prefixAliases = new Map();

const { status } = require('minecraft-server-util');

async function getServerStatus() {
  try {
    const res = await status('185.207.166.70', 19007, {
      timeout: 5000
    });

    console.log(res);

    return {
      online: true,
      players: res.players.online,
      max: res.players.max,
      version: res.version.name
    };
  } catch (err) {
    console.error(err);
    return {
      online: false
    };
  }
}

const prefix = process.env.PREFIX || "snow";


// ================= LOAD COMMANDS =================
const folders = fs.readdirSync("./commands", { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const folder of folders) {
  const files = fs.readdirSync(`./commands/${folder}`)
    .filter(f => f.endsWith(".js"));

  for (const file of files) {
    const cmd = require(`./commands/${folder}/${file}`);

    if (!cmd?.data?.name) continue;

    client.commands.set(cmd.data.name, cmd);

    if (cmd.aliases) {
      for (const a of cmd.aliases) {
        client.prefixAliases.set(a, cmd.data.name);
      }
    }
  }
}


// ================= READY =================
client.once("ready", () => {
  console.log(`✅ SnowSMP Core online as ${client.user.tag}`);
});


// ================= PREFIX =================
client.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const name = args.shift()?.toLowerCase();
    if (!name) return;

    const cmdName = client.prefixAliases.get(name) || name;
    const cmd = client.commands.get(cmdName);
    if (!cmd?.executePrefix) return;

    if (cmd.permissions) {
      if (!hasPermission(message.member, cmd.permissions)) {
        return message.reply("❌ No permission.");
      }
    }

    await cmd.executePrefix(message, args);
  } catch (e) {
    console.error(e);
  }
});


// ================= SLASH =================
client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    const cmd = client.commands.get(interaction.commandName);
    if (!cmd?.execute) return;

    if (cmd.permissions) {
      if (!hasPermission(interaction.member, cmd.permissions)) {
        return interaction.reply({
          content: "❌ No permission.",
          ephemeral: true
        });
      }
    }

    await cmd.execute(interaction);
  } catch (e) {
    console.error(e);
  }
});


client.login(process.env.DISCORD_TOKEN);