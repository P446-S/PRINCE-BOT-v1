import axios from "axios"
import yts from "yt-search"
import fs from "fs"
import { BOT_CONFIG } from "../config.js"

export default {

  command: [
    "bible",
    "quran",
    "define",
    "weather",
    "yts",
    "song2",
    "owner",
    "setprefix",
    "image",
    "glowingtext"
  ],

  run: async ({ sock, msg, body, cmd, isOwner }) => {

    const from = msg.key.remoteJid
    const args = body.trim().split(" ").slice(1)

    try {

      // =============================
      // 📜 RELIGION
      // =============================

      if (cmd === "bible") {
        if (!args[0])
          return sock.sendMessage(from, { text: "Example: .bible John 3:16" }, { quoted: msg })

        const query = args.join(" ")
        const res = await axios.get(`https://bible-api.com/${query}`)
        return sock.sendMessage(from, {
          text: `📖 ${res.data.reference}\n\n${res.data.text}`
        }, { quoted: msg })
      }

      if (cmd === "quran") {
        if (!args[0])
          return sock.sendMessage(from, { text: "Example: .quran 1" }, { quoted: msg })

        const res = await axios.get(`https://api.alquran.cloud/v1/surah/${args[0]}/en.asad`)
        let ayah = res.data.data.ayahs
          .map(a => `${a.numberInSurah}. ${a.text}`)
          .join("\n\n")

        return sock.sendMessage(from, {
          text: `📖 Surah ${res.data.data.englishName}\n\n${ayah}`
        }, { quoted: msg })
      }

      // =============================
      // 🔍 SEARCH
      // =============================

      if (cmd === "define") {
        if (!args[0])
          return sock.sendMessage(from, { text: "Example: .define love" }, { quoted: msg })

        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${args[0]}`)
        const meaning = res.data[0].meanings[0].definitions[0].definition

        return sock.sendMessage(from, {
          text: `📘 ${args[0]}\n\n${meaning}`
        }, { quoted: msg })
      }

      if (cmd === "weather") {
        if (!args[0])
          return sock.sendMessage(from, { text: "Example: .weather Lagos" }, { quoted: msg })

        const res = await axios.get(`https://wttr.in/${args.join(" ")}?format=3`)

        return sock.sendMessage(from, {
          text: `🌤 ${res.data}`
        }, { quoted: msg })
      }

      if (cmd === "yts") {
        if (!args[0])
          return sock.sendMessage(from, { text: "Example: .yts Burna Boy" }, { quoted: msg })

        const search = await yts(args.join(" "))
        const vid = search.videos[0]

        return sock.sendMessage(from, {
          text: `🎬 ${vid.title}\n⏱ ${vid.timestamp}\n👁 ${vid.views}\n🔗 ${vid.url}`
        }, { quoted: msg })
      }

      // =============================
      // 📥 DOWNLOAD
      // =============================

      if (cmd === "song2") {
        if (!args[0])
          return sock.sendMessage(from, { text: "Example: .song2 Davido" }, { quoted: msg })

        const search = await yts(args.join(" "))
        const vid = search.videos[0]

        return sock.sendMessage(from, {
          text: `🎵 ${vid.title}\n🔗 ${vid.url}\n\nDownload using any YouTube MP3 website.`
        }, { quoted: msg })
      }

      // =============================
      // 👑 OWNER
      // =============================

      if (cmd === "owner") {
        return sock.sendMessage(from, {
          text: `👑 BOT OWNER\nNumber: ${BOT_CONFIG.OWNER[0]}`
        }, { quoted: msg })
      }

      // =============================
      // ⚙ SETTINGS
      // =============================

      if (cmd === "setprefix") {
        if (!isOwner)
          return sock.sendMessage(from, { text: "❌ Owner only command." }, { quoted: msg })

        if (!args[0])
          return sock.sendMessage(from, { text: "Example: .setprefix !" }, { quoted: msg })

        BOT_CONFIG.PREFIX = args[0]

        return sock.sendMessage(from, {
          text: `✅ Prefix changed to: ${args[0]}`
        }, { quoted: msg })
      }

      // =============================
      // 🖼 IMAGE SEARCH
      // =============================

      if (cmd === "image") {
        if (!args[0])
          return sock.sendMessage(from, { text: "Example: .image lion" }, { quoted: msg })

        const res = await axios.get(
          `https://api.unsplash.com/search/photos?query=${args.join(" ")}&client_id=YOUR_UNSPLASH_KEY`
        )

        const img = res.data.results[0].urls.small

        return sock.sendMessage(from, {
          image: { url: img },
          caption: `🖼 Result for ${args.join(" ")}`
        }, { quoted: msg })
      }

      // =============================
      // 🎨 PHOTO EFFECT
      // =============================

      if (cmd === "glowingtext") {
        if (!args[0])
          return sock.sendMessage(from, { text: "Example: .glowingtext Prince" }, { quoted: msg })

        const url = `https://api.popcat.xyz/text?text=${args.join(" ")}`

        return sock.sendMessage(from, {
          image: { url },
          caption: "✨ Glowing Text"
        }, { quoted: msg })
      }

    } catch (err) {
      console.log(err)
      sock.sendMessage(from, { text: "❌ Error processing command." }, { quoted: msg })
    }
  }
      }
