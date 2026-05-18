const { SlashCommandBuilder } = require("discord.js");
const colors = require("../../utils/colors");
const { makeEmbed } = require("../../utils/embed");
const { formatUptime } = require("../../utils/format");

function buildEmbed(wsPing) {
  const uptime = formatUptime(process.uptime());
  const memory = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);

  const embed = makeEmbed({
    title: "🧠 SnowSMP Core Status",
    color: colors.blue
  });

  embed.addFields(
    { name: "Ping", value: `${wsPing}ms`, inline: true },
    { name: "Uptime", value: uptime, inline: true },
    { name: "Memory", value: `${memory} MB RSS`, inline: true },
    { name: "Node", value: process.version }
  );

  return embed;
}

module.exports = {
  aliases: ["stat", "status", "st"],

  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Bot status"),

  async execute(interaction) {
    return interaction.reply({
      embeds: [buildEmbed(interaction.client.ws.ping)]
    });
  },

  async executePrefix(message) {
    return message.reply({
      embeds: [buildEmbed(message.client.ws.ping)]
    });
  }
};