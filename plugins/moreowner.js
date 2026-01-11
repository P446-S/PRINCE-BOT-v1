export default {
  command: [
    "block", "delete", "deljink", "delstickercmd", "disk", "gaddprivacy", "hostip", "groupis", 
    "join", "lastseen", "leave", "listbadword", "listblocked", "listignorelist", "listsudo", 
    "modestatus", "online", "owner", "privacy", "react", "readreceipts", "setprofilepic", "unblock", 
    "unblockall", "toveiwonce", "warn"
  ],

  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid;
    const command = body.split(" ")[0].toLowerCase();

    switch (command) {
      case "block":
        await sock.sendMessage(from, { text: "Blocking the user!" });
        break;

      case "delete":
        await sock.sendMessage(from, { text: "Deleting the message!" });
        break;

      case "deljink":
        await sock.sendMessage(from, { text: "Deleting the group join link!" });
        break;

      case "delstickercmd":
        await sock.sendMessage(from, { text: "Deleting sticker commands!" });
        break;

      case "disk":
        await sock.sendMessage(from, { text: "Displaying disk usage!" });
        break;

      case "gaddprivacy":
        await sock.sendMessage(from, { text: "Changing group privacy settings!" });
        break;

      case "hostip":
        await sock.sendMessage(from, { text: "Getting host IP address!" });
        break;

      case "groupis":
        await sock.sendMessage(from, { text: "Getting group information!" });
        break;

      case "join":
        await sock.sendMessage(from, { text: "Joining the group!" });
        break;

      case "lastseen":
        await sock.sendMessage(from, { text: "Fetching last seen of a user!" });
        break;

      case "leave":
        await sock.sendMessage(from, { text: "Leaving the group!" });
        break;

      case "listbadword":
        await sock.sendMessage(from, { text: "Listing all bad words!" });
        break;

      case "listblocked":
        await sock.sendMessage(from, { text: "Listing all blocked users!" });
        break;

      case "listignorelist":
        await sock.sendMessage(from,case "listignorelist":
        await sock.sendMessage(from, { text: "Listing all ignored users!" });
        break;

      case "listsudo":
        await sock.sendMessage(from, { text: "Listing all sudo users!" });
        break;

      case "modestatus":
        await sock.sendMessage(from, { text: "Checking moderation status!" });
        break;

      case "online":
        await sock.sendMessage(from, { text: "Checking if the bot is online!" });
        break;

      case "owner":
        await sock.sendMessage(from, { text: "Showing owner details!" });
        break;

      case "privacy":
        await sock.sendMessage(from, { text: "Managing privacy settings!" });
        break;

      case "react":
        await sock.sendMessage(from, { text: "Reacting to a message!" });
        break;

      case "readreceipts":
        await sock.sendMessage(from, { text: "Checking read receipts status!" });
        break;

      case "setprofilepic":
        await sock.sendMessage(from, { text: "Setting new profile picture!" });
        break;

      case "unblock":
        await sock.sendMessage(from, { text: "Unblocking the user!" });
        break;

      case "unblockall":
        await sock.sendMessage(from, { text: "Unblocking all users!" });
        break;

      case "toveiwonce":
        await sock.sendMessage(from, { text: "Set to view once!" });
        break;

      case "warn":
        await sock.sendMessage(from, { text: "Warning the user!" });
        break;

      default:
        await sock.sendMessage(from, { text: "Unknown owner command!" });
    }
  }
}
