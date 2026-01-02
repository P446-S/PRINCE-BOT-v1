export default {
  command: ["info", "botinfo"],
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: `
ℹ️ *BOT INFO*

• Name: PRINCE X UNKNOWN BOT ⚡
• Library: Baileys power 💥
• Language: Node.js🤔
• Mode: STABLE💥
• More info: Whatsapp the amazing dev THE PRINCE TECHZ = 2349033168045
• version: 1.0.12
• caution: DO NOT CLONE BOT OR YOUR WHATSAP GET BANNED 💀👺🚫🚫❌‼️
`
    })
  }
}
