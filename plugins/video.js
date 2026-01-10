import ytdl from "ytdl-core"

export default {
  command: ["video", "yt"],
  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid
    const query = body.slice(6).trim()

    if (!query) return sock.sendMessage(from, { text: "❌ Use: .video <youtube link>" })

    await sock.sendMessage(from, { text: "⏳ Preparing video..." })

    try {
      const stream = ytdl(query, { quality: "18" }) // Quality 18 is good for low file size
      await sock.sendMessage(from, {
        video: { stream },
        caption: `🎬 *Now playing video:* ${query}`
      })
    } catch (error) {
      console.log(error)
      await sock.sendMessage(from, { text: "❌ Error fetching video." })
    }
  }
            }
