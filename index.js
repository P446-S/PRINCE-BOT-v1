import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion
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
    console.log(`Plugin loaded: ${file}`);
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

  // 🔑 PAIRING CODE REQUEST WITH RETRY LOGIC
  const requestPairing = async () => {
    try {
      console.log("⏳ Requesting pairing code...");
      const code = await sock.requestPairingCode(BOT_CONFIG.PAIR_NUMBER);
      console.log(`📲 PAIRING CODE: ${code}`);
      console.log("Scan this code in the WhatsApp app under the 'Link device' section.");
    } catch (error) {
      console.error("Error while requesting pairing code:", error);

      // If pairing fails, retry after a short delay (e.g., 30 seconds)
      setTimeout(requestPairing, 30000); // Retry after 30 seconds
    }
  };

  // 🔒 PAIRING CODE (if not registered)
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== 401;
      if (shouldReconnect) {
        console.log("Connection lost, attempting to reconnect...");
        startBot(); // Restart bot if connection is closed unexpectedly
      } else {
        console.log("Bot disconnected. Please scan the QR code to reconnect.");
      }
    }

    if (connection === "open") {
      console.log("✅ BOT ONLINE");
    }

    // If QR is generated, log it to the console
    if (qr) {
      console.log("QR code generated! Scan it to pair the bot with WhatsApp.");
      return;
    }

    // If the bot is not registered, start the pairing process
    if (!state.creds.registered) {
      requestPairing(); // Request pairing code
    }
  });

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
      try {
        for (const p of plugins) {
          if (p.onText) await p.onText({ sock, msg, body });
        }
      } catch (error) {
        console.error("Error processing message in plugins:", error);
      }
      return;
    }

    const cmd = body
      .slice(BOT_CONFIG.PREFIX.length)
      .split(" ")[0]
      .toLowerCase();

    // 🔒 PRIVATE MODE
    if (BOT_CONFIG.MODE === "private" && !BOT_CONFIG.OWNER.includes(sender)) return;

    try {
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
    } catch (error) {
      console.error("Error running plugin command:", error);
    }
  });

  console.log("✅ BOT ONLINE");
}

startBot();

// Graceful error handling
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
