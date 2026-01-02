export default {
  command: [
    "kick",
    "add",
    "promote",
    "demote",
    "tagall",
    "open",
    "close"
  ],

  run: async ({ sock, msg, body, cmd, isGroup }) => {
    const from = msg.key.remoteJid
    const sender = msg.key.participant

    if (!isGroup) {
      return sock.sendMessage(from, {
        text: "❌ Group only command"
      })
    }

    const meta = await sock.groupMetadata(from)
    const admins = meta.participants
      .filter(p => p.admin)
      .map(p => p.id)

    if (!admins.includes(sender)) {
      return sock.sendMessage(from, {
        text: "❌ Admin only"
      })
    }

    const target =
      msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]

    if (cmd === "kick" && target) {
      await sock.groupParticipantsUpdate(from, [target], "remove")
    }

    if (cmd === "add") {
      const number = body.split(" ")[1]
      if (!number) return
      await sock.groupParticipantsUpdate(
        from,
        [`${number}@s.whatsapp.net`],
        "add"
      )
    }

    if (cmd === "promote" && target) {
      await sock.groupParticipantsUpdate(from, [target], "promote")
    }

    if (cmd === "demote" && target) {
      await sock.groupParticipantsUpdate(from, [target], "demote")
    }

    if (cmd === "tagall") {
      const members = meta.participants.map(p => p.id)
      await sock.sendMessage(from, {
        text: members.map(u => `@${u.split("@")[0]}`).join(" "),
        mentions: members
      })
    }

    if (cmd === "open") {
      await sock.groupSettingUpdate(from, "not_announcement")
    }

    if (cmd === "close") {
      await sock.groupSettingUpdate(from, "announcement")
    }
  }
}
