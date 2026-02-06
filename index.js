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
    syncFullHistory: false
  });

  sock.ev.on("creds.update", saveCreds);

  // 🔑 PAIRING CODE
  setTimeout(async () => {
    if (!state.creds.registered && BOT_CONFIG.PAIR_NUMBER) {
      try {
        console.log("🔑 Attempting to request pairing code...");
        const code = await sock.requestPairingCode(BOT_CONFIG.PAIR_NUMBER);
        console.log("📲 PAIRING CODE:", code);
      } catch (error) {
        console.error("Error requesting pairing code:", error);
      }
    }
  }, 4000);

  // 📩 MESSAGE HANDLER
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg || !msg.message) return;

    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;

    const body =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      msg.message.videoMessage?.caption ||
      "";

    const isCmd = body.startsWith(BOT_CONFIG.PREFIX);
    const cmd = isCmd
      ? body.slice(1).split(" ")[0].toLowerCase()
      : "";

    const isOwner = BOT_CONFIG.OWNER.includes(sender.split("@")[0]);
    const isGroup = from.endsWith("@g.us");

    // 🔒 PRIVATE MODE CHECK
    if (BOT_CONFIG.MODE === "private" && !isOwner) return;

    for (const plugin of plugins) {
      // ⚙️ COMMAND PLUGINS
      if (isCmd && Array.isArray(plugin.command)) {
        if (plugin.command.includes(cmd)) {
          await plugin.run({
            sock,
            msg,
            body,
            cmd,
            isOwner,
            isGroup
          });
        }
      }

      // 🤖 AUTO / WELCOME / EVENT PLUGINS
      if (!isCmd && plugin.command?.length === 0) {
        await plugin.run({
          sock,
          msg,
          body,
          isOwner,
          isGroup
        });
      }
    }
  });

  console.log("✅ Bot fully ready");
}

startBot();

// 🛡️ PANEL CRASH PROTECTION
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Promise Rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});
