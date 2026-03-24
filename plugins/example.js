export default {
  name: "example",           // Plugin name (optional but recommended)
  command: ["cmd1", "cmd2"], // Array of commands (use [] for auto plugins)
  tags: "category",          // Category (optional)
  desc: "Description",       // Description (optional)
  
  run: async ({ sock, msg, body, cmd, isOwner, isGroup, from, sender }) => {
    try {
      // Your code here
      await sock.sendMessage(from, { text: "Hello!" }, { quoted: msg });
    } catch (error) {
      console.error(`[${this.name}] Error:`, error);
      await sock.sendMessage(from, { text: "❌ An error occurred!" }, { quoted: msg });
    }
  }
};
