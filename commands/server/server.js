const { SlashCommandBuilder } = require("discord.js");
const colors = require("../../utils/colors");
const { makeEmbed } = require("../../utils/embed");
const { status } = require("minecraft-server-util");

async function fetchStatus() {
  const host = process.env.MC_IP;
  const port = Number(process.env.MC_PORT || 25565);
  return await status(host, port, { timeout: 5000, enableSRV: true });
}

function buildEmbed(res) {
  const online = res.players?.online ?? 0;
  const max = res.players?.max ?? 0;
  const version = res.version?.name ?? "Unknown";

  const embed = makeEmbed({
    title: "❄️ SnowSMP Server Status",
    color: colors.green
  });

  embed.addFields(
    { name: "Online", value: "✅ Yes" },
    { name: "Players", value: `${online}/${max}` },
    { name: "Version", value: version }
  );

  return embed;
}

module.exports = {
  aliases: ["sv", "server"],

  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Show server status"),

async execute(interaction) {
  try {
    const res = await fetchStatus();
    return interaction.reply({ embeds: [buildEmbed(res)] });
  } catch (e) {
    const embed = makeEmbed({ title: "❄️ SnowSMP Server Status", color: colors.red })
      .addFields(
        { name: "Online", value: "❌ No" },
        { name: "Players", value: "0/0" },
        { name: "Version", value: "Unknown" },
        { name: "Reason", value: "Server is offline or unreachable." }
      );
    return interaction.reply({ embeds: [embed] });
  }
},

async executePrefix(message) {
  try {
    const res = await fetchStatus();
    return message.reply({ embeds: [buildEmbed(res)] });
  } catch (e) {
    const embed = makeEmbed({ title: "❄️ SnowSMP Server Status", color: colors.red })
      .addFields(
        { name: "Online", value: "❌ No" },
        { name: "Players", value: "0/0" },
        { name: "Version", value: "Unknown" },
        { name: "Reason", value: "Server is offline or unreachable." }
      );
    return message.reply({ embeds: [embed] });
  }
}
};