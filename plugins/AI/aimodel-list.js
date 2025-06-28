module.exports = {
  command: 'ailist',
  description: 'Menampilkan daftar model AI yang tersedia',
  run: async (sock, message, args) => {
    const list = [
      '*AI Model List:*',
      '• deepseek (Deepseek-R1)',
      '• gemini (Google Gemini)',
      '• gpt (OpenAI GPT-4o)',
    ].join('\n');
    await message.reply(list);
}
};