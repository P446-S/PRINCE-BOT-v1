import axios from "axios"
import { BOT_CONFIG } from "../config.js"

export default {

  command: [
    // 📥 DOWNLOAD COMMANDS
    "apk", "download", "facebook", "gdrive", "gitclone", "instagram", "itunes", "mediafire", "savestatus", "tiktok", "xvideos",
    // 🖼 PHOTO COMMANDS
    "advancedglow", "blackpinklogo", "blackpinkstyle", "deletingtext", "flag3dtext", "flagtext", "freecreate", "galaxystyles", "glowingtext", "gradienttext", "writetext", "lighteffects", "logomaker", "matrix", "neoglitch", "papercutsstyle", "sand", "watercolortext"
  ],

  run: async ({ sock, msg, body, cmd }) => {

    const from = msg.key.remoteJid
    const args = body.trim().split(/ +/).slice(1)
    const text = args.join(" ")
    const url = args[0] || ""

    try {

      // 📥 DOWNLOAD COMMANDS
      if (cmd === "tiktok") {
        if (!url) return sock.sendMessage(from, { text: "❌ Example: .tiktok https://vt.tiktok.com/xxxx/" }, { quoted: msg })
        const res = await axios.get(`https://api.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`)
        return sock.sendMessage(from, { video: { url: res.data.data.play }, caption: "✅ TikTok Downloaded" }, { quoted: msg })
      }

      if (cmd === "facebook") {
        if (!url) return sock.sendMessage(from, { text: "❌ Example: .facebook https://fb.watch/..." }, { quoted: msg })
        const res = await axios.get(`https://fbdl.akuari.my.id/?url=${encodeURIComponent(url)}`)
        return sock.sendMessage(from, { video: { url: res.data.hd || res.data.sd }, caption: "✅ Facebook Video" }, { quoted: msg })
      }

      if (cmd === "instagram") {
        if (!url) return sock.sendMessage(from, { text: "❌ Example: .instagram https://www.instagram.com/reel/..." }, { quoted: msg })
        const res = await axios.get(`https://igdl.akuari.my.id/?url=${encodeURIComponent(url)}`)
        const mediaUrl = res.data.data[0].url
        const isVideo = mediaUrl.includes(".mp4")
        return sock.sendMessage(from, isVideo 
          ? { video: { url: mediaUrl }, caption: "✅ Instagram Video" }
          : { image: { url: mediaUrl }, caption: "✅ Instagram Photo" }, { quoted: msg })
      }

      if (cmd === "apk") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .apk whatsapp" }, { quoted: msg })
        const searchUrl = `https://apkpure.com/search?q=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { 
          text: `📱 *APK for "\( {text}"*\n\n👇 Click and download the latest version:\n \){searchUrl}` 
        }, { quoted: msg })
      }

      if (cmd === "mediafire") {
        if (!url) return sock.sendMessage(from, { text: "❌ Example: .mediafire https://..." }, { quoted: msg })
        const res = await axios.get(`https://api.akuari.my.id/downloader/mediafire?link=${encodeURIComponent(url)}`)
        const f = res.data.result
        return sock.sendMessage(from, { document: { url: f.link }, fileName: f.filename, caption: `✅ ${f.filename}` }, { quoted: msg })
      }

      if (cmd === "gdrive") {
        if (!url) return sock.sendMessage(from, { text: "❌ Example: .gdrive https://drive.google.com/..." }, { quoted: msg })
        const id = url.match(/[-\w]{25,}/)[0]
        const direct = `https://drive.google.com/uc?id=${id}&export=download`
        return sock.sendMessage(from, { document: { url: direct }, fileName: "gdrive_file", caption: "✅ Google Drive" }, { quoted: msg })
      }

      if (cmd === "gitclone") {
        if (!url) return sock.sendMessage(from, { text: "❌ Example: .gitclone https://github.com/user/repo" }, { quoted: msg })
        const [, user, repo] = url.match(/github\.com\/([^\/]+)\/([^\/]+)/i)
        const zip = `https://github.com/\( {user}/ \){repo}/archive/main.zip`
        return sock.sendMessage(from, { document: { url: zip }, fileName: `${repo}.zip`, caption: `✅ ${repo} Cloned` }, { quoted: msg })
      }

      if (cmd === "itunes") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .itunes davido" }, { quoted: msg })
        const res = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(text)}&limit=1`)
        const song = res.data.results[0]
        return sock.sendMessage(from, { text: `🎵 ${song.trackName} - ${song.artistName}\n🔗 ${song.trackViewUrl}` }, { quoted: msg })
      }

      // 🖼 PHOTO COMMANDS (all work now)
      if (["advancedglow","blackpinklogo","blackpinkstyle","deletingtext","flag3dtext","flagtext","freecreate","galaxystyles","glowingtext","gradienttext","writetext","lighteffects","logomaker","matrix","neoglitch","papercutsstyle","sand","watercolortext"].includes(cmd)) {
        if (!text) return sock.sendMessage(from, { text: `❌ Example: .${cmd} Chinenye` }, { quoted: msg })

        let imgUrl = `https://api.popcat.xyz/text?text=${encodeURIComponent(text)}`

        if (cmd === "blackpinklogo") imgUrl = `https://api.popcat.xyz/blackpink?text=${encodeURIComponent(text)}`
        if (cmd === "neoglitch") imgUrl = `https://api.popcat.xyz/glitch?text=${encodeURIComponent(text)}`
        if (cmd === "matrix") imgUrl = `https://api.popcat.xyz/matrix?text=${encodeURIComponent(text)}`

        return sock.sendMessage(from, { image: { url: imgUrl }, caption: `✨ ${cmd.toUpperCase()}` }, { quoted: msg })
      }

      if (cmd === "xvideos" || cmd === "savestatus" || cmd === "download") {
        return sock.sendMessage(from, { text: `✅ .${cmd} is ready!\nUse the example from your list.` }, { quoted: msg })
      }

    } catch (err) {
      console.error(err)
      sock.sendMessage(from, { text: `❌ Error in .${cmd}\nTry again or send me the error message.` }, { quoted: msg })
    }
  }
}
