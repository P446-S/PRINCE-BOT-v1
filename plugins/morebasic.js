export default {
  command: ["botstatus", "pair", "ping", "repo", "runtime", "time"],

  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid;
    const command = body.split(" ")[0].toLowerCase();

    switch (command) {
      case "botstatus":
        await sock.sendMessage(from, { text: "Bot is running fine!" });
        break;

      case "pair":
        await sock.sendMessage(from, { text: "Provide pairing code!" });
        break;

      case "ping":
        await sock.sendMessage(from, { text: "Pong! 🏓" });
        break;

      case "repo":
        await sock.sendMessage(from, { text: "GitHub Repository: https://github.com/P446-S" });
        break;

      case "runtime":
        await sock.sendMessage(from, { text: "Bot has been running for X hours!" });
        break;

      case "time":
        await sock.sendMessage(from, { text: `Current time is ${new Date().toLocaleString()}` });
        break;

      default:
        await sock.sendMessage(from, { text: "Unknown basic command!" });
    }
  }
}
