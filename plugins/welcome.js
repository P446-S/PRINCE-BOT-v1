import { BOT_CONFIG } from "../config.js"

export default {
  command: ["welcome"],
  run: async ({ sock, msg, body, isOwner }) => {
    if (!isOwner) return

    const arg = body.split(" ")[1]

    if (arg === "on") BOT_CONFIG.WELCOME = true
    if (arg === "off") BOT_CONFIG.WELCOME = false

    await sock.sendMessage(msg.key.remoteJid, {
      text: `👋 Welcome system is now *${BOT_CONFIG.WELCOME ? "ON" : "OFF"}*`
    })
  }
}
