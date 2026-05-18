module.exports = {
  data: { name: "ping" },
  aliases: ["p"],

  async executePrefix(message) {
    const msg = await message.reply("Pinging...");
    msg.edit(`🏓 Pong! ${msg.createdTimestamp - message.createdTimestamp}ms`);
  },

  async execute(interaction) {
    const msg = await interaction.reply({ content: "Pinging...", fetchReply: true });
    interaction.editReply(`🏓 Pong! ${msg.createdTimestamp - interaction.createdTimestamp}ms`);
  }
};