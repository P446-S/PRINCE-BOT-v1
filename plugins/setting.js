import fs from "fs";
import path from "path";

const settingsFile = path.resolve("./settings.json");

// Load or create default settings
let settings = {};
if (fs.existsSync(settingsFile)) {
  settings = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
} else {
  settings = {
    prefix: ".",
    alwaysonline: false,
    autobio: false,
    autorecordtyping: false,
    autotype: false,
    autoread: false,
    autorecord: false,
    autoreact: false,
    autoreactstatus: false,
    antibug: false,
    anticall: false,
    antidelete: false,
    antideltestatus: false,
    autoviewstatus: false,
    chatbot: false,
  };
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
}

function saveSettings() {
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
}

export default {
  command: [
    "addbadword",
    "addcountrycode",
    "alwaysonline",
    "antibug",
    "anticall",
    "antidelete",
    "antideltestatus",
    "antiedit",
    "autobio",
    "autoblock",
    "autoreact",
    "autoreactstatus",
    "autoread",
    "autorecord",
    "autorecordtyping",
    "autotype",
    "autoviewstatus",
    "chatbot",
    "delcountrycode",
    "delanticallmsg",
    "deletebadword",
    "setmenu",
    "setmenuimage",
    "setownername",
    "setownernumber",
    "setprefix",
  ],

  run: async ({ sock, msg, body, cmd }) => {
    const from = msg.key.remoteJid;
    const args = body.split(" ").slice(1); // arguments after command

    switch (cmd) {
      case "alwaysonline":
      case "autobio":
      case "autorecordtyping":
      case "autotype":
      case "autoread":
      case "autorecord":
      case "autoreact":
      case "autoreactstatus":
      case "autoviewstatus":
      case "antibug":
      case "anticall":
      case "antidelete":
      case "antideltestatus":
      case "chatbot":
        settings[cmd] = !settings[cmd]; // toggle
        saveSettings();
        await sock.sendMessage(from, {
          text: `${cmd} is now ${settings[cmd] ? "✅ ENABLED" : "❌ DISABLED"}`,
        });
        break;

      case "setprefix":
        if (!args[0]) {
          await sock.sendMessage(from, { text: "Please provide a prefix!" });
          return;
        }
        settings.prefix = args[0];
        saveSettings();
        await sock.sendMessage(from, {
          text: `✅ Bot prefix is now: ${settings.prefix}`,
        });
        break;

      case "setownername":
      case "setownernumber":
      case "setmenu":
      case "setmenuimage":
        if (!args.join(" ")) {
          await sock.sendMessage(from, { text: "Please provide a value!" });
          return;
        }
        settings[cmd] = args.join(" ");
        saveSettings();
        await sock.sendMessage(from, {
          text: `✅ ${cmd} updated successfully!`,
        });
        break;

      case "addbadword":
      case "deletebadword":
      case "addcountrycode":
      case "delcountrycode":
      case "delanticallmsg":
        // You can implement your own list logic here
        await sock.sendMessage(from, {
          text: `✅ ${cmd} executed with value: ${args.join(" ")}`,
        });
        break;

      default:
        await sock.sendMessage(from, { text: "❌ Unknown setting command!" });
    }
  },
};

export { settings };
