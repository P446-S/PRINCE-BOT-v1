import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from "@whiskeysockets/baileys";
import P from "pino";
import fs from "fs";
import { BOT_CONFIG } from "./config.js";

const plugins = [];

// 🔌 LOAD PLUGINS
async function loadPlugins() {
  const files = fs.readdirSync("./plugins").filter(f => f.endsWith(".js"));
  for (const file of files) {
    const plugin = (await import(`./plugins/${file}`)).default;
    plugins.push(plugin);
  }
}

// 🚀 START BOT
async function startBot() {
  await loadPlugins();
  console.log("🚀 PRINCE BOT starting...");

  const { state, saveCreds } = await useMultiFileAuthState("sessions");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "silent" }),
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  // 🔑 AUTO PAIR (from config)
  setTimeout(async () => {
    if (!state.creds.registered && BOT_CONFIG.PAIR_NUMBER) {
      try {
        console.log("🔑 Requesting pairing code...");
        const code = await sock.requestPairingCode(BOT_CONFIG.PAIR_NUMBER);
        console.log("📲 PAIR CODE:", code);
      } catch (err) {
        console.log("Pairing error:", err);
      }
    }
  }, 4000);

  // 📩 MESSAGE HANDLER
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg || !msg.message) return;

    const from = msg.key.remoteJid;

    const senderRaw = msg.key.participant || msg.key.remoteJid;

    // ✅ FIXED OWNER DETECTION
    const senderNumber = senderRaw
      .replace("@s.whatsapp.net", "")
      .replace("@g.us", "");

    const isOwner = BOT_CONFIG.OWNER.includes(senderNumber);

    const body =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      msg.message.videoMessage?.caption ||
      "";

    const isCmd = body.startsWith(BOT_CONFIG.PREFIX);

    const cmd = isCmd
      ? body.slice(BOT_CONFIG.PREFIX.length).split(" ")[0].toLowerCase()
      : "";

    const isGroup = from.endsWith("@g.us");

    // 🔒 PRIVATE MODE
    if (BOT_CONFIG.MODE === "private" && !isOwner) return;

    for (const plugin of plugins) {

      // ⚙️ COMMANDS
      if (isCmd && Array.isArray(plugin.command)) {
        if (plugin.command.includes(cmd)) {
          try {
            await plugin.run({
              sock,
              msg,
              from,
              body,
              cmd,
              isOwner,
              isGroup
            });
          } catch (e) {
            console.log("Plugin error:", e);
          }
        }
      }

      // 🤖 AUTO COMMANDS
      if (!isCmd && plugin.command?.length === 0) {
        try {
          await plugin.run({
            sock,
            msg,
            from,
            body,
            isOwner,
            isGroup
          });
        } catch {}
      }
    }
  });

  console.log("✅ BOT ONLINE");
}

startBot();

// 🛡️ CRASH PROTECTION
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err);
});
