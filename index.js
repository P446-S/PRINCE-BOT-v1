import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from "@whiskeysockets/baileys"
import P from "pino"
import fs from "fs"
import path from "path"
import { BOT_CONFIG } from "./config.js"

const { PREFIX, PAIR_NUMBER } = BOT_CONFIG
const plugins = []

// 🔌 load plugins
const pluginPath = "./plugins"
for (const file of fs.readdirSync(pluginPath)) {
  if (file.endsWith(".js")) {
    plugins.push((await import(`${pluginPath}/${file}`)).default)
  }
}

async function startBot() {
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
    if (!state.creds.registered) {
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

    if (!text.startsWith(PREFIX)) return

    for (const plugin of plugins) {
      if (plugin.command.includes(text.slice(1).toLowerCase())) {
        await plugin.run({ sock, msg, text })
      }
    }
  })

  console.log("✅ Bot ready")
}

startBot()
process.on("unhandledRejection", () => {})
process.on("uncaughtException", () => {})
