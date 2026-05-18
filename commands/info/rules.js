module.exports = {
  data: { name: "rules" },
  aliases: [],

  async executePrefix(message) {
    message.reply(
`📜 **SnowSMP Rules**

1. No Griefing
2. No Stealing
3. No Hacking or Unfair Advantages
4. Respect All Players
5. Follow PvP Rules
6. No Trespassing
7. Pranks & Jokes must be Harmless
8. No Lag Machines
9. Follow Staff Instructions
10. Personal or Private Informations must not be Shared
11. Inactivity May Lose Access to the Server
12. Pay on Time for Monthly Payments`
    );
  },

  async execute(interaction) {
    interaction.reply(
`📜 **SnowSMP Rules**

1. No Griefing
2. No Stealing
3. No Hacking or Unfair Advantages
4. Respect All Players
5. Follow PvP Rules
6. No Trespassing
7. Pranks & Jokes must be Harmless
8. No Lag Machines
9. Follow Staff Instructions
10. Personal or Private Informations must not be Shared
11. Inactivity May Lose Access to the Server
12. Pay on Time for Monthly Payments`
    );
  }
};