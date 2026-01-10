export default {
  command: ["menu", "help", "commands"],

  run: async ({ sock, msg }) => {
    const from = msg.key.remoteJid;

    const text = `
╭━━━━━━━━━━━❒ *PRINCE BOT* ❒━━━━━━━━━━━╮
┃
┃ 💥 *WELCOME TO PRINCE X UNKNOWN BOT*
┃ Here’s the list of available commands:
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮

╭─ ❗️ *OWNER COMMANDS* ❗️
│ • *owner* - Display bot owner information
│ • *restart* - Restart the bot
│ • *shutdown* - Shutdown the bot
│ • *cleanup* - Clean up unwanted data
╰──────────────

╭─ ⚙️ *SYSTEM SETTINGS* ⚙️
│ • *mode* - View or change bot mode (public/private)
│ • *public* - Set bot mode to public
│ • *private* - Set bot mode to private
│ • *system* - View bot system settings
╰──────────────

╭─ 🔐 *ADMIN COMMANDS* 🔐
│ • *kick* - Kick a member from the group
│ • *add* - Add a member to the group
│ • *promote* - Promote a member to admin
│ • *demote* - Demote an admin to member
│ • *tagall* - Tag all members in the group
│ • *antilink* - Enable/Disable anti-link protection
╰──────────────

╭─ 🌍 *GROUP SETTINGS* 🌍
│ • *group* - View group settings
│ • *open* - Open the group for members to join
│ • *close* - Close the group and lock it
│ • *setname* - Set group name
│ • *setdesc* - Set group description
╰──────────────

╭─ 👋 *WELCOME SYSTEM* 👋
│ • *welcome on* - Enable welcome messages
│ • *welcome off* - Disable welcome messages
╰──────────────

╭─ 📦 *BASIC COMMANDS* 📦
│ • *menu* - Show this menu
│ • *alive* - Check if the bot is alive
│ • *ping* - Check bot latency
│ • *owner* - Show bot owner info
╰──────────────

╭─ 💡 *UTILITY COMMANDS* 💡
│ • *calc* - Perform simple calculations
│ • *sticker* - Convert image to sticker
│ • *toimg* - Convert sticker to image
│ • *shorten* - Shorten URLs
│ • *qr* - Generate a QR code from text
╰──────────────

╭─ 📊 *INFO COMMANDS* 📊
│ • *botinfo* - View bot information
│ • *runtime* - View bot's runtime
│ • *ping* - Check ping latency
│ • *speed* - Check message processing speed
╰──────────────

╭─ 🎮 *GAMES COMMANDS* 🎮
│ • *ttt* - Play Tic-Tac-Toe
│ • *guess* - Guess the word game
│ • *dice* - Roll a dice
│ • *trivia* - Answer trivia questions
╰──────────────

╭─ 📥 *DOWNLOAD COMMANDS* 📥
│ • *apk* - Download an APK
│ • *download* - General download
│ • *facebook* - Download Facebook videos
│ • *gdrive* - Download from Google Drive
│ • *gitclone* - Clone a GitHub repository
│ • *image* - Download images
│ • *instagram* - Download Instagram posts
│ • *itunes* - Download from iTunes
│ • *mediafire* - Download from MediaFire
│ • *savestatus* - Save WhatsApp status
│ • *song2* - Download music from YouTube
│ • *tiktok* - Download TikTok videos
│ • *xvideos* - Download from Xvideos
╰──────────────

╭─ 🖼 *PHOTO COMMANDS* 🖼
│ • *advancedglow* - Apply advanced glow effect
│ • *blackpinklogo* - Create a Blackpink logo
│ • *blackpingstyle* - Apply Blackpink style to images
│ • *deletingtext* - Remove text from an image
│ • *flagd3yext* - Create flag text
│ • *flagtext* - Generate flag text effect
│ • *freecreate* - Create free-style logos
│ • *galaxystyles* - Apply galaxy effect
│ • *glowingtext* - Generate glowing text
│ • *gradienttext* - Create gradient text
│ • *writetext* - Add text to image
│ • *lighteffects* - Apply light effects
│ • *logomaker* - Create a logo
│ • *matrix* - Apply matrix effect to image
│ • *neoglitch* - Apply Neo-glitch effect
│ • *papercutsstyle* - Create paper-cut style text
│ • *sand* - Create sand-like text effect
│ • *watercolortext* - Create watercolor text effect
╰──────────────

╭─ 🎉 *FUN COMMANDS* 🎉
│ • *fact* - Get a random fact
│ • *jokes* - Get a random joke
│ • *memes* - Get random memes
│ • *quotes* - Get random quotes
│ • *trivia* - Get trivia questions
╰──────────────

╭─ 🕹 *GAMES COMMANDS* 🕹
│ • *squidgame* - Play Squid Game
│ • *truth* - Play Truth game
│ • *dare* - Play Dare game
│ • *truthordare* - Play Truth or Dare
╰──────────────

╭─ 🏷 *GROUP COMMANDS* 🏷
│ • *add* - Add a member to the group
│ • *addcode* - Add group join code
│ • *allow* - Allow a member to join
│ • *announcement* - Set group announcement
│ • *antibadword* - Enable anti-badword
│ • *antibot* - Enable anti-bot protection
│ • *antidemote* - Enable anti-demote
│ • *antiforeign* - Enable anti-foreign protection
│ • *antigroupmention* - Enable anti-group-mention
│ • *antilink* - Enable anti-link protection
│ • *approveall* - Approve all join requests
│ • *cancelkick* - Cancel group kick
│ • *close* - Close the group
│ • *closetime* - Set group closing time
│ • *editsettings* - Edit group settings
│ • *hidetage* - Hide the group tag
│ • *invite* - Invite members to the group
│ • *kickall* - Kick all members
│ • *link* - Get group invite link
│ • *listactive* - List active members
│ • *listallowed* - List allowed members
│ • *listinactive* - List inactive members
│ • *poll* - Start a poll in the group
│ • *resetlink* - Reset group invite link
│ • *setgroupname* - Set group name
│ • *tagadmin* - Tag admin members
│ • *setppgroup* - Set group profile picture
│ • *welcome* - Set up welcome message
│ • *userid* - Get user ID
│ • *totalmembers* - Get total members in the group
╰──────────────

╭─ 🌟 *IMAGE COMMANDS* 🌟
│ • *wallpaper* - Set group wallpaper
╰──────────────

╭─ 📱 *BASIC COMMANDS* 📱
│ • *botstatus* - Check the bot's status
│ • *pair* - Pair the bot with WhatsApp
│ • *ping* - Check bot latency
│ • *repo* - View bot repository
│ • *runtime* - View bot's runtime
│ • *time* - View current time
╰──────────────

╭─ 🛠 *OWNER COMMANDS* 🛠 (Continued)
│ • *online* - Check if the bot is online
│ • *owner* - View owner information
│ • *privacy* - Set privacy settings
│ • *react* - Enable or disable reactions
│ • *readreceipts* - Enable/Disable read receipts
│ • *setprofilepic* - Set bot profile picture
│ • *unblock* - Unblock a user
│ • *unblockall* - Unblock all users
│ • *toveiwonce* - View once messages
│ • *warn* - Warn a user
╰──────────────

╭─ 📜 *RELIGION COMMANDS* 📜
│ • *bible* - Get Bible verses
│ • *quran* - Get Quran verses
╰──────────────

╭─ 🔍 *SEARCH COMMANDS* 🔍
│ • *define* - Define a word
│ • *lyrics* - Get lyrics of a song
│ • *weather* - Get the current weather
│ • *yts* - Search YouTube videos
╰──────────────

╭─ ⚙️ *SETTING COMMANDS* ⚙️
│ • *addbadword* - Add a bad word to blacklist
│ • *addcountrycode* - Add country code for anti-call
│ • *alwaysonline* - Keep the bot always online
│ • *antibug* - Enable/Disable anti-bug protection
│ • *anticall* - Enable anti-call protection
│ • *antidelete* - Enable anti-delete protection
│ • *antideletestatus* - Enable anti-delete status
│ • *anti edit* - Enable anti-edit protection
│ • *autobio* - Set auto bio
│ • *autoblock* - Enable auto-block on unknown numbers
│ • *autoreact* - Enable auto reactions
│ • *autoreactstatus* - Enable auto react to status
│ • *autoread* - Enable auto-read messages
│ • *autorecord* - Enable auto-recording of calls
│ • *autorecordtyping* - Enable auto-recording of typing status
│ • *autotype* - Enable auto-typing
│ • *autoviewstatus* - Enable auto-viewing of status
│ • *chatbot* - Enable/Disable chatbot mode
│ • *delcountrycode* - Delete country code from blacklist
│ • *delanticallmsg* - Delete anti-call message
│ • *deletebadword* - Delete a bad word from blacklist
│ • *setmenu* - Set a custom menu
│ • *setmenuimage* - Set custom menu image
│ • *setownername* - Set bot owner name
│ • *setownernumber* - Set bot owner number
│ • *setprefix* - Set bot command prefix
╰──────────────

╭━━━━━━━━━━━━━〔 ✅ BOT IS READY 〕━━━━━━━━━━━━━╯
┃
┃ For more info, contact *BOT OWNER* or refer to the bot's documentation.
┃ Have fun using PRINCE BOT! 😎
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
`

    await sock.sendMessage(from, { text });
  }
  }
