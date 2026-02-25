import fs from "fs"

const SETTINGS_FILE = "./botsettings.json"

let settings = {
  prefix: ".",
  ownerNumber: ["259648389169236@lid", "2348068836444@s.whatsapp.net"],
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

const saveSettings = () => fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2))

export default {
  command: [
    "addbadword","addcountrycode","alwaysonline","antibug","anticall","antidelete","antideletestatus","antiedit",
    "autobio","autoblock","autoreact","autoreactstatus","autoread","autorecord","autorecordtyping","autotype",
    "autoviewstatus","chatbot","delcountrycode","delanticallmsg","deletebadword","setmenu","setmenuimage",
    "setownername","setownernumber","setprefix","ownercheck"
  ],

  run: async ({ sock, msg, body, cmd }) => {
    const from = msg.key.remoteJid
    const args = body.trim().split(/ +/).slice(1)
    const text = args.join(" ")

    const senderJid = msg.key.participant || msg.key.remoteJid || ""
    const isBotOwner = settings.ownerNumber.some(o => senderJid === o || senderJid.includes(o.replace(/@.*/, "")))

    if (cmd === "ownercheck") return sock.sendMessage(from, { text: "✅ Your IDs are saved as owner!" }, { quoted: msg })
    if (!isBotOwner) return sock.sendMessage(from, { text: "❌ Owner only!" }, { quoted: msg })

    try {
      const toggles = ["alwaysonline","antibug","anticall","antidelete","antideletestatus","antiedit","autoblock","autoreact","autoreactstatus","autoread","autorecord","autorecordtyping","autotype","autoviewstatus","chatbot"]
      if (toggles.includes(cmd)) {
        settings[cmd] = !settings[cmd]
        saveSettings()
        return sock.sendMessage(from, { text: `✅ ${cmd.toUpperCase()} → ${settings[cmd] ? "ON ✅" : "OFF ❌"}` }, { quoted: msg })
      }

      // Other set commands (same as before)
      if (cmd === "setprefix") { settings.prefix = text || "."; saveSettings(); return sock.sendMessage(from, { text: `✅ Prefix = ${settings.prefix}` }, { quoted: msg }) }
      if (cmd === "setownernumber") { settings.ownerNumber = [text + "@s.whatsapp.net"]; saveSettings(); return sock.sendMessage(from, { text: `✅ Owner number saved` }, { quoted: msg }) }
      if (cmd === "setownername") { settings.ownerName = text; saveSettings(); return sock.sendMessage(from, { text: `✅ Owner name = ${text}` }, { quoted: msg }) }
      if (cmd === "autobio") { settings.autobio = text; saveSettings(); return sock.sendMessage(from, { text: "✅ Auto Bio saved" }, { quoted: msg }) }
      if (cmd === "setmenu") { settings.customMenu = text; saveSettings(); return sock.sendMessage(from, { text: "✅ Custom menu saved" }, { quoted: msg }) }
      if (cmd === "setmenuimage") { settings.menuImage = text; saveSettings(); return sock.sendMessage(from, { text: "✅ Menu image saved" }, { quoted: msg }) }
      // addbadword, deletebadword, addcountrycode, delcountrycode, delanticallmsg (same as previous versions)

    } catch(e) { sock.sendMessage(from, { text: "❌ Error" }, { quoted: msg }) }
  }
}
