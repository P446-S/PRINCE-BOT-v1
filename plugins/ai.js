export default {
  command: ["ai", "ask"],
  run: async ({ sock, msg, body }) => {
    const q = body.split(" ").slice(1).join(" ")
    if (!q) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Ask something\nExample: .ai what is life?"
      })
    }

    await sock.sendMessage(msg.key.remoteJid, {
      text: `🤖 AI Response:\n\nYou asked: *${q}*\n\n(This is a placeholder AI)`
    })
  }
}
