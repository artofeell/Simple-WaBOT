const userModelMap = require('./userModelMap');

module.exports = {
  command: 'aimodel',
  description: 'Pilih model AI yang akan digunakan (Deepseek/Gemini/GPT)',
  run: async (sock, message, args) => {
    const model = args[0]?.toLowerCase();
    if (!model || !['deepseek', 'gemini', 'gpt'].includes(model)) {
      return message.reply('Model tidak valid. Pilihan: deepseek, gemini');
    }
    userModelMap.set(message.sender, { model });
    await message.reply(`Model AI di-set ke *${model}*`);
  }
};