import { BOT_CONFIG } from "../config.js"

export default {
  command: ["owner"],
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: `👑 Owner: THE PRINCE TECH DEV CONTACT HIM IN WHATSAP OR VIA TELEGRAM AT @Prince000r OR +2349033168045 A💀💀🚫🚫❤️${BOT_CONFIG.OWNER_NUMBER}`
    })
  }
  }
