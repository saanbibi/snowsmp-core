const { SlashCommandBuilder } = require("discord.js");
const colors = require("../../utils/colors");
const { makeEmbed } = require("../../utils/embed");
const { status } = require("minecraft-server-util");

// ================= SAFE STATUS FETCH =================
async function fetchStatus() {
  const host = process.env.MC_IP;
  const port = Number(process.env.MC_PORT || 25565);

  if (!host) {
    throw new Error("MC_IP is not set in environment variables");
  }

  try {
    const res = await status(host, port, {
      timeout: 8000,
      enableSRV: false // IMPORTANT FIX: prevents false offline issues
    });

    return res;

  } catch (err) {
    console.error("❌ MC STATUS ERROR:", err);
    throw err; // DO NOT silently convert to "offline"
  }
}

// ================= EMBED BUILDER =================
function buildEmbed(res) {
  const online = res?.players?.online ?? 0;
  const max = res?.players?.max ?? 0;
  const version = res?.version?.name ?? "Unknown";

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

// ================= ERROR EMBED =================
function buildOfflineEmbed(error) {
  const embed = makeEmbed({
    title: "❄️ SnowSMP Server Status",
    color: colors.red
  });

  embed.addFields(
    { name: "Online", value: "❌ No" },
    { name: "Players", value: "0/0" },
    { name: "Version", value: "Unknown" },
    { name: "Reason", value: error?.message || "Server is unreachable" }
  );

  return embed;
}

// ================= COMMAND =================
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
      return interaction.reply({ embeds: [buildOfflineEmbed(e)] });
    }
  },

  async executePrefix(message) {
    try {
      const res = await fetchStatus();
      return message.reply({ embeds: [buildEmbed(res)] });

    } catch (e) {
      return message.reply({ embeds: [buildOfflineEmbed(e)] });
    }
  }
};