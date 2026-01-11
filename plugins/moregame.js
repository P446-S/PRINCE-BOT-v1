export default {
  command: ["squidgame", "truth", "dare", "truthordare"],

  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid;
    const command = body.split(" ")[0].toLowerCase();

    switch (command) {
      case "squidgame":
        await sock.sendMessage(from, { text: "Starting Squid Game! Are you ready?" });
        break;

      case "truth":
        await sock.sendMessage(from, { text: "Here's a truth question: What is your biggest fear?" });
        break;

      case "dare":
        await sock.sendMessage(from, { text: "Here's a dare for you: Do 10 pushups!" });
        break;

      case "truthordare":
        await sock.sendMessage(from, { text: "Choose: Truth or Dare?" });
        break;

      default:
        await sock.sendMessage(from, { text: "Unknown game command!" });
    }
  }
}
