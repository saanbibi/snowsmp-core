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

  const list = res.players?.sample?.length
    ? res.players.sample.map(p => p.name).join("\n")
    : "No players online.";

  const embed = makeEmbed({
    title: "👥 Online Players",
    color: colors.green
  });

  embed.addFields(
    { name: "Count", value: `${online}/${max}` },
    { name: "List", value: list }
  );

  return embed;
}

module.exports = {
  aliases: ["pl", "players"],

  data: new SlashCommandBuilder()
    .setName("players")
    .setDescription("Show online players"),

async execute(interaction) {
  try {
    const res = await fetchStatus();
    return interaction.reply({ embeds: [buildEmbed(res)] });
  } catch (e) {
    const embed = makeEmbed({ title: "👥 Online Players", color: colors.red })
      .addFields(
        { name: "Count", value: "0/0" },
        { name: "List", value: "Server is offline or unreachable." }
      );
    return interaction.reply({ embeds: [embed] });
  }
},

async executePrefix(message) {
  try {
    const res = await fetchStatus();
    return message.reply({ embeds: [buildEmbed(res)] });
  } catch (e) {
    const embed = makeEmbed({ title: "👥 Online Players", color: colors.red })
      .addFields(
        { name: "Count", value: "0/0" },
        { name: "List", value: "Server is offline or unreachable." }
      );
    return message.reply({ embeds: [embed] });
  }
}
};