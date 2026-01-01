import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from "@whiskeysockets/baileys"
import P from "pino"
import fs from "fs"
import { BOT_CONFIG } from "./config.js"

const plugins = []

async function loadPlugins() {
  for (const file of fs.readdirSync("./plugins")) {
    if (file.endsWith(".js")) {
      const plugin = (await import(`./plugins/${file}`)).default
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
    if (!state.creds.registered) {
      const code = await sock.requestPairingCode(BOT_CONFIG.PAIR_NUMBER)
      console.log("📲 PAIRING CODE:", code)
    }
  }, 4000)

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg?.message) return

    const from = msg.key.remoteJid
    const sender = msg.key.participant || msg.key.remoteJid
    const body =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ""

    const isCmd = body.startsWith(BOT_CONFIG.PREFIX)
    const cmd = isCmd
      ? body.slice(1).split(" ")[0].toLowerCase()
      : ""

    const isOwner = BOT_CONFIG.OWNER.includes(sender.split("@")[0])

    if (BOT_CONFIG.MODE === "private" && !isOwner) return

    for (const plugin of plugins) {
      if (
        plugin.command?.includes(cmd) ||
        (plugin.command?.length === 0 && !isCmd)
      ) {
        await plugin.run({
          sock,
          msg,
          body,
          cmd,
          isOwner
        })
      }
    }
  })

  console.log("✅ Bot ready")
}

startBot()
process.on("unhandledRejection", () => {})
process.on("uncaughtException", () => {})
