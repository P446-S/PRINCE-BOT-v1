export default {
  command: [
    "addbadword", "addcountrycode", "alwaysonline", "antibug", "anticall", "antidelete", "antideltestatus", 
    "antiedit", "autobio", "autoblock", "autoreact", "autoreactstatus", "autoread", "autorecord", 
    "autorecordtyping", "autotype", "autoviewstatus", "chatbot", "delcountrycode", "delanticallmsg", 
    "deletebadword", "setmenu", "setmenuimage", "setownername", "setownernumber", "setprefix"
  ],

  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid;
    const command = body.split(" ")[0].toLowerCase();

    switch (command) {
      case "addbadword":
        await sock.sendMessage(from, { text: "Please provide a bad word to add!" });
        break;

      case "addcountrycode":
        await sock.sendMessage(from, { text: "Please provide a country code!" });
        break;

      case "alwaysonline":
        await sock.sendMessage(from, { text: "Setting bot to always online!" });
        break;

      case "antibug":
        await sock.sendMessage(from, { text: "Activating anti-bug features!" });
        break;

      case "anticall":
        await sock.sendMessage(from, { text: "Activating anti-call features!" });
        break;

      case "antidelete":
        await sock.sendMessage(from, { text: "Activating anti-delete features!" });
        break;

      case "antideltestatus":
        await sock.sendMessage(from, { text: "Activating anti-delete status features!" });
        break;

      case "antiedit":
        await sock.sendMessage(from, { text: "Activating anti-edit features!" });
        break;

      case "autobio":
        await sock.sendMessage(from, { text: "Setting up autobio feature!" });
        break;

      case "autoblock":
        await sock.sendMessage(from, { text: "Activating auto-block feature!" });
        break;

      case "autoreact":
        await sock.sendMessage(from, { text: "Activating auto-react feature!" });
        break;

      case "autoreactstatus":
        await sock.sendMessage(from, { text: "Activating auto-react status feature!" });
        break;

      case "autoread":
        await sock.sendMessage(from, { text: "Activating auto-read feature!" });
        break;

      case "autorecord":
        await sock.sendMessage(from, { text: "Activating auto-record feature!" });
        break;

      case "autorecordtyping":
        await sock.sendMessage(from, { text: "Activating auto-record typing feature!" });
        break;

      case "autotype":
        await sock.sendMessage(from, { text: "Activating auto-type feature!" });
        break;

      case "autoviewstatus":
        await sock.sendMessage(from, { text: "Activating auto-view status feature!" });
        break;

      case "chatbot":
        await sock.sendMessage(from, { text: "Starting chatbot features!" });
        break;

      case "delcountrycode":
        await sock.sendMessage(from, { text: "Please provide a country code to delete!" });
        break;

      case "delanticallmsg":
        await sock.sendMessage(from, { text: "Deleting anti-call message!" });
        break;

      case "deletebadword":
        await sock.sendMessage(from, { text: "Please provide a bad word to delete!" });
        break;

      case "setmenu":
        await sock.sendMessage(from, { text: "Setting the bot menu!" });
        break;

      case "setmenuimage":
        await sock.sendMessage(from, { text: "Setting the menu image!" });
        break;

      case "setownername":
        await sock.sendMessage(from, { text: "Setting the owner's name!" });
        break;

      case "setownernumber":
        await sock.sendMessage(from, { text: "Setting the owner's number!" });
        break;

      case "setprefix":
        await sock.sendMessage(from, { text: "Setting a new prefix!" });
        break;

      default:
        await sock.sendMessage(from, { text: "Unknown setting command!" });
    }
  }
}
