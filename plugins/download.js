import { BOT_CONFIG } from "../config.js"

export default {
  command: ["download", "dl", "dlmenu"],
  run: async ({ sock, msg }) => {
    const text = `
╭───❒ 📥 DOWNLOAD MENU
│
│ 🎵 *AUDIO*
│ • ${BOT_CONFIG.PREFIX}play <youtube link>
│ • ${BOT_CONFIG.PREFIX}song <youtube link>
│
│ 🎬 *VIDEO*
│ • ${BOT_CONFIG.PREFIX}video <youtube link>
│ • ${BOT_CONFIG.PREFIX}yt <youtube link>
│
│ 📌 *HOW TO USE*
│ Example:
│ ${BOT_CONFIG.PREFIX}play https://youtu.be/xxxx
│
╰───────────────
✅ READY & WORKING
`
    await sock.sendMessage(msg.key.remoteJid, { text })
  }
            }
