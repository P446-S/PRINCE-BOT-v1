import { BOT_CONFIG } from "../config.js"

export default {
  command: ["owner"],
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: `👑 Owner: ${BOT_CONFIG.OWNER_NUMBER}`
    })
  }
  }
