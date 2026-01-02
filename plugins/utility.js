export default {
  command: ["uptime", "runtime"],
  run: async ({ sock, msg }) => {
    const up = Math.floor(process.uptime())
    await sock.sendMessage(msg.key.remoteJid, {
      text: `⏱ Bot uptime: ${up} seconds`
    })
  }
}
