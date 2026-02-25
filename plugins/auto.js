import fs from "fs"

const SETTINGS_FILE = "./botsettings.json"
const getSettings = () => {
  if (fs.existsSync(SETTINGS_FILE)) {
    try { return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8")) } catch(e) {}
  }
  return {}
}

export default {
  name: "auto-settings",
  run: async ({ sock, msg, isStatus }) => {
    const settings = getSettings()
    if (!settings) return

    const from = msg.key.remoteJid
    const sender = msg.key.participant || from
    const isMe = sender === sock.user.id.split(":")[0] + "@s.whatsapp.net"

    // ALWAYS ONLINE
    if (settings.alwaysonline) await sock.sendPresenceUpdate("available", from)

    // AUTOREACT
    if (settings.autoreact && !isMe) {
      const reacts = ["❤️","🔥","😂","😍","🥰","👏","🙌","🎉","💯"]
      const random = reacts[Math.floor(Math.random()*reacts.length)]
      await sock.sendMessage(from, { react: { text: random, key: msg.key } })
    }

    // AUTOREAD
    if (settings.autoread && !isMe) await sock.readMessages([msg.key])

    // AUTOTYPE
    if (settings.autotype && !isMe) {
      await sock.sendPresenceUpdate("composing", from)
      setTimeout(() => sock.sendPresenceUpdate("paused", from), 2500)
    }

    // AUTORECORD / AUTORECORDTYPING
    if ((settings.autorecord || settings.autorecordtyping) && !isMe) {
      await sock.sendPresenceUpdate("recording", from)
      setTimeout(() => sock.sendPresenceUpdate("paused", from), 3000)
    }

    // AUTOVIEW STATUS
    if (settings.autoviewstatus && isStatus) await sock.sendMessage("status@broadcast", { text: "👀" })

    // CHATBOT
    if (settings.chatbot && !isMe) {
      const reply = msg.message.conversation ? "🤖 " + msg.message.conversation : "Hello! Chatbot is ON"
      await sock.sendMessage(from, { text: reply })
    }

    // ANTIBUG (basic)
    if (settings.antibug && msg.message && Object.keys(msg.message).length > 10) {
      await sock.sendMessage(from, { delete: msg.key })
    }
  }
}
