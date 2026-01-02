export default {
  command: ["clear"],
  run: async ({ sock, msg, isGroup }) => {
    if (!isGroup) return
    await sock.sendMessage(msg.key.remoteJid, {
      text: "🧹 Cleanup done (placeholder)"
    })
  }
}
