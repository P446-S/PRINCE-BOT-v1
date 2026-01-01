export default {
  command: ["menu"],
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: `
🤖 *PRINCE BOT MENU*

• .menu
• .alive
• .ping
• .owner
• .public / .private
• .kick / .add / .promote
• .welcome on/off
• .info
• .uptime
• .runtime
`
    })
  }
}
