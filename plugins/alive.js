export default {
  command: ["alive"],
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "✅ PRINCE BOT is alive && WORKING WITH SPEED 💥⚡!"
    })
  }
}
