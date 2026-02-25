import fs from "fs"

const SETTINGS_FILE = "./botsettings.json"

const getSettings = () => {
  if (fs.existsSync(SETTINGS_FILE)) {
    try { return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8")) } catch(e) { console.log("Settings load error", e) }
  }
  return {}
}

export default {
  name: "auto-features",
  command: [],   // Empty so it runs automatically

  run: async ({ sock, msg }) => {
    console.log("🔄 AUTO PLUGIN TRIGGERED - Checking settings...")

    const settings = getSettings()
    if (!settings) return console.log("❌ No settings found")

    const from = msg.key.remoteJid
    const sender = msg.key.participant || from || ""
    const isMe = sender.includes(sock.user.id.split(":")[0]) || sender === sock.user.id

    console.log(`📨 Message from: ${sender} | Is me: ${isMe} | Autoreact: ${settings.autoreact}`)

    // ALWAYS ONLINE
    if (settings.alwaysonline) {
      await sock.sendPresenceUpdate("available")
      console.log("✅ Always Online activated")
    }

    // AUTOREACT (NOW FIXED & STRONGER)
    if (settings.autoreact && !isMe) {
      const reacts = ["❤️","🔥","😂","😍","🥰","👏","🙌","🎉","💯","😎"]
      const random = reacts[Math.floor(Math.random() * reacts.length)]
      console.log(`🎯 Sending reaction: ${random}`)
      
      await sock.sendMessage(from, {
        react: { text: random, key: msg.key }
      }).catch(e => console.log("React error:", e))
    }

    // AUTOREAD
    if (settings.autoread && !isMe) {
      await sock.readMessages([msg.key])
      console.log("📖 Message read")
    }

    // AUTOTYPE
    if (settings.autotype && !isMe) {
      await sock.sendPresenceUpdate("composing", from)
      setTimeout(() => sock.sendPresenceUpdate("paused", from), 2500)
      console.log("⌨️ Typing simulation")
    }

    // CHATBOT
    if (settings.chatbot && !isMe) {
      const text = msg.message?.conversation || "Hi"
      await sock.sendMessage(from, { text: "🤖 " + text })
      console.log("🤖 Chatbot replied")
    }

    // AUTOVIEW STATUS
    if (settings.autoviewstatus && from.includes("status")) {
      console.log("👀 Status viewed")
    }
  }
}
