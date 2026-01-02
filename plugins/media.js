export default {
  command: ["sticker"],
  run: async ({ sock, msg }) => {
    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage
    if (!quoted?.imageMessage) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Reply to an image"
      })
    }

    await sock.sendMessage(msg.key.remoteJid, {
      sticker: quoted.imageMessage
    })
  }
}
