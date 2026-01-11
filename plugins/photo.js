export default {
  command: ["advancedglow", "blackpinklogo", "blackpingstyle", "deletingtext", "flagd3yext", "flagtext", "freecreate", "galaxystyles", "glowingtext", "gradienttext", "writetext", "lighteffects", "logomaker", "matrix", "neoglitch", "papercutsstyle", "sand", "watercolortext"],

  run: async ({ sock, msg, body }) => {
    const from = msg.key.remoteJid;
    const command = body.split(" ")[0].toLowerCase();

    switch (command) {
      case "advancedglow":
        await sock.sendMessage(from, { text: "Applying Advanced Glow effect to the text!" });
        break;

      case "blackpinklogo":
        await sock.sendMessage(from, { text: "Creating Blackpink logo style!" });
        break;

      case "blackpingstyle":
        await sock.sendMessage(from, { text: "Applying Blackpink style effect!" });
        break;

      case "deletingtext":
        await sock.sendMessage(from, { text: "Applying Deleting Text effect!" });
        break;

      case "flagd3yext":
        await sock.sendMessage(from, { text: "Creating Flag D3y Text effect!" });
        break;

      case "flagtext":
        await sock.sendMessage(from, { text: "Creating Flag Text effect!" });
        break;

      case "freecreate":
        await sock.sendMessage(from, { text: "Free Create feature activated!" });
        break;

      case "galaxystyles":
        await sock.sendMessage(from, { text: "Applying Galaxy Style text effect!" });
        break;

      case "glowingtext":
        await sock.sendMessage(from, { text: "Applying Glowing Text effect!" });
        break;

      case "gradienttext":
        await sock.sendMessage(from, { text: "Creating Gradient Text effect!" });
        break;

      case "writetext":
        await sock.sendMessage(from, { text: "Creating Text Writing effect!" });
        break;

      case "lighteffects":
        await sock.sendMessage(from, { text: "Applying Light Effects on text!" });
        break;

      case "logomaker":
        await sock.sendMessage(from, { text: "Creating Logo using provided details!" });
        break;

      case "matrix":
        await sock.sendMessage(from, { text: "Applying Matrix-style text effect!" });
        break;

      case "neoglitch":
        await sock.sendMessage(from, { text: "Applying Neo Glitch effect!" });
        break;

      case "papercutsstyle":
        await sock.sendMessage(from, { text: "Creating Paper Cut-style effect!" });
        break;

      case "sand":
        await sock.sendMessage(from, { text: "Applying Sand effect to the text!" });
        break;

      case "watercolortext":
        await sock.sendMessage(from, { text: "Applying Watercolor effect to the text!" });
        break;

      default:
        await sock.sendMessage(from, { text: "Unknown photo effect command!" });
    }
  }
}
