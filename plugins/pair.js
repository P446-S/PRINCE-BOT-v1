export default {
  command: ["pair"],

  async run({ sock, msg, body, isOwner }) {

    const jid = msg.key.remoteJid

    // allow only owner (recommended)
    if (!isOwner) {
      return sock.sendMessage(jid, { text: "❌ Only owner can use this command." })
    }

    const args = body.split(" ")
    const number = args[1]

    if (!number) {
      return sock.sendMessage(jid, {
        text: "Example:\n.pair 234XXXXXXXXXX"
      })
    }

    try {

      const code = await sock.requestPairingCode(number)

      await sock.sendMessage(jid, {
        text:
`🔗 *PAIRING CODE GENERATED*

📱 Number: ${number}

🔑 Code: *${code}*

Open WhatsApp → Linked Devices → Link with code`
      })

    } catch (err) {

      console.log(err)

      await sock.sendMessage(jid, {
        text: "❌ Failed to generate pairing code."
      })

    }

  }
}
