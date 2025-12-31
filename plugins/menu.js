export default {
  command: ["menu"],
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: `🤖 *PRINCE BOT MENU*
• .menu
• .ping
• .alive
• .owner
• .hi
• .joke
• .quote`
    })
  }
  }
