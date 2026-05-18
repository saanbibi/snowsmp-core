const { EmbedBuilder } = require("discord.js");

function makeEmbed({ title, color }) {
  const embed = new EmbedBuilder()
    .setTitle(title || " ")
    .setColor(color ?? "#5865F2"); // fallback color

  if (process.env.LOGO_URL) embed.setThumbnail(process.env.LOGO_URL);
  if (process.env.BOT_FOOTER) embed.setFooter({ text: process.env.BOT_FOOTER });

  embed.setTimestamp();
  return embed;
}

module.exports = { makeEmbed };