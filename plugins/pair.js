export default {
  command: ["pair"],

  async run({ sock, msg, body, from, isOwner }) {

    if (!isOwner) {
      return sock.sendMessage(from, {
        text: "❌ Only owner can use this command."
      });
    }

    const args = body.split(" ");

    if (!args[1]) {
      return sock.sendMessage(from, {
        text: "⚠️ Example:\n.pair 234XXXXXXXXXX"
      });
    }

    const number = args[1].replace(/[^0-9]/g, "");

    try {

      const code = await sock.requestPairingCode(number);

      await sock.sendMessage(from, {
        text: `🔑 Pairing Code for ${number}\n\n📲 ${code}`
      });

    } catch (err) {

      await sock.sendMessage(from, {
        text: "❌ Failed to generate pairing code."
      });

    }
  }
};
