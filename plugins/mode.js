import { BOT_CONFIG } from "../config.js"

export default {
  command: ["public", "private"],
  run: async ({ cmd, isOwner, sock, msg }) => {
    if (!isOwner) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Owner only"
      })
    }

    BOT_CONFIG.MODE = cmd

    await sock.sendMessage(msg.key.remoteJid, {
      text: `✅ Bot mode set to *${cmd}*`
    })
  }
}
