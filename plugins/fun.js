export default {
  command: ["joke", "quote", "fact", "love", "insult"],
  run: async ({ sock, msg, text }) => {
    const from = msg.key.remoteJid
    const cmd = text.slice(1).toLowerCase()

    const data = {
      joke: "😂 Why did the bot crash? Too many commands!",
      quote: "💬 Never give up.",
      fact: "🧠 WhatsApp bots use Baileys",
      love: "❤️ I love you",
      insult: "😏 You are too curious"
    }

    await sock.sendMessage(from, { text: data[cmd] })
  }
}
