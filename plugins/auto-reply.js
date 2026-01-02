export default {
  command: [],
  run: async ({ sock, msg, body }) => {
    if (body.toLowerCase() === "hi") {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "Hello 👋 How can I help you?"
      })
    }

    if (body.toLowerCase() === "hello") {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "Hi there 😊"
      })
    }
  }
}
