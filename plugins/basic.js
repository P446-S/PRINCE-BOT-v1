export default {
  command: [
    "hi",
    "hello",
    "help",
    "bot",
    "info",
    "about",
    "rules",
    "support",
    "speed",
    "uptime"
  ],
  run: async ({ sock, msg, text }) => {
    const from = msg.key.remoteJid
    const cmd = text.slice(1).toLowerCase()

    const replies = {
      hi: "👋 Hi!",
      hello: "Hello 👋",
      help: "Type .menu",
      bot: "🤖 I am PRINCE BOT",
      info: "ℹ️ WhatsApp MD bot",
      about: "👑 PRINCE BOT",
      rules: "🚫 No spam",
      support: "📞 Contact owner",
      speed: "⚡ Fast",
      uptime: "🕒 Running with speed"
    }

    await sock.sendMessage(from, { text: replies[cmd] })
  }
    }
