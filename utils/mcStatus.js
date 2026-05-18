const { status } = require("minecraft-server-util");

async function getServerStatus() {
  try {
    const res = await status("185.207.166.70", 19007, {
      timeout: 5000
    });

    return {
      online: true,
      players: {
        online: res.players?.online ?? 0,
        max: res.players?.max ?? 0
      },
      version: res.version?.name ?? "Unknown"
    };

  } catch (err) {
    console.error("MC STATUS ERROR:", err);

    return {
      online: false,
      players: { online: 0, max: 0 },
      version: "Unknown"
    };
  }
}

module.exports = { getServerStatus };