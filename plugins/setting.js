import fs from "fs"

const SETTINGS_FILE = "./botsettings.json"

let settings = {
  prefix: ".",
  ownerNumber: ["234YOURNUMBERHERE@s.whatsapp.net"], // ← CHANGE THIS TO YOUR NUMBER !!!
  ownerName: "Chinenye",
  badwords: [],
  blockedCountryCodes: [],
  alwaysonline: false,
  antibug: false,
  anticall: false,
  anticallMsg: "Calls are not allowed!",
  antidelete: false,
  antideletestatus: false,
  antiedit: false,
  autoblock: false,
  autoreact: false,
  autoreactstatus: false,
  autoread: false,
  autorecord: false,
  autorecordtyping: false,
  autotype: false,
  autoviewstatus: false,
  chatbot: false,
  autobio: "",
  customMenu: "",
  menuImage: ""
}

// Load settings
if (fs.existsSync(SETTINGS_FILE)) {
  try { settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8")) } catch(e) {}
} else {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2))
}

const saveSettings = () => {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2))
}

export default {

  command: [
    "addbadword", "addcountrycode", "alwaysonline", "antibug", "anticall",
    "antidelete", "antideletestatus", "antiedit", "autobio", "autoblock",
    "autoreact", "autoreactstatus", "autoread", "autorecord", "autorecordtyping",
    "autotype", "autoviewstatus", "chatbot", "delcountrycode", "delanticallmsg",
    "deletebadword", "setmenu", "setmenuimage", "setownername", "setownernumber",
    "setprefix"
  ],

  run: async ({ sock, msg, body, cmd }) => {

    const from = msg.key.remoteJid
    const args = body.trim().split(/ +/).slice(1)
    const text = args.join(" ")

    // MANUAL OWNER CHECK (this fixes everything)
    const sender = msg.key.remoteJid || msg.key.participant || ""
    const isBotOwner = settings.ownerNumber.some(owner => 
      sender === owner || 
      sender.replace("@s.whatsapp.net", "") === owner.replace("@s.whatsapp.net", "") ||
      sender.includes(owner.replace("@s.whatsapp.net", ""))
    )

    if (!isBotOwner) {
      return sock.sendMessage(from, { text: "❌ Owner only command!" }, { quoted: msg })
    }

    try {

      // ==================== TOGGLES ====================
      const toggles = ["alwaysonline","antibug","anticall","antidelete","antideletestatus","antiedit","autoblock","autoreact","autoreactstatus","autoread","autorecord","autorecordtyping","autotype","autoviewstatus","chatbot"]
      if (toggles.includes(cmd)) {
        settings[cmd] = !settings[cmd]
        saveSettings()
        return sock.sendMessage(from, { text: `✅ ${cmd.toUpperCase()} is now ${settings[cmd] ? "ON ✅" : "OFF ❌"}` }, { quoted: msg })
      }

      // ==================== ADD / DELETE ====================
      if (cmd === "addbadword") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .addbadword fuck" }, { quoted: msg })
        settings.badwords.push(text.toLowerCase())
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Added badword: ${text}` }, { quoted: msg })
      }

      if (cmd === "deletebadword") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .deletebadword fuck" }, { quoted: msg })
        const index = settings.badwords.indexOf(text.toLowerCase())
        if (index === -1) return sock.sendMessage(from, { text: "❌ Not in list" }, { quoted: msg })
        settings.badwords.splice(index, 1)
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Removed: ${text}` }, { quoted: msg })
      }

      if (cmd === "addcountrycode") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .addcountrycode 234" }, { quoted: msg })
        settings.blockedCountryCodes.push(text)
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Added country code: +${text}` }, { quoted: msg })
      }

      if (cmd === "delcountrycode") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .delcountrycode 234" }, { quoted: msg })
        settings.blockedCountryCodes = settings.blockedCountryCodes.filter(c => c !== text)
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Removed country code: +${text}` }, { quoted: msg })
      }

      if (cmd === "delanticallmsg") {
        settings.anticallMsg = "Calls are not allowed!"
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Anti-call message reset" }, { quoted: msg })
      }

      // ==================== SET COMMANDS ====================
      if (cmd === "setprefix") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .setprefix !" }, { quoted: msg })
        settings.prefix = text
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Prefix changed to: ${text}` }, { quoted: msg })
      }

      if (cmd === "setownernumber") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .setownernumber 2349012345678" }, { quoted: msg })
        settings.ownerNumber = [`${text}@s.whatsapp.net`]
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Owner number updated to: ${text}` }, { quoted: msg })
      }

      if (cmd === "setownername") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .setownername Chinenye" }, { quoted: msg })
        settings.ownerName = text
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Owner name set to: ${text}` }, { quoted: msg })
      }

      if (cmd === "autobio") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .autobio Hello I am online 24/7" }, { quoted: msg })
        settings.autobio = text
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Auto Bio set` }, { quoted: msg })
      }

      if (cmd === "setmenu") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .setmenu My Custom Menu" }, { quoted: msg })
        settings.customMenu = text
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Custom menu saved` }, { quoted: msg })
      }

      if (cmd === "setmenuimage") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .setmenuimage https://image-url.com/photo.jpg" }, { quoted: msg })
        settings.menuImage = text
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Menu image set` }, { quoted: msg })
      }

    } catch (err) {
      console.error(err)
      sock.sendMessage(from, { text: "❌ Error! Try again." }, { quoted: msg })
    }
  }
}
