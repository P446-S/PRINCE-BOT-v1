export default {
  command: ["group"],
  run: async ({ sock, msg, isGroup }) => {
    if (!isGroup) return

    const meta = await sock.groupMetadata(msg.key.remoteJid)

    await sock.sendMessage(msg.key.remoteJid, {
      text: `
👥 *GROUP INFO*

📛 Name: ${meta.subject}
👤 Members: ${meta.participants.length}
`
    })
  }
}
