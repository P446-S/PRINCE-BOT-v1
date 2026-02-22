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
    const base = "https://apis.davidcyril.name.ng"   // ← David Cyril API

    try {

      // 📥 DOWNLOAD COMMANDS (using David Cyril API)
      if (cmd === "tiktok") {
        if (!url) return sock.sendMessage(from, { text: "❌ Example: .tiktok https://vt.tiktok.com/xxxx/" }, { quoted: msg })
        const res = await axios.get(`\( {base}/downloader/tiktok?url= \){encodeURIComponent(url)}`)
        const vid = res.data.result?.url || res.data.video || res.data.play
        return sock.sendMessage(from, { video: { url: vid }, caption: `✅ TikTok Downloaded\nBy David Cyril API` }, { quoted: msg })
      }

      if (cmd === "facebook" || cmd === "instagram") {
        if (!url) return sock.sendMessage(from, { text: `❌ Example: .${cmd} https://...` }, { quoted: msg })
        const res = await axios.get(`\( {base}/downloader/ \){cmd}?url=${encodeURIComponent(url)}`)
        const mediaUrl = res.data.result?.url || res.data.hd || res.data.video || res.data.url
        const isVideo = mediaUrl?.includes(".mp4") || true
        return sock.sendMessage(from, isVideo 
          ? { video: { url: mediaUrl }, caption: `✅ ${cmd.toUpperCase()} Downloaded` }
          : { image: { url: mediaUrl }, caption: `✅ ${cmd.toUpperCase()} Downloaded` }, { quoted: msg })
      }

      if (cmd === "apk") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .apk whatsapp" }, { quoted: msg })
        const res = await axios.get(`\( {base}/search/apk?query= \){encodeURIComponent(text)}`)
        const apk = res.data.result?.[0] || res.data
        return sock.sendMessage(from, { 
          text: `📱 *APK Found*\nName: ${apk.name || text}\nDownload: ${apk.link || apk.download}` 
        }, { quoted: msg })
      }

      if (cmd === "mediafire") {
        if (!url) return sock.sendMessage(from, { text: "❌ Example: .mediafire https://..." }, { quoted: msg })
        const res = await axios.get(`\( {base}/downloader/mediafire?url= \){encodeURIComponent(url)}`)
        const f = res.data.result
        return sock.sendMessage(from, { document: { url: f.link || f.download }, fileName: f.filename || "file", caption: `✅ MediaFire - David Cyril API` }, { quoted: msg })
      }

      // Other downloads (direct + David Cyril style)
      if (cmd === "gdrive") {
        if (!url) return sock.sendMessage(from, { text: "❌ Example: .gdrive https://drive.google.com/..." }, { quoted: msg })
        const id = url.match(/[-\w]{25,}/)[0]
        const direct = `https://drive.google.com/uc?id=${id}&export=download`
        return sock.sendMessage(from, { document: { url: direct }, caption: "✅ Google Drive" }, { quoted: msg })
      }

      if (cmd === "gitclone") {
        if (!url) return sock.sendMessage(from, { text: "❌ Example: .gitclone https://github.com/user/repo" }, { quoted: msg })
        const [, user, repo] = url.match(/github\.com\/([^\/]+)\/([^\/]+)/i)
        const zip = `https://github.com/\( {user}/ \){repo}/archive/main.zip`
        return sock.sendMessage(from, { document: { url: zip }, fileName: `${repo}.zip`, caption: `✅ ${repo} - Cloned` }, { quoted: msg })
      }

      if (cmd === "xvideos" || cmd === "savestatus" || cmd === "download" || cmd === "itunes") {
        return sock.sendMessage(from, { text: `✅ .${cmd} ready!\nUse example from your list.` }, { quoted: msg })
      }

      // 🖼 PHOTO COMMANDS (David Cyril Maker API)
      const photoCmds = ["advancedglow","blackpinklogo","blackpinkstyle","deletingtext","flag3dtext","flagtext","freecreate","galaxystyles","glowingtext","gradienttext","writetext","lighteffects","logomaker","matrix","neoglitch","papercutsstyle","sand","watercolortext"]
      
      if (photoCmds.includes(cmd)) {
        if (!text) return sock.sendMessage(from, { text: `❌ Example: .${cmd} Chinenye` }, { quoted: msg })

        const res = await axios.get(`\( {base}/maker/ \){cmd}?text=${encodeURIComponent(text)}`)
        const imgUrl = res.data.result || res.data.url || res.data.image || res.data.link

        return sock.sendMessage(from, { 
          image: { url: imgUrl }, 
          caption: `✨ ${cmd.toUpperCase()} Effect\nMade with David Cyril API` 
        }, { quoted: msg })
      }

    } catch (err) {
      const errMsg = err.response?.data ? JSON.stringify(err.response.data).slice(0,300) : err.message
      console.error(`[${cmd}] David Cyril API Error:`, errMsg)
      
      sock.sendMessage(from, { 
        text: `❌ Error with .\( {cmd}\n\nDavid Cyril API message:\n \){errMsg}\n\nReply with this full error so I fix it in 10 seconds!` 
      }, { quoted: msg })
    }
  }
}
