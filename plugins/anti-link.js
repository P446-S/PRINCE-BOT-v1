export default {
  command: [],
  run: async ({ sock, msg, body, isGroup }) => {
    if (!isGroup) return
    if (body.includes("chat.whatsapp.com")) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "🚫 Group link detected!"
      })
    }
  }
}
