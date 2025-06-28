const axios = require('axios');

module.exports = {
  command: ['pingai'],
  description: 'Cek status semua API AI (beserta waktu respon ms)',
  run: async (sock, message, args) => {
    const endpoints = {
      deepseek: 'https://nirkyy-dev.hf.space/api/v1/deepseek?query=ping',
      gemini:   'https://nirkyy-dev.hf.space/api/v1/writecream-gemini?system=test&query=ping',
      gpt:  'https://nirkyy-dev.hf.space/api/v1/gpt-40-latest?prompt=ping'
    };

    let statusMsg = '*Status API Model:*\n';
    for (const [name, url] of Object.entries(endpoints)) {
      let ms = 0;
      let status = '';
      try {
        const start = Date.now();
        const res = await axios.get(url, { timeout: 20000 });
        ms = Date.now() - start;
        const result = res.data;
        if (name === 'deepseek') {
          if (result && result.success === true && typeof result.data === 'string' && result.data.length > 0) {
            status = `ONLINE (${ms} ms)`;
          } else {
            status = `ERROR (${ms} ms)`;
          }
        } else if (name === 'gemini') {
          if (
            result &&
            result.success === true &&
            result.data &&
            typeof result.data.mes === 'string' &&
            result.data.mes.length > 0
          ) {
            status = `ONLINE (${ms} ms)`;
          } else {
            status = `ERROR (${ms} ms)`;
          }
        } else if (name === 'gpt') {
          if (
            result &&
            result.success === true &&
            typeof result.data === 'string' &&
            result.data.length > 0
          ) {
            status = `ONLINE (${ms} ms)`;
          } else {
            status = `ERROR (${ms} ms)`;
          }
        }
      } catch {
        status = 'OFFLINE';
      }
      statusMsg += `• ${name.charAt(0).toUpperCase() + name.slice(1)}: ${status}\n`;
    }

    await message.reply(statusMsg.trim());
  }
};