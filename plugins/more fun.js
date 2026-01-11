export default {
  command: ["fact", "jokes", "memes", "quotes", "trivia"],

  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid;
    const command = body.split(" ")[0].toLowerCase();

    switch (command) {
      case "fact":
        await sock.sendMessage(from, { text: "Here is a fun fact for you!" });
        break;

      case "jokes":
        await sock.sendMessage(from, { text: "Here is a joke for you: Why don't skeletons fight each other? They don't have the guts!" });
        break;

      case "memes":
        await sock.sendMessage(from, { text: "Here is a meme for you!" });
        break;

      case "quotes":
        await sock.sendMessage(from, { text: "Here's an inspirational quote for you: 'The only way to do great work is to love what you do.' – Steve Jobs" });
        break;

      case "trivia":
        await sock.sendMessage(from, { text: "Here's a trivia question: What is the capital of France?" });
        break;

      default:
        await sock.sendMessage(from, { text: "Unknown fun command!" });
    }
  }
}
