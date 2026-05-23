/* ============================================================
   📝 FILE TULISAN KAK YANI
   ============================================================
   
   Ini adalah tempat semua tulisan untuk "My Story" dan
   "Cerita Bisnis" disimpan. Tulisan di sini akan TAMPIL UNTUK
   SEMUA PENGUNJUNG website.

   ────────────────────────────────────────────────────────
   CARA MENAMBAH TULISAN BARU:
   ────────────────────────────────────────────────────────
   1. Copy satu blok { ... } yang sudah ada (dari { sampai })
   2. Paste di bawahnya, sebelum tanda kurung siku tutup  ]
   3. Ganti isinya:
      - judul    : judul tulisan Anda
      - tag      : kategori singkat (contoh: "Refleksi")
      - tanggal  : format "2026-01-30" (tahun-bulan-tanggal)
      - isi       : tulisan lengkap Anda
   4. Jangan lupa beri tanda koma ( , ) setelah kurung tutup }
   5. Simpan file, lalu upload ulang ke Netlify

   ⚠️ PENTING:
   - Jangan hapus tanda kutip ("), koma (,), atau kurung kurawal
   - Untuk ganti baris/paragraf di dalam isi, gunakan \n\n
   - Tulisan paling atas = paling baru tampil

   Kalau ragu, kirim saja tulisan Anda ke Claude untuk dimasukkan.
   ============================================================ */


/* ───────────────────────────────────────────
   MY STORY — Jurnal & Cerita Pribadi
   ─────────────────────────────────────────── */
const MY_STORY_ARTICLES = [

  {
    judul: "Pagi yang tidak terburu-buru",
    tag: "Refleksi",
    tanggal: "2026-05-17",
    isi: "Hari ini saya bangun lebih awal. Ada sesuatu tentang aroma kopi yang baru diseduh — perlahan, jujur, tanpa perlu pamer.\n\nSaya jadi berpikir, mungkin saya terlalu lama berlari. Saya ingin lebih banyak pagi seperti ini — pagi yang saya nikmati, bukan pagi yang saya kejar."
  },

  {
    judul: "Tentang memulai lagi, berkali-kali",
    tag: "Pelajaran",
    tanggal: "2026-05-10",
    isi: "Orang sering bertanya bagaimana saya tetap bertahan. Jawaban saya selalu sama: saya tidak bertahan, saya hanya memulai lagi — berkali-kali.\n\nSetiap kali ada yang gagal, saya tidak menganggapnya akhir. Saya menganggapnya sebagai data. Apa yang bisa saya pelajari? Apa yang bisa saya perbaiki besok?\n\nMungkin itu rahasianya. Bukan kekuatan, tapi kemauan untuk mulai dari awal tanpa malu."
  }

];


/* ───────────────────────────────────────────
   CERITA BISNIS — Pelajaran & Perjalanan Usaha
   ─────────────────────────────────────────── */
const BUSINESS_ARTICLES = [

  {
    judul: "Pelanggan yang mengubah cara saya melihat usaha",
    tag: "Cerita Bisnis",
    tanggal: "2026-05-14",
    isi: "Beberapa tahun lalu, ada pelanggan yang datang dengan ekspresi ragu. Warung saya saat itu masih sangat sederhana. Tapi setelah suapan pertama, matanya berbinar. \"Ini enak sekali!\" katanya. Lalu memesan dua porsi untuk dibawa pulang.\n\nMomen itu mengajarkan: produk yang jujur akan selalu menemukan jalannya. Saya tidak perlu jadi yang termurah atau viral. Cukup konsisten."
  },

  {
    judul: "Kenapa saya memilih melatih, bukan sekadar menjual",
    tag: "Filosofi",
    tanggal: "2026-05-08",
    isi: "Banyak yang bertanya kenapa Blind Coffee repot-repot mengadakan kelas, bukan fokus jualan saja. Jawabannya sederhana: menjual kopi memberi saya penghasilan hari ini, tapi melatih orang lain memberi mereka penghasilan seumur hidup.\n\nSaya pernah ada di titik di mana saya tidak tahu apakah saya masih berguna. Kalau saya bisa membantu satu orang merasa berguna lewat keterampilan, maka usaha ini sudah lebih dari sekadar bisnis."
  }

];
