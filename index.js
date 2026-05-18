require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const { hasPermission } = require("./utils/permissions");

// ================= ENV DEBUG =================
const TOKEN = process.env.DISCORD_TOKEN;
const PREFIX = process.env.PREFIX || "snow";

console.log("TOKEN RAW:", TOKEN);
console.log("TOKEN LENGTH:", TOKEN?.length);

// Safety check (prevents silent Railway crash)
if (!TOKEN) {
  throw new Error("DISCORD_TOKEN is missing in environment variables");
}

// ================= CLIENT =================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
client.prefixAliases = new Map();

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
client.once("clientReady", () => {
  console.log(`✅ SnowSMP Core online as ${client.user.tag}`);
});

// ================= PREFIX COMMANDS =================
client.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const name = args.shift()?.toLowerCase();
    if (!name) return;

    const cmdName = client.prefixAliases.get(name) || name;
    const cmd = client.commands.get(cmdName);
    if (!cmd?.executePrefix) return;

    if (cmd.permissions && !hasPermission(message.member, cmd.permissions)) {
      return message.reply("❌ No permission.");
    }

    await cmd.executePrefix(message, args);

  } catch (err) {
    console.error("PREFIX COMMAND ERROR:", err);
  }
});

// ================= SLASH COMMANDS =================
client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    const cmd = client.commands.get(interaction.commandName);
    if (!cmd?.execute) return;

    if (cmd.permissions && !hasPermission(interaction.member, cmd.permissions)) {
      return interaction.reply({
        content: "❌ No permission.",
        ephemeral: true
      });
    }

    await cmd.execute(interaction);

  } catch (err) {
    console.error("SLASH COMMAND ERROR:", err);
  }
});

// ================= LOGIN (ONLY ONCE) =================
client.login(TOKEN);