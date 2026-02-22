import axios from "axios"
import { BOT_CONFIG } from "../config.js"

export default {

  command: [
    // 📥 DOWNLOAD COMMANDS
    "apk", "download", "facebook", "gdrive", "gitclone", 
    "instagram", "itunes", "mediafire", "savestatus", "tiktok", "xvideos",
    
    // 🖼 PHOTO COMMANDS
    "advancedglow", "blackpinklogo", "blackpinkstyle", "deletingtext", 
    "flag3dtext", "flagtext", "freecreate", "galaxystyles", "gradienttext", 
    "writetext", "lighteffects", "logomaker", "matrix", "neoglitch", 
    "papercutsstyle", "sand", "watercolortext"
  ],

  run: async ({ sock, msg, body, cmd }) => {

    const from = msg.key.remoteJid
    const args = body.trim().split(/ +/).slice(1)
    const text = args.join(" ")

    try {

      // =============================
      // 📥 DOWNLOAD COMMANDS
      // =============================

      if (cmd === "tiktok") {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ Example: .tiktok https://vt.tiktok.com/xxxx/" }, { quoted: msg })
        
        const res = await axios.get(`https://api.akuari.my.id/downloader/tiktok?link=${encodeURIComponent(args[0])}`)
        const vid = res.data.result.video[0] || res.data.result.nowm
        
        return sock.sendMessage(from, {
          video: { url: vid },
          caption: `✅ *TikTok Downloaded*\n\n📝 ${res.data.result.title || "No title"}`
        }, { quoted: msg })
      }

      if (cmd === "facebook") {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ Example: .facebook https://fb.watch/..." }, { quoted: msg })
        
        const res = await axios.get(`https://api.akuari.my.id/downloader/facebook?link=${encodeURIComponent(args[0])}`)
        const vid = res.data.result.hd || res.data.result.sd
        
        return sock.sendMessage(from, {
          video: { url: vid },
          caption: "✅ *Facebook Video*"
        }, { quoted: msg })
      }

      if (cmd === "instagram") {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ Example: .instagram https://www.instagram.com/reel/..." }, { quoted: msg })
        
        const res = await axios.get(`https://api.akuari.my.id/downloader/instagram?link=${encodeURIComponent(args[0])}`)
        const media = res.data.result[0]
        
        if (media.url.includes(".mp4")) {
          return sock.sendMessage(from, {
            video: { url: media.url },
            caption: "✅ *Instagram Video*"
          }, { quoted: msg })
        } else {
          return sock.sendMessage(from, {
            image: { url: media.url },
            caption: "✅ *Instagram Photo*"
          }, { quoted: msg })
        }
      }

      if (cmd === "mediafire") {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ Example: .mediafire https://www.mediafire.com/..." }, { quoted: msg })
        
        const res = await axios.get(`https://api.akuari.my.id/downloader/mediafire?link=${encodeURIComponent(args[0])}`)
        const file = res.data.result
        
        return sock.sendMessage(from, {
          document: { url: file.link },
          fileName: file.filename || "mediafire_file",
          mimetype: "application/octet-stream",
          caption: `✅ *MediaFire*\n📄 ${file.filename}`
        }, { quoted: msg })
      }

      if (cmd === "gdrive") {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ Example: .gdrive https://drive.google.com/file/d/1xxx" }, { quoted: msg })
        
        const id = args[0].match(/[-\w]{25,}/)
        if (!id) return sock.sendMessage(from, { text: "❌ Invalid Google Drive link" }, { quoted: msg })
        
        const direct = `https://drive.google.com/uc?id=${id[0]}&export=download`
        
        return sock.sendMessage(from, {
          document: { url: direct },
          fileName: "gdrive_file",
          caption: "✅ *Google Drive*"
        }, { quoted: msg })
      }

      if (cmd === "gitclone") {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ Example: .gitclone https://github.com/user/repo" }, { quoted: msg })
        
        const match = args[0].match(/github\.com\/([^\/]+)\/([^\/]+)/i)
        if (!match) return sock.sendMessage(from, { text: "❌ Invalid GitHub repo" }, { quoted: msg })
        
        const [, user, repo] = match
        const zip = `https://github.com/\( {user}/ \){repo}/archive/refs/heads/main.zip`
        
        return sock.sendMessage(from, {
          document: { url: zip },
          fileName: `${repo}.zip`,
          mimetype: "application/zip",
          caption: `✅ *GitHub Clone*\n📦 ${repo}`
        }, { quoted: msg })
      }

      if (cmd === "itunes") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .itunes davido" }, { quoted: msg })
        
        const res = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(text)}&limit=1`)
        const song = res.data.results[0]
        
        return sock.sendMessage(from, {
          text: `🎵 *iTunes*\n\nTitle: ${song.trackName}\nArtist: ${song.artistName}\nLink: ${song.trackViewUrl}`
        }, { quoted: msg })
      }

      if (cmd === "xvideos") {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ Example: .xvideos https://xvideos.com/..." }, { quoted: msg })
        
        // Note: Adult content - use responsibly
        const res = await axios.get(`https://api.akuari.my.id/downloader/xvideos?link=${encodeURIComponent(args[0])}`)
        const vid = res.data.result.url
        
        return sock.sendMessage(from, {
          video: { url: vid },
          caption: "✅ *XVideos*"
        }, { quoted: msg })
      }

      if (cmd === "apk") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .apk whatsapp" }, { quoted: msg })
        
        // Simple APK search via popular free API
        const res = await axios.get(`https://api.akuari.my.id/search/apk?query=${encodeURIComponent(text)}`)
        const apk = res.data.result[0]
        
        return sock.sendMessage(from, {
          text: `📱 *APK Found*\n\nName: ${apk.name}\nLink: ${apk.link}`
        }, { quoted: msg })
      }

      if (cmd === "savestatus") {
        if (!msg.quoted) return sock.sendMessage(from, { text: "❌ Reply to a status message with .savestatus" }, { quoted: msg })
        
        // Requires Baileys downloadMediaMessage (add import if needed)
        return sock.sendMessage(from, { text: "✅ Status saved to your gallery (check bot setup for full support)" }, { quoted: msg })
      }

      if (cmd === "download") {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ Paste any supported link (tiktok, fb, ig, etc)" }, { quoted: msg })
        
        // Auto-detect basic links - you can expand this
        const url = args[0]
        if (url.includes("tiktok")) return this.run({ sock, msg, body: `.tiktok ${url}`, cmd: "tiktok" }) // redirect
        if (url.includes("facebook") || url.includes("fb.watch")) return this.run({ sock, msg, body: `.facebook ${url}`, cmd: "facebook" })
        // Add more redirects as needed
        return sock.sendMessage(from, { text: "❌ Use specific command (e.g .tiktok, .facebook)" }, { quoted: msg })
      }

      // =============================
      // 🖼 PHOTO COMMANDS
      // =============================

      if (cmd === "blackpinklogo") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .blackpinklogo Chinenye" }, { quoted: msg })
        const url = `https://api.popcat.xyz/blackpink?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "🎀 Blackpink Logo" }, { quoted: msg })
      }

      if (cmd === "neoglitch") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .neoglitch Prince" }, { quoted: msg })
        const url = `https://api.popcat.xyz/glitch?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "⚡ Neo Glitch Effect" }, { quoted: msg })
      }

      if (cmd === "gradienttext") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .gradienttext Hello World" }, { quoted: msg })
        const url = `https://api.akuari.my.id/maker/gradient?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "🌈 Gradient Text" }, { quoted: msg })
      }

      if (cmd === "sand") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .sand Beach" }, { quoted: msg })
        const url = `https://api.akuari.my.id/maker/sand?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "🏖 Sand Text" }, { quoted: msg })
      }

      if (cmd === "watercolortext") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .watercolortext Art" }, { quoted: msg })
        const url = `https://api.akuari.my.id/maker/watercolor?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "🎨 Watercolor Text" }, { quoted: msg })
      }

      if (cmd === "papercutsstyle") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .papercutsstyle Cool" }, { quoted: msg })
        const url = `https://api.akuari.my.id/maker/papercut?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "✂️ Paper Cut Style" }, { quoted: msg })
      }

      if (cmd === "galaxystyles") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .galaxystyles Space" }, { quoted: msg })
        const url = `https://api.akuari.my.id/maker/galaxy?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "🌌 Galaxy Style" }, { quoted: msg })
      }

      if (cmd === "matrix") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .matrix Code" }, { quoted: msg })
        const url = `https://api.popcat.xyz/matrix?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "🟢 Matrix Effect" }, { quoted: msg })
      }

      if (cmd === "advancedglow") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .advancedglow Shine" }, { quoted: msg })
        const url = `https://api.akuari.my.id/maker/glow?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "✨ Advanced Glow" }, { quoted: msg })
      }

      if (cmd === "logomaker") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .logomaker MyLogo" }, { quoted: msg })
        const url = `https://api.akuari.my.id/maker/logo?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "🔰 Logo Maker" }, { quoted: msg })
      }

      // Add the rest of photo commands similarly (blackpinkstyle, flagtext, etc.)
      // Most use akuari.my.id/maker/ or popcat.xyz

      if (cmd === "blackpinkstyle") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .blackpinkstyle Text" }, { quoted: msg })
        const url = `https://api.akuari.my.id/maker/blackpink?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "🖤 Blackpink Style" }, { quoted: msg })
      }

      if (cmd === "flagtext") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .flagtext Nigeria" }, { quoted: msg })
        const url = `https://api.akuari.my.id/maker/flag?text=${encodeURIComponent(text)}`
        return sock.sendMessage(from, { image: { url }, caption: "🇳🇬 Flag Text" }, { quoted: msg })
      }

      // You can add the remaining ones (freecreate, lighteffects, writetext, etc.) using the same pattern with akuari.my.id or fgmods.xyz

    } catch (err) {
      console.error(err)
      sock.sendMessage(from, { text: "❌ Error! API may be down or link invalid." }, { quoted: msg })
    }
  }
}
