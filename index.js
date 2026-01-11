import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import P from "pino";
import fs from "fs";
import path from "path";
import { BOT_CONFIG } from "./config.js";

const __dirname = path.resolve();
const plugins = [];

// 🔌 LOAD PLUGINS
const pluginDir = path.join(__dirname, "plugins");
for (const file of fs.readdirSync(pluginDir)) {
  if (file.endsWith(".js")) {
    const plugin = (await import(`./plugins/${file}`)).default;
    plugins.push(plugin);
  }
}

async function startBot() {
  console.log("🚀 PRINCE BOT starting...");

  const { state, saveCreds } = await useMultiFileAuthState("sessions");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "silent" }),
  });

  sock.ev.on("creds.update", saveCreds);

  // 🔑 PAIRING CODE
  setTimeout(async () => {
    if (!state.creds.registered) {
      const code = await sock.requestPairingCode(BOT_CONFIG.PAIR_NUMBER);
      console.log("📲 PAIRING CODE:", code);
    }
  }, 4000);

  // 👥 WELCOME / GOODBYE
  sock.ev.on("group-participants.update", async (update) => {
    if (!BOT_CONFIG.WELCOME) return;

    const jid = update.id;
    for (const user of update.participants) {
      if (update.action === "add") {
        await sock.sendMessage(jid, {
          text: `👋 Welcome @${user.split("@")[0]} to the group!`,
          mentions: [user],
        });
      }

      if (update.action === "remove") {
        await sock.sendMessage(jid, {
          text: `👋 Goodbye @${user.split("@")[0]}`,
          mentions: [user],
        });
      }
    }
  });

  // 📩 MESSAGE HANDLER
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg?.message) return;

    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const isGroup = from.endsWith("@g.us");

    const body =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.ephemeralMessage?.message?.conversation ||
      "";

    if (!body.startsWith(BOT_CONFIG.PREFIX)) {
      // auto-reply plugins
      for (const p of plugins) {
        if (p.onText) await p.onText({ sock, msg, body });
      }
      return;
    }

    const cmd = body
      .slice(BOT_CONFIG.PREFIX.length)
      .split(" ")[0]
      .toLowerCase();

    // 🔒 PRIVATE MODE
    if (
      BOT_CONFIG.MODE === "private" &&
      !BOT_CONFIG.OWNER.includes(sender)
    ) return;

    // Running the command from plugins
    for (const plugin of plugins) {
      if (plugin.command?.includes(cmd)) {
        await plugin.run({
          sock,
          msg,
          body,
          cmd,
          isGroup,
          sender,
        });
      }
    }
  });

  console.log("✅ BOT ONLINE");
}

startBot();
process.on("unhandledRejection", () => {});
process.on("uncaughtException", () => {});
