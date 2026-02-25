import fs from "fs"

const SETTINGS_FILE = "./botsettings.json"

let settings = {
  prefix: ".",
  ownerNumber: ["2349012345678@s.whatsapp.net"], // ← We will change this in step 7
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
    "setprefix", "ownercheck"   // ← New debug command
  ],

  run: async ({ sock, msg, body, cmd }) => {

    const from = msg.key.remoteJid
    const args = body.trim().split(/ +/).slice(1)
    const text = args.join(" ")

    // SUPER STRONG OWNER CHECK
    const senderJid = msg.key.participant || msg.key.remoteJid || ""
    const senderNumber = senderJid.replace("@s.whatsapp.net", "").replace("@c.us", "").replace("+", "")
    
    const isBotOwner = settings.ownerNumber.some(owner => {
      const ownerNum = owner.replace("@s.whatsapp.net", "").replace("+", "")
      return senderNumber === ownerNum || senderJid === owner
    })

    // ==================== DEBUG TOOL (ANYONE CAN USE) ====================
    if (cmd === "ownercheck") {
      return sock.sendMessage(from, { 
        text: `🔍 Your detected JID:\n\( {senderJid}\n\nYour number:\n \){senderNumber}\n\nCopy the number above and put it in the code (step 7)` 
      }, { quoted: msg })
    }

    // ==================== OWNER ONLY COMMANDS ====================
    if (!isBotOwner) {
      return sock.sendMessage(from, { text: "❌ Owner only command!\n\nUse .ownercheck first to see your JID" }, { quoted: msg })
    }

    try {

      // TOGGLES
      const toggles = ["alwaysonline","antibug","anticall","antidelete","antideletestatus","antiedit","autoblock","autoreact","autoreactstatus","autoread","autorecord","autorecordtyping","autotype","autoviewstatus","chatbot"]
      if (toggles.includes(cmd)) {
        settings[cmd] = !settings[cmd]
        saveSettings()
        return sock.sendMessage(from, { text: `✅ ${cmd.toUpperCase()} → ${settings[cmd] ? "ON ✅" : "OFF ❌"}` }, { quoted: msg })
      }

      // ADD/DELETE
      if (cmd === "addbadword") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .addbadword fuck" }, { quoted: msg })
        settings.badwords.push(text.toLowerCase())
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Added: ${text}` }, { quoted: msg })
      }

      if (cmd === "deletebadword" || cmd === "delbadword") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .deletebadword fuck" }, { quoted: msg })
        const index = settings.badwords.indexOf(text.toLowerCase())
        if (index === -1) return sock.sendMessage(from, { text: "❌ Not found" }, { quoted: msg })
        settings.badwords.splice(index, 1)
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Removed: ${text}` }, { quoted: msg })
      }

      if (cmd === "addcountrycode") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .addcountrycode 234" }, { quoted: msg })
        settings.blockedCountryCodes.push(text)
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Added +${text}` }, { quoted: msg })
      }

      if (cmd === "delcountrycode") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .delcountrycode 234" }, { quoted: msg })
        settings.blockedCountryCodes = settings.blockedCountryCodes.filter(c => c !== text)
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Removed +${text}` }, { quoted: msg })
      }

      // SET COMMANDS
      if (cmd === "setprefix") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .setprefix !" }, { quoted: msg })
        settings.prefix = text
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Prefix = ${text}` }, { quoted: msg })
      }

      if (cmd === "setownernumber") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .setownernumber 2349012345678" }, { quoted: msg })
        settings.ownerNumber = [`${text}@s.whatsapp.net`]
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Owner number saved!\n${text}` }, { quoted: msg })
      }

      if (cmd === "setownername") {
        if (!text) return sock.sendMessage(from, { text: "❌ Example: .setownername Chinenye" }, { quoted: msg })
        settings.ownerName = text
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Owner name = ${text}` }, { quoted: msg })
      }

      if (cmd === "autobio") {
        settings.autobio = text || " "
        saveSettings()
        return sock.sendMessage(from, { text: `✅ Auto Bio saved` }, { quoted: msg })
      }

      if (cmd === "setmenu" || cmd === "setmenuimage") {
        settings[cmd === "setmenu" ? "customMenu" : "menuImage"] = text
        saveSettings()
        return sock.sendMessage(from, { text: `✅ ${cmd} saved` }, { quoted: msg })
      }

      if (cmd === "delanticallmsg") {
        settings.anticallMsg = "Calls are not allowed!"
        saveSettings()
        return sock.sendMessage(from, { text: "✅ Anti-call message reset" }, { quoted: msg })
      }

    } catch (err) {
      sock.sendMessage(from, { text: "❌ Small error, try again" }, { quoted: msg })
    }
  }
}
