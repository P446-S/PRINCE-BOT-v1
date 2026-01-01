import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from "@whiskeysockets/baileys"
import P from "pino"
import fs from "fs"
import { BOT_CONFIG } from "./config.js"

const { PREFIX, PAIR_NUMBER } = BOT_CONFIG
const plugins = []

async function loadPlugins() {
  const pluginPath = "./plugins"
  for (const file of fs.readdirSync(pluginPath)) {
    if (file.endsWith(".js")) {
      const plugin = (await import(`${pluginPath}/${file}`)).default
      plugins.push(plugin)
    }
  }
}

async function startBot() {
  await loadPlugins()

  console.log("🚀 PRINCE BOT starting...")

  const { state, saveCreds } = await useMultiFileAuthState("sessions")
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "silent" })
  })

  sock.ev.on("creds.update", saveCreds)

  // 🔑 Pairing code
  setTimeout(async () => {
    if (!state.creds.registered && PAIR_NUMBER) {
      const code = await sock.requestPairingCode(PAIR_NUMBER)
      console.log("📲 PAIRING CODE:", code)
    }
  }, 5000)

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg?.message) return

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ""

    const isCommand = text.startsWith(PREFIX)
    const cmd = isCommand
      ? text.slice(1).split(" ")[0].toLowerCase()
      : null

    for (const plugin of plugins) {
      // 🔹 COMMAND PLUGINS
      if (isCommand && Array.isArray(plugin.command)) {
        if (plugin.command.includes(cmd)) {
          await plugin.run({ sock, msg, text })
        }
      }

      // 🔹 EVENT PLUGINS (WELCOME, ETC)
      if (!isCommand && plugin.command?.length === 0) {
        await plugin.run({ sock, msg, text })
      }
    }
  })

  console.log("✅ Bot ready")
}

startBot()
process.on("unhandledRejection", () => {})
process.on("uncaughtException", () => {})
