const userModelMap = require('./userModelMap');

module.exports = {
  command: 'aistatus',
  description: 'Menampilkan model AI yang sedang digunakan user.',
  run: async (sock, message) => {
    const userModel = userModelMap.get(message.sender);
    const userName = message.pushName || message.sender;
    if (!userModel) {
      return message.reply(`👤 Nama: *${userName}*\n\nKamu belum memilih model AI. Gunakan *.aimodel <nama_model>* untuk memilih.`);
    }
    let caption = `👤 Nama: *${userName}*\n🤖 Model AI: *${userModel.model}*`;
    await message.reply(caption);
  }
};