export default {
  command: ["dice", "coin"],
  run: async ({ sock, msg, cmd }) => {
    if (cmd === "dice") {
      const roll = Math.floor(Math.random() * 6) + 1
      return sock.sendMessage(msg.key.remoteJid, {
        text: `🎲 Dice rolled: ${roll}`
      })
    }

    if (cmd === "coin") {
      const res = Math.random() > 0.5 ? "HEADS" : "TAILS"
      return sock.sendMessage(msg.key.remoteJid, {
        text: `🪙 Coin: ${res}`
      })
    }
  }
}
