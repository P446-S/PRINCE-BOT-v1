import { getSettings, saveSettings } from "../lib/settings.js"

export default {
  command: [
    "addbadword","deletebadword",
    "addcountrycode","delcountrycode",
    "alwaysonline","anticall","antidelete","antiedit",
    "autoread","autotype","autorecord","autoreact",
    "chatbot","autoblock",
    "setprefix","setownername","setownernumber"
  ],

  async run({ sock, msg, body, isOwner }) {

    if (!isOwner) return

    const settings = getSettings()
    const jid = msg.key.remoteJid
    const prefix = settings.prefix || "."

    if (!body.startsWith(prefix)) return

    const text = body.slice(prefix.length).trim()
    const args = text.split(" ")
    const command = args.shift().toLowerCase()

    const reply = (text) => sock.sendMessage(jid, { text })

    // ===== SET PREFIX =====
    if (command === "setprefix") {
      if (!args[0]) return reply("Example: .setprefix !");
      settings.prefix = args[0]
      saveSettings(settings)
      return reply("Prefix updated.")
    }

    // ===== OWNER NAME =====
    if (command === "setownername") {
      settings.ownerName = args.join(" ")
      saveSettings(settings)
      return reply("Owner name updated.")
    }

    // ===== OWNER NUMBER =====
    if (command === "setownernumber") {
      if (!args[0]) return reply("Provide number.")
      settings.ownerNumber = args[0]
      saveSettings(settings)
      return reply("Owner number updated.")
    }

    // ===== BAD WORDS =====
    if (command === "addbadword") {
      if (!args[0]) return reply("Provide word.")
      settings.badWords.push(args[0])
      saveSettings(settings)
      return reply("Bad word added.")
    }

    if (command === "deletebadword") {
      settings.badWords = settings.badWords.filter(w => w !== args[0])
      saveSettings(settings)
      return reply("Bad word removed.")
    }

    // ===== COUNTRY CODES =====
    if (command === "addcountrycode") {
      if (!args[0]) return reply("Provide code.")
      settings.countryCodes.push(args[0])
      saveSettings(settings)
      return reply("Country code added.")
    }

    if (command === "delcountrycode") {
      settings.countryCodes = settings.countryCodes.filter(c => c !== args[0])
      saveSettings(settings)
      return reply("Country code removed.")
    }

    // ===== TOGGLES =====
    const toggles = [
      "alwaysonline","anticall","antidelete",
      "antiedit","autoread","autotype",
      "autorecord","autoreact",
      "chatbot","autoblock"
    ]

    if (toggles.includes(command)) {
      settings[command] = !settings[command]
      saveSettings(settings)
      return reply(`${command} is now ${settings[command]}`)
    }

  }
  }
