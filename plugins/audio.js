import fetch from "node-fetch"

export default {
  command: ["play", "song"],
  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid
    const q = body.slice(5)
    if (!q) return sock.sendMessage(from, { text: "❌ Use: .play <song>" })

    await sock.sendMessage(from, { text: "⏳ Searching & downloading..." })

    try {
      const api = `https://api.vevioz.com/api/button/mp3/${encodeURIComponent(q)}`
      await sock.sendMessage(from, {
        text: `🎵 *CLICK TO DOWNLOAD*\n\n${api}`
      })
    } catch (e) {
      await sock.sendMessage(from, { text: "❌ Download failed" })
    }
  }
}
