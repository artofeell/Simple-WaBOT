module.exports = {
  command: 'ai',
  description: 'Displays information about the AI model and API used by this bot.',
  run: async (sock, message) => {
    const info = `
🤖 *AI Information* 🤖

This bot uses AI services from the following API:
https://nirkyy-dev.hf.space/api/v1/deepseek

The AI model used is *DeepSeek-R1* (or another model according to API updates).

The bot can answer various questions automatically and quickly, with the ability to understand both Indonesian and English.

For more information, please visit the related API documentation or contact the bot developer.
    `.trim();
    await message.reply(info);
  }
};