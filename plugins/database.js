import fs from "fs"

const dbFile = "./database.json"
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify({ users: {} }, null, 2))
}

export default {
  command: ["register"],
  run: async ({ sock, msg }) => {
    const db = JSON.parse(fs.readFileSync(dbFile))
    const id = msg.key.participant || msg.key.remoteJid

    if (db.users[id]) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "✅ You are already registered"
      })
    }

    db.users[id] = { joined: Date.now() }
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2))

    await sock.sendMessage(msg.key.remoteJid, {
      text: "🎉 Registered successfully"
    })
  }
}
