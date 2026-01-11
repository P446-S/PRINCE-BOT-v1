export default {
  command: ["define", "lyrics", "weather", "yts"],

  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid;
    const command = body.split(" ")[0].toLowerCase();

    switch (command) {
      case "define":
        await sock.sendMessage(from, { text: "Please provide a word to define!" });
        break;

      case "lyrics":
        await sock.sendMessage(from, { text: "Please provide a song name for lyrics!" });
        break;

      case "weather":
        await sock.sendMessage(from, { text: "Please provide a location for weather information!" });
        break;

      case "yts":
        await sock.sendMessage(from, { text: "Searching for YouTube videos..." });
        break;

      default:
        await sock.sendMessage(from, { text: "Unknown search command!" });
    }
  }
}
