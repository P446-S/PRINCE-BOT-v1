export default {
  command: ["yt", "tiktok"],
  run: async ({ sock, msg, body, cmd }) => {
    const link = body.split(" ")[1]
    if (!link) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: `❌ Usage: .${cmd} <link>`
      })
    }

    await sock.sendMessage(msg.key.remoteJid, {
      text: `⬇️ Download request received for:\n${link}\n\n(Downloader placeholder)`
    })
  }
}
