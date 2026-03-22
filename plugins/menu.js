import fs from "fs";

const dbPath = "./database/users.json";

// ✅ LOAD DB
function loadDB() {
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, "{}");
  return JSON.parse(fs.readFileSync(dbPath));
}

// ✅ SAVE DB
function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export default {
  command: ["menu"],

  run: async ({ sock, msg }) => {
    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const number = sender.split("@")[0];
    const name = msg.pushName || "User";

    const db = loadDB();

    // 🧠 CREATE USER
    if (!db[number]) {
      db[number] = { xp: 0, level: 1 };
    }

    // ⚡ ADD XP
    db[number].xp += 5;

    // 🔼 LEVEL UP
    if (db[number].xp >= db[number].level * 50) {
      db[number].level += 1;
      db[number].xp = 0;
    }

    saveDB(db);

    const menu = `
╭━━━〔 🤖 *PRINCE X UNKNOWN BOT* 〕━━━╮
┃ 👤 Name: ${name}
┃ 📱 Number: ${number}
┃ ⭐ Level: ${db[number].level}
┃ ⚡ XP: ${db[number].xp}/${db[number].level * 50}
┃ 📅 ${new Date().toLocaleDateString()}
┃ ⏰ ${new Date().toLocaleTimeString()}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

╭─❖ 👑 *OWNER COMMANDS*
│ • .owner • .restart • .shutdown • .cleanup
│ • .online • .privacy • .react • .readreceipts
│ • .setprofilepic • .unblock • .unblockall
│ • .toviewonce • .warn
╰──────────────

╭─❖ ⚙️ *SYSTEM SETTINGS*
│ • .mode • .public • .private • .system
╰──────────────

╭─❖ 🔐 *ADMIN COMMANDS*
│ • .kick • .add • .promote • .demote
│ • .tagall • .antilink
╰──────────────

╭─❖ 🌍 *GROUP SETTINGS*
│ • .group • .open • .close
│ • .setname • .setdesc
│ • .link • .resetlink
╰──────────────

╭─❖ 👋 *WELCOME*
│ • .welcome on • .welcome off
╰──────────────

╭─❖ 📦 *BASIC*
│ • .menu • .alive • .ping
│ • .botstatus • .runtime • .time • .repo
╰──────────────

╭─❖ 💡 *UTILITY*
│ • .calc • .sticker • .toimg • .shorten • .qr
╰──────────────

╭─❖ 📊 *INFO*
│ • .botinfo • .runtime • .speed
╰──────────────

╭─❖ 🎮 *GAMES*
│ • .ttt • .guess • .dice • .trivia
│ • .squidgame • .truth • .dare • .truthordare
╰──────────────

╭─❖ 📥 *DOWNLOAD*
│ • .apk • .download • .facebook • .gdrive
│ • .gitclone • .image • .instagram • .itunes
│ • .mediafire • .savestatus • .song2 • .tiktok
╰──────────────

╭─❖ 🖼 *PHOTO / LOGO*
│ • .advancedglow • .blackpinklogo • .blackpingstyle
│ • .deletingtext • .flagtext • .galaxystyles
│ • .glowingtext • .gradienttext • .writetext
│ • .logomaker • .matrix • .neoglitch
│ • .sand • .watercolortext
╰──────────────

╭─❖ 🎉 *FUN*
│ • .fact • .jokes • .memes • .quotes • .trivia
╰──────────────

╭─❖ 🏷 *GROUP EXTRA*
│ • .addcode • .allow • .announcement
│ • .antibadword • .antibot • .antidemote
│ • .antiforeign • .antigroupmention
│ • .approveall • .cancelkick • .closetime
│ • .editsettings • .hidetag • .invite
│ • .kickall • .listactive • .listallowed
│ • .listinactive • .poll • .setgroupname
│ • .tagadmin • .setppgroup • .userid
│ • .totalmembers
╰──────────────

╭─❖ 🌟 *IMAGE*
│ • .wallpaper
╰──────────────

╭─❖ 🔍 *SEARCH*
│ • .define • .lyrics • .weather • .yts
╰──────────────

╭─❖ ⚙️ *BOT SETTINGS*
│ • .addbadword • .deletebadword
│ • .addcountrycode • .delcountrycode
│ • .alwaysonline • .antibug • .anticall
│ • .antidelete • .antideletestatus • .antiedit
│ • .autobio • .autoblock • .autoreact
│ • .autoreactstatus • .autoread • .autorecord
│ • .autorecordtyping • .autotype • .autoviewstatus
│ • .chatbot • .delanticallmsg
│ • .setmenu • .setmenuimage
│ • .setownername • .setownernumber • .setprefix
╰──────────────

╭─❖ 🔗 *PAIR SYSTEM*
│ • .pair
╰──────────────

╰━━━〔 🚀 POWERED BY PRINCE TECH 〕━━━╯
`;

    await sock.sendMessage(from, {
      image: { url: "https://files.catbox.moe/0d7x7h.jpg" },
      caption: menu
    });
  }
};
