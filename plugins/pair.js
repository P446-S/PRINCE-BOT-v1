export default {
  command: ["pair"],

  async run({ sock, msg, body, isOwner }) {

    const from = msg.key.remoteJid;

    // 🔒 OWNER ONLY (remove this if you want public use)
    if (!isOwner) {
      return sock.sendMessage(from, {
        text: "❌ Only owner can use this command."
      });
    }

    const args = body.split(" ");

    if (!args[1]) {
      return sock.sendMessage(from, {
        text: "📌 Usage:\n.pair 234xxxxxxxxxx"
      });
    }

    const number = args[1].replace(/[^0-9]/g, "");

    try {
      const code = await sock.requestPairingCode(number);

      await sock.sendMessage(from, {
        text: `✅ PAIRING CODE:\n\n${code}`
      });

    } catch (err) {
      console.log(err);

      await sock.sendMessage(from, {
        text: "❌ Failed to generate pairing code"
      });
    }
  }
};
