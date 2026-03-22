export default {
command: ["menu"],

run: async ({ sock, msg }) => {
const from = msg.key.remoteJid;

const menu = `

╭━━━〔 🤖 PRINCE X UNKNOWN BOT 〕━━━╮
┃ 👑 Owner: THE PRINCE 
┃ ⚡ Status: Online
┃ 📅 ${new Date().toLocaleDateString()}
┃ ⏰ ${new Date().toLocaleTimeString()}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

╭─❖ 👑 OWNER COMMANDS
│ • .owner
│ • .restart
│ • .shutdown
│ • .cleanup
│ • .online
│ • .privacy
│ • .react
│ • .readreceipts
│ • .setprofilepic
│ • .unblock / .unblockall
│ • .toviewonce
│ • .warn
╰──────────────

╭─❖ ⚙️ SYSTEM SETTINGS
│ • .mode
│ • .public
│ • .private
│ • .system
╰──────────────

╭─❖ 🔐 ADMIN COMMANDS
│ • .kick / .add
│ • .promote / .demote
│ • .tagall
│ • .antilink
╰──────────────

╭─❖ 🌍 GROUP SETTINGS
│ • .group
│ • .open / .close
│ • .setname
│ • .setdesc
│ • .link
│ • .resetlink
╰──────────────

╭─❖ 👋 WELCOME SYSTEM
│ • .welcome on
│ • .welcome off
╰──────────────

╭─❖ 📦 BASIC COMMANDS
│ • .menu
│ • .alive
│ • .ping
│ • .botstatus
│ • .runtime
│ • .time
│ • .repo
╰──────────────

╭─❖ 💡 UTILITY
│ • .calc
│ • .sticker
│ • .toimg
│ • .shorten
│ • .qr
╰──────────────

╭─❖ 📊 INFO
│ • .botinfo
│ • .runtime
│ • .speed
╰──────────────

╭─❖ 🎮 GAMES
│ • .ttt
│ • .guess
│ • .dice
│ • .trivia
│ • .squidgame
│ • .truth / .dare
│ • .truthordare
╰──────────────

╭─❖ 📥 DOWNLOAD
│ • .apk
│ • .download
│ • .facebook
│ • .gdrive
│ • .gitclone
│ • .image
│ • .instagram
│ • .itunes
│ • .mediafire
│ • .savestatus
│ • .song2
│ • .tiktok
╰──────────────

╭─❖ 🖼 PHOTO / LOGO
│ • .advancedglow
│ • .blackpinklogo
│ • .blackpingstyle
│ • .deletingtext
│ • .flagtext
│ • .galaxystyles
│ • .glowingtext
│ • .gradienttext
│ • .writetext
│ • .logomaker
│ • .matrix
│ • .neoglitch
│ • .sand
│ • .watercolortext
╰──────────────

╭─❖ 🎉 FUN
│ • .fact
│ • .jokes
│ • .memes
│ • .quotes
│ • .trivia
╰──────────────

╭─❖ 🏷 GROUP EXTRA
│ • .addcode
│ • .allow
│ • .announcement
│ • .antibadword
│ • .antibot
│ • .antidemote
│ • .antiforeign
│ • .antigroupmention
│ • .approveall
│ • .cancelkick
│ • .closetime
│ • .editsettings
│ • .hidetag
│ • .invite
│ • .kickall
│ • .listactive
│ • .listallowed
│ • .listinactive
│ • .poll
│ • .setgroupname
│ • .tagadmin
│ • .setppgroup
│ • .userid
│ • .totalmembers
╰──────────────

╭─❖ 🌟 IMAGE
│ • .wallpaper
╰──────────────

╭─❖ 🔍 SEARCH
│ • .define
│ • .lyrics
│ • .weather
│ • .yts
╰──────────────

╭─❖ ⚙️ BOT SETTINGS
│ • .addbadword / .deletebadword
│ • .addcountrycode / .delcountrycode
│ • .alwaysonline
│ • .antibug
│ • .anticall
│ • .antidelete
│ • .antideletestatus
│ • .antiedit
│ • .autobio
│ • .autoblock
│ • .autoreact
│ • .autoreactstatus
│ • .autoread
│ • .autorecord
│ • .autorecordtyping
│ • .autotype
│ • .autoviewstatus
│ • .chatbot
│ • .delanticallmsg
│ • .setmenu
│ • .setmenuimage
│ • .setownername
│ • .setownernumber
│ • .setprefix
╰──────────────

╭─❖ 🔗 PAIR SYSTEM
│ • .pair
╰──────────────

╰━━━〔 🚀 POWERED BY PRINCE TECH 〕━━━╯
`;

await sock.sendMessage(from, { text: menu });

}
};

