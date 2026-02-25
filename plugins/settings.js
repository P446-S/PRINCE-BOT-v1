import fs from "fs"

const SETTINGS_FILE = "./botsettings.json"

let settings = {
  prefix: ".",
  ownerNumber: ["2349012345678@s.whatsapp.net"], // ← CHANGE THIS AFTER .ownercheck
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
    "setprefix", "ownercheck"
  ],

  run: async ({ sock, msg, body, cmd }) => {

    const from = msg.key.remoteJid
    const args = body.trim().split(/ +/).slice(1)
    const text = args.join(" ")

    const senderJid = msg.key.participant || msg.key.remoteJid || ""
    const senderNumber = senderJid.replace("@s.whatsapp.net", "").replace("@c.us", "").replace("+", "")

    const isBotOwner = settings.ownerNumber.some(function(owner) {
      const ownerNum = owner.replace("@s.whatsapp.net", "").replace("+", "")
      return senderNumber === ownerNum || senderJid === owner
    })

    if (cmd === "ownercheck") {
      return sock.sendMessage(from, { text: "🔍 Your detected JID:\n" + senderJid + "\n\nYour number:\n" + senderNumber + "\n\n1. Copy the NUMBER above\n2. Open settings.js\n3. Replace 2349012345678 with your number on line 30\n4. Save & Restart bot" }, { quoted: msg })
    }

    if (!isBotOwner) {
      return sock.sendMessage(from, { text: "❌ Owner only command!\n\nSend .ownercheck first" }, { quoted: msg })
    }

    try {

      const toggles = ["alwaysonline","antibug","anticall","antidelete","antideletestatus","antiedit","autoblock","autoreact","autoreactstatus","autoread","autorecord","autorecordtyping","autotype","autoviewstatus","chatbot"]
      if (toggles.indexOf(cmd) !== -1) {
        settings[cmd] = !settings[cmd]
        saveSettings()
        return sock.sendMessage(from, { text: "✅ " + cmd.toUpperCase() + " is now " + (settings[cmd] ? "ON ✅" : "OFF ❌") }, { quoted: msg })
      }

      if (cmd === "addbadword") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .addbadword fuck" }, { quoted: msg })
        settings.badwords.push(text.toLowerCase())
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Added: " + text }, { quoted: msg })
      }

      if (cmd === "deletebadword") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .deletebadword fuck" }, { quoted: msg })
        var index = settings.badwords.indexOf(text.toLowerCase())
        if (index === -1) return sock.sendMessage(from, { text: "❌ Not found" }, { quoted: msg })
        settings.badwords.splice(index, 1)
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Removed: " + text }, { quoted: msg })
      }

      if (cmd === "addcountrycode") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .addcountrycode 234" }, { quoted: msg })
        settings.blockedCountryCodes.push(text)
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Added + " + text }, { quoted: msg })
      }

      if (cmd === "delcountrycode") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .delcountrycode 234" }, { quoted: msg })
        settings.blockedCountryCodes = settings.blockedCountryCodes.filter(function(c) { return c !== text })
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Removed + " + text }, { quoted: msg })
      }

      if (cmd === "delanticallmsg") {
        settings.anticallMsg = "Calls are not allowed!"
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Anti-call message reset" }, { quoted: msg })
      }

      if (cmd === "setprefix") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .setprefix !" }, { quoted: msg })
        settings.prefix = text
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Prefix changed to: " + text }, { quoted: msg })
      }

      if (cmd === "setownernumber") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .setownernumber 2349012345678" }, { quoted: msg })
        settings.ownerNumber = [text + "@s.whatsapp.net"]
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Owner number saved: " + text }, { quoted: msg })
      }

      if (cmd === "setownername") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .setownername Chinenye" }, { quoted: msg })
        settings.ownerName = text
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Owner name set to: " + text }, { quoted: msg })
      }

      if (cmd === "autobio") {
        settings.autobio = text || " "
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Auto Bio saved" }, { quoted: msg })
      }

      if (cmd === "setmenu") {
        settings.customMenu = text
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Custom menu saved" }, { quoted: msg })
      }

      if (cmd === "setmenuimage") {
        settings.menuImage = text
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Menu image saved" }, { quoted: msg })
      }

    } catch (err) {
      sock.sendMessage(from, { text: "❌ Error! Try again" }, { quoted: msg })
    }
  }
}
