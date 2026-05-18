module.exports = {
  data: { name: "announce" },

  permissions: "admin",

  async execute(interaction) {
    await interaction.reply("Announcement sent!");
  },

  async executePrefix(message, args) {
    message.reply("Announcement sent!");
  }
};