export default {
  command: [
    "add", "addcode", "allow", "announcement", "antibadword", "antibot", "antidemote", "antiforeign", 
    "antigroupmention", "antilink", "approveall", "cancelkick", "close", "closetime", "editsettings", 
    "hidetag", "invite", "kickall", "link", "listactive", "listallowed", "listinactive", "poll", 
    "resetlink", "setgroupname", "tagadmin", "setppgroup", "welcome", "userid", "totalmembers"
  ],

  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid;
    const command = body.split(" ")[0].toLowerCase();

    switch (command) {
      case "add":
        await sock.sendMessage(from, { text: "Please mention a user to add to the group!" });
        break;

      case "addcode":
        await sock.sendMessage(from, { text: "Please provide a valid invitation code!" });
        break;

      case "allow":
        await sock.sendMessage(from, { text: "Allowing user to access the group!" });
        break;

      case "announcement":
        await sock.sendMessage(from, { text: "Sending announcement!" });
        break;

      case "antibadword":
        await sock.sendMessage(from, { text: "Activating Anti-Badword feature!" });
        break;

      case "antibot":
        await sock.sendMessage(from, { text: "Activating Anti-Bot feature!" });
        break;

      case "antidemote":
        await sock.sendMessage(from, { text: "Activating Anti-Demote feature!" });
        break;

      case "antiforeign":
        await sock.sendMessage(from, { text: "Activating Anti-Foreign feature!" });
        break;

      case "antigroupmention":
        await sock.sendMessage(from, { text: "Activating Anti-Group Mention feature!" });
        break;

      case "antilink":
        await sock.sendMessage(from, { text: "Activating Anti-Link feature!" });
        break;

      case "approveall":
        await sock.sendMessage(from, { text: "Approving all pending members!" });
        break;

      case "cancelkick":
        await sock.sendMessage(from, { text: "Cancelling kick for all members!" });
        break;

      case "close":
        await sock.sendMessage(from, { text: "Closing the group!" });
        break;

      case "closetime":
        await sock.sendMessage(from, { text: "Closing group at specific time!" });
        break;

      case "editsettings":
        await sock.sendMessage(from, { text: "Editing group settings!" });
        break;

      case "hidetag":
        await sock.sendMessage(from, { text: "Hiding group tag!" });
        break;

      case "invite":
        await sock.sendMessage(from, { text: "Sending group invite link!" });
        break;

      case "kickall":
        await sock.sendMessage(from, { text: "Kicking all members from the group!" });
        break;

      case "link":
        await sock.sendMessage(from, { text: "Fetching group link!" });
        break;

      case "listactive":
        await sock.sendMessage(from, { text: "Listing all active members!" });
        break;

      case "listallowed":
        await sock.sendMessage(from, { text: "Listing all allowed members!" });
        break;

      case "listinactive":
        await sock.sendMessage(from, { text: "Listing all inactive members!" });
        break;

      case "poll":
        await sock.sendMessage(from, { text: "Creating a poll for the group!" });
        break;

      case "resetlink":
        await sock.sendMessage(from, { text: "Resetting group link!" });
        break;

      case "setgroupname":
        await sock.sendMessage(from, { text: "Please provide a new group name!" });
        break;

      case "tagadmin":
        await sock.sendMessage(from, { text: "Tagging all admins!" });
        break;

      case "setppgroup":
        await sock.sendMessage(from, { text: "Changing group profile picture!" });
        break;

      case "welcome":
        await sock.sendMessage(from, { text: "Toggling the welcome feature!" });
        break;

      case "userid":
        await sock.sendMessage(from, { text: "Fetching user ID!" });
        break;

      case "totalmembers":
        await sock.sendMessage(from, { text: "Getting total number of members!" });
        break;

      default:
        await sock.sendMessage(from, { text: "Unknown group command!" });
    }
  }
}
