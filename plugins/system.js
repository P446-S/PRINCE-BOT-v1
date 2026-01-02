import os from "os"

export default {
  command: ["system", "server"],
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: `
🖥 SYSTEM INFO

• Platform: ${os.platform()}
• RAM: ${(os.totalmem() / 1024 / 1024).toFixed(0)} MB
• Uptime: ${Math.floor(os.uptime())}s
`
    })
  }
}
