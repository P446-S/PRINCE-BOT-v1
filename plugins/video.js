import fetch from "node-fetch"

export default {
  command: ["video", "yt"],
  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid
    const q = body.slice(6)
    if (!q) return sock.sendMessage(from, { text: "❌ Use: .video <yt link>" })

    await sock.sendMessage(from, { text: "⏳ Preparing video..." })

    try {
      const api = `https://api.vevioz.com/api/button/videos/${encodeURIComponent(q)}`
      await sock.sendMessage(from, {
        text: `🎬 *CLICK TO DOWNLOAD*\n\n${api}`
      })
    } catch {
      await sock.sendMessage(from, { text: "❌ Video failed" })
    }
  }
}
