export default {
  command: ["menu", "help", "commands"],

  run: async ({ sock, msg }) => {
    const from = msg.key.remoteJid

    const text = `
╭━━━〔 🤖 *PRINCE BOT* 〕━━━╮

╭─ OWNER
│ • owner
│ • restart
│ • shutdown
│ • cleanup
╰────────────

╭─ SYSTEM
│ • mode
│ • public
│ • private
│ • system
╰────────────

╭─ ADMIN
│ • kick
│ • add
│ • promote
│ • demote
│ • tagall
│ • antilink
╰────────────

╭─ GROUP
│ • group
│ • open
│ • close
│ • setname
│ • setdesc
╰────────────

╭─ WELCOME
│ • welcome on
│ • welcome off
╰────────────

╭─ BASIC
│ • menu
│ • alive
│ • ping
│ • owner
╰────────────

╭─ UTILITY
│ • calc
│ • sticker
│ • toimg
│ • shorten
│ • qr
╰────────────

╭─ INFO
│ • botinfo
│ • runtime
│ • ping
│ • speed
╰────────────

╭─ GAMES
│ • ttt
│ • guess
│ • dice
│ • trivia
╰────────────

╭─ DOWNLOAD
│ • play
│ • song
│ • video
│ • yt
╰────────────

╭─ EVENTS
│ • welcome-event
│ • goodbye-event
╰────────────

╭─ MAINTENANCE
│ • cleanup
│ • clearsession
╰────────────

╰━━━〔 ✅ READY & ONLINE 〕━━━╯
`

    await sock.sendMessage(from, { text })
  }
      }
