module.exports = {
  command: 'aiinfo',
  description: 'Menampilkan info fitur AI di bot ini.',
  run: async (sock, message) => {
    const info = [
      '*AI Info & Commands*',
      '',
      '• *.aimodel <nama_model>* — Pilih model AI yang akan digunakan (deepseek, gemini, gpt)',
      '• *.aistatus* — Lihat model AI yang sedang kamu pakai',
      '• *.ailist* — Lihat daftar model AI yang tersedia',
      '• *.pingai* — Cek status semua API AI',
      '',
      'Model default: Deepseek-R1',
      'Untuk mengganti model, gunakan *.aimodel <nama_model>*',
    ].join('\n');
    await message.reply(info);
  }
};