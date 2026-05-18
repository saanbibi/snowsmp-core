module.exports = {
  data: { name: "ip" },
  aliases: [],

  async executePrefix(message) {
    message.reply(
`🌐 **SnowSMP Server IP**
IP: snowsmp.top
Port: 19007`
    );
  },

  async execute(interaction) {
    interaction.reply(
`🌐 **SnowSMP Server IP**
IP: snowsmp.top
Port: 19007`
    );
  }
};