# 📖 PANDUAN WEBSITE KAK YANI

Halo Kak Yani! Ini panduan singkat untuk merawat website Anda.

Website ini menggunakan **Jekyll** dan di-host otomatis di **GitHub Pages**.

═══════════════════════════════════════════════════════
## 📁 STRUKTUR FILE (PENTING — JANGAN DIUBAH SUSUNANNYA)
═══════════════════════════════════════════════════════

Susunan file harus PERSIS seperti ini di GitHub:

```
(root / halaman utama repo)
│
├── index.html          ← halaman utama (jangan dipindah)
├── _config.yml         ← pengaturan Jekyll (jangan diubah)
├── CNAME               ← berisi nama domain: kakyani.my.id
├── Gemfile             ← untuk menjalankan lokal (opsional)
├── README.md           ← panduan ini
│
├── css/
│   └── style.css       ← tampilan & warna website
│
├── js/
│   └── main.js         ← mesin website (jangan diubah)
│
├── _my-story/          ← tulisan untuk bagian "My Story"
│   ├── pagi-yang-tidak-terburu.md
│   └── memulai-lagi.md
│
└── _bisnis/            ← tulisan untuk bagian "Cerita Bisnis"
    ├── pelanggan-yang-mengubah.md
    └── memilih-melatih.md
```

⚠️ PENTING: Folder artikel selalu diawali underscore ( _ )
Contoh: `_my-story/` dan `_bisnis/`

═══════════════════════════════════════════════════════
## ✍️ CARA MENAMBAH ARTIKEL BARU (2 LANGKAH SAJA!)
═══════════════════════════════════════════════════════

Misal Anda mau menulis artikel baru di "My Story":

### Langkah 1: Buat File Artikel Baru
- Buka folder `_my-story/` di GitHub
- Klik "Add file" → "Create new file"
- Beri nama, misalnya: `cerita-lebaran.md`
  (gunakan huruf kecil, pisahkan dengan tanda minus, akhiri .md)
- Isi dengan format ini:

```
---
judul: "Cerita Lebaran Tahun Ini"
tag: "Refleksi"
tanggal: 2026-04-01
---

Tulis cerita Anda di sini.

Boleh beberapa paragraf. Beri baris kosong
antar paragraf supaya rapi.
```

### Langkah 2: Commit — Selesai!
- Klik "Commit changes"
- Tunggu 1-2 menit
- Website otomatis update! Artikel baru langsung muncul.

✅ Tidak perlu lagi mengedit file lain!
   Jekyll otomatis mendeteksi artikel baru.

═══════════════════════════════════════════════════════
## 📝 UNTUK CERITA BISNIS
═══════════════════════════════════════════════════════

Sama persis caranya, tapi:
- Simpan file .md di folder `_bisnis/`

═══════════════════════════════════════════════════════
## 🎨 FORMAT TULISAN (MARKDOWN)
═══════════════════════════════════════════════════════

Di dalam tulisan, Anda bisa pakai format sederhana:

- Untuk **tebal**, tulis: `**kata**`
- Untuk *miring*, tulis: `*kata*`
- Untuk judul kecil, tulis: `## Judul`
- Untuk daftar, awali baris dengan tanda minus dan spasi

Tidak wajib pakai format ini — tulisan biasa pun sudah bagus.

═══════════════════════════════════════════════════════
## ❓ KALAU ADA MASALAH
═══════════════════════════════════════════════════════

- Artikel tidak muncul? Pastikan file .md ada di `_my-story/` atau
  `_bisnis/` (jangan lupa underscore di depan!)
- Pastikan ada `---` di awal dan akhir bagian judul/tag/tanggal
- Website rusak/polos? Pastikan folder css/ dan js/ ada di tempatnya
- Bingung? Kirim pertanyaan ke Claude, sertakan apa yang Anda lihat

Domain Anda: kakyani.my.id
Selamat menulis, Kak Yani! 🌟
