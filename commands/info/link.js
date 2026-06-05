module.exports = {
  data: { name: "links" },

  async executePrefix(message) {
    return message.reply(
`🔗 **SnowSMP Links**

📢 Messenger: https://www.messenger.com/j/AbaCPmxKhDdNtDgI/?send_source=gc%3Acopy_invite_link_c
🌐 Website: https://snow-smp.zya.me/?i=1`
    );
  },

  async execute(interaction) {
    return interaction.reply(
`🔗 **SnowSMP Links**

📢 Messenger: https://www.messenger.com/j/AbaCPmxKhDdNtDgI/?send_source=gc%3Acopy_invite_link_c
🌐 Website: https://snow-smp.zya.me/?i=1`
    );
  }
};
