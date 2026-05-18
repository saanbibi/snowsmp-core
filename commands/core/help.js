module.exports = {
  data: { name: "help" },
  aliases: ["h"],

  async executePrefix(message) {
    return message.reply(
`❄️ **SnowSMP Help Menu**

🖥️ **Server Commands**
• snow server — Server status
• snow pl — Online players
• snow ip — Server IP & port

⚙️ **Core Commands**
• snow ping — Bot response speed
• snow stat — Bot status
• snow help — Show this menu

📌 **Info Commands**
• snow link — Server links
• snow rules — Server rules

🛠️ **Staff Commands**
• snow announce — Send announcement
• snow embed — Create embed message
• snow maintenance — Toggle maintenance mode

💡 Use: snow <command>`
    );
  },

  async execute(interaction) {
    return interaction.reply({
      content:
`❄️ **SnowSMP Help Menu**

🖥️ **Server Commands**
• /server — Server status
• /players — Online players
• /ip — Server IP & port

⚙️ **Core Commands**
• /ping — Bot response speed
• /status — Bot status
• /help — Show this menu

📌 **Info Commands**
• /link — Server links
• /rules — Server rules

🛠️ **Staff Commands**
• /announce — Send announcement
• /embed — Create embed message
• /maintenance — Toggle maintenance mode`,
      ephemeral: false
    });
  }
};