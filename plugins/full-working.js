const axios = require("axios")
const yts = require("yt-search")

module.exports = {

  // ============================
  // 📜 RELIGION COMMANDS
  // ============================

  bible: {
    name: "bible",
    category: "religion",
    async execute(sock, m, args) {
      if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: "Example: .bible John 3:16" }, { quoted: m })
      const query = args.join(" ")
      const res = await axios.get(`https://bible-api.com/${query}`)
      sock.sendMessage(m.key.remoteJid, {
        text: `📖 ${res.data.reference}\n\n${res.data.text}`
      }, { quoted: m })
    }
  },

  quran: {
    name: "quran",
    category: "religion",
    async execute(sock, m, args) {
      if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: "Example: .quran 1" }, { quoted: m })
      const res = await axios.get(`https://api.alquran.cloud/v1/surah/${args[0]}/en.asad`)
      let ayah = res.data.data.ayahs.map(a => `${a.numberInSurah}. ${a.text}`).join("\n\n")
      sock.sendMessage(m.key.remoteJid, {
        text: `📖 Surah ${res.data.data.englishName}\n\n${ayah}`
      }, { quoted: m })
    }
  },

  // ============================
  // 🔍 SEARCH COMMANDS
  // ============================

  define: {
    name: "define",
    category: "search",
    async execute(sock, m, args) {
      if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: "Example: .define love" }, { quoted: m })
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${args[0]}`)
      const meaning = res.data[0].meanings[0].definitions[0].definition
      sock.sendMessage(m.key.remoteJid, {
        text: `📘 ${args[0]}\n\n${meaning}`
      }, { quoted: m })
    }
  },

  weather: {
    name: "weather",
    category: "search",
    async execute(sock, m, args) {
      if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: "Example: .weather Lagos" }, { quoted: m })
      const res = await axios.get(`https://wttr.in/${args.join(" ")}?format=3`)
      sock.sendMessage(m.key.remoteJid, {
        text: `🌤 ${res.data}`
      }, { quoted: m })
    }
  },

  yts: {
    name: "yts",
    category: "search",
    async execute(sock, m, args) {
      if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: "Example: .yts Burna Boy" }, { quoted: m })
      const search = await yts(args.join(" "))
      const vid = search.videos[0]
      sock.sendMessage(m.key.remoteJid, {
        text: `🎬 ${vid.title}\n⏱ ${vid.timestamp}\n👁 ${vid.views}\n🔗 ${vid.url}`
      }, { quoted: m })
    }
  },

  // ============================
  // 📥 DOWNLOAD COMMAND
  // ============================

  song2: {
    name: "song2",
    category: "download",
    async execute(sock, m, args) {
      if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: "Example: .song2 Davido" }, { quoted: m })
      const search = await yts(args.join(" "))
      const vid = search.videos[0]
      sock.sendMessage(m.key.remoteJid, {
        text: `🎵 ${vid.title}\n🔗 ${vid.url}\n\nUse any YouTube MP3 downloader site to download.`
      }, { quoted: m })
    }
  },

  // ============================
  // 👑 OWNER COMMAND
  // ============================

  owner: {
    name: "owner",
    category: "owner",
    async execute(sock, m) {
      sock.sendMessage(m.key.remoteJid, {
        text: "👑 BOT OWNER\nName: Prince\nNumber: +234XXXXXXXXXX"
      }, { quoted: m })
    }
  },

  // ============================
  // ⚙ SETTINGS
  // ============================

  setprefix: {
    name: "setprefix",
    category: "settings",
    async execute(sock, m, args) {
      if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: "Example: .setprefix !" }, { quoted: m })
      global.prefix = args[0]
      sock.sendMessage(m.key.remoteJid, {
        text: `✅ Prefix changed to ${args[0]}`
      }, { quoted: m })
    }
  },

  // ============================
  // 🎨 PHOTO / IMAGE COMMAND
  // ============================

  glowingtext: {
    name: "glowingtext",
    category: "photo",
    async execute(sock, m, args) {
      if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: "Example: .glowingtext Prince" }, { quoted: m })
      const url = `https://api.popcat.xyz/text?text=${args.join(" ")}`
      sock.sendMessage(m.key.remoteJid, {
        image: { url },
        caption: "✨ Glowing Text"
      }, { quoted: m })
    }
  }

}
