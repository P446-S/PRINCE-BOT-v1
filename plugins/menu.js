export default {
  command: ["menu", "help"],
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: `
🤖 *PRINCE BOT MENU*

📌 BASIC
• .menu
• .alive
• .ping
• .info

👑 OWNER
• .owner
• .public
• .private

👥 GROUP
• .kick
• .add
• .promote
• .demote
• .tagall
• .open
• .close

🛠 UTILITY
• .uptime

🎉 AUTO
• hi → auto reply

`
    })
  }
  }
