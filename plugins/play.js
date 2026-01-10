import ytdl from "ytdl-core"

export default {
  command: ["play", "song"],
  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid
    const query = body.slice(5).trim()

    if (!query) return sock.sendMessage(from, { text: "❌ Use: .play <song or link>" })

    await sock.sendMessage(from, { text: "⏳ Searching for audio..." })

    try {
      // Check if it's a YouTube link
      const isLink = /(?:https?:\/\/)?(?:www\.)?(?:youtube|youtu)\.(?:be|com)\/(?:watch\?v=|.*?v%3D)([a-zA-Z0-9_-]+)/.test(query)

      if (isLink) {
        const stream = ytdl(query, { filter: "audioonly", quality: "highestaudio" })
        
        // Send audio to WhatsApp
        await sock.sendMessage(from, {
          audio: { stream },
          mimetype: "audio/mp4",
          ptt: false, // Optional: change to true for voice note style
          caption: `🎶 *Now playing:* ${query}`
        })
      } else {
        // Handle text search (if no link)
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
        await sock.sendMessage(from, { text: `Please use a YouTube link like: .play https://youtu.be/example` })
      }
    } catch (error) {
      console.log(error)
      await sock.sendMessage(from, { text: "❌ Error fetching audio." })
    }
  }
}
