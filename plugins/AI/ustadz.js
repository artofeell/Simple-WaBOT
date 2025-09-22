const axios = require('axios');
const userModelMap = require('./userModelMap');

module.exports = {
  command: ['ai', 'tanya'],
  description: 'Bertanya seputar Islam dengan Ustadz Nirkyy.',
  run: async (sock, message, args) => {
    const query = args.join(' ');
    if (!query) {
      return message.reply('Gunakan format: *.ustadz <pertanyaan>*\nContoh: .ustadz apa hukum sholat sunnah?');
    }
    const sentMsg = await message.send('Generating answer...');
    try {
      const defaultModel = 'deepseek';
      let model = defaultModel;
      const userModel = userModelMap.get(message.sender);
      if (userModel && userModel.model) {
        model = userModel.model;
      }
      let apiUrl;
      if (model === 'deepseek') {
        apiUrl = `https://api.neoxr.eu/api/blackbox?q=${encodeURIComponent(query)}&apikey=xb5vea`;
      } else if (model === 'gemini') {
        const systemPrompt = 'You are a helpful assistant that answers questions about anything in the world';
        apiUrl = `https://nirkyy-dev.hf.space/api/v1/writecream-gemini?system=${encodeURIComponent(systemPrompt)}&query=${encodeURIComponent(query)}`;
      } else if (model === 'gpt') {
        apiUrl = `https://nirkyy-dev.hf.space/api/v1/gpt-4o-latest?prompt=${encodeURIComponent(query)}`;
      }
      const response = await axios.get(apiUrl);
      const result = response.data;

      let answer;
      if (model === 'deepseek') {
        if (result && result.success === true && typeof result.data === 'string' && result.data.length > 0) {
          answer = result.data.trim();
        }
      } else if (model === 'gemini') {
        (result && result.success && result.data && result.data.mes)
        answer = result.data.mes.trim();

      } else if (model === 'gpt') {

        if (result && result.success === true && typeof result.data === 'string' && result.data.length > 0) {
          answer = result.data.trim();
         
        }
      }

      if (answer) {
        // Hapus semua setelah \n\n (termasuk \n\n itu sendiri)
        answer = answer.replace(/<\/?think>/g, '').replace(/(\r?\n){2,}/g, '\n').replace(/^\s+|\s+$/g, '');
        answer = answer.split('\n\n')[0].trim();
        answer = answer.replace(/\[model:.*?\]/gi, '').trim(); // Hapus [gpt-4o-latest] atau [model: ...]
        await sock.sendMessage(
          message.from,
          { text: answer, edit: sentMsg.key },
          { quoted: sentMsg }
        );
      } else {
        await message.send('I cannot answer that question. Please try asking something else.');
      }
    } catch (e) {
      console.error('AI plugin error', e);
      await sock.sendMessage(
        message.from,
        { text: 'Terjadi error: ' + e.message, edit: sentMsg.key },
        { quoted: sentMsg }
      );
    }
  }
};
