# 📖 PANDUAN WEBSITE KAK YANI

Halo Kak Yani! Ini panduan singkat untuk merawat website Anda.

═══════════════════════════════════════════════════════
## 📁 STRUKTUR FILE (PENTING — JANGAN DIUBAH SUSUNANNYA)
═══════════════════════════════════════════════════════

Susunan file harus PERSIS seperti ini di GitHub:

```
(root / halaman utama repo)
│
├── index.html          ← halaman utama (jangan dipindah)
├── CNAME               ← berisi nama domain: kakyani.my.id
├── README.md           ← panduan ini
│
├── css/
│   └── style.css       ← tampilan & warna website
│
├── js/
│   ├── daftar-artikel.js   ← DAFTAR artikel (Anda edit ini)
│   └── main.js             ← mesin website (jangan diubah)
│
└── artikel/
    ├── my-story/       ← tulisan untuk bagian "My Story"
    │   ├── pagi-yang-tidak-terburu.md
    │   └── memulai-lagi.md
    │
    └── bisnis/         ← tulisan untuk bagian "Cerita Bisnis"
        ├── pelanggan-yang-mengubah.md
        └── memilih-melatih.md
```

⚠️ PENTING: index.html mencari file di folder css/ dan js/.
Kalau file dipindah ke tempat lain, website akan rusak.

═══════════════════════════════════════════════════════
## ✍️ CARA MENAMBAH ARTIKEL BARU (3 LANGKAH)
═══════════════════════════════════════════════════════

Misal Anda mau menulis artikel baru di "My Story":

### Langkah 1: Buat File Artikel Baru
- Buka folder `artikel/my-story/` di GitHub
- Klik "Add file" → "Create new file"
- Beri nama, misalnya: `cerita-lebaran.md`
  (gunakan huruf kecil, pisahkan dengan tanda minus, akhiri .md)
- Isi dengan format ini:

```
---
judul: Cerita Lebaran Tahun Ini
tag: Refleksi
tanggal: 2026-04-01
---

Tulis cerita Anda di sini.

Boleh beberapa paragraf. Beri baris kosong
antar paragraf supaya rapi.
```

### Langkah 2: Daftarkan di daftar-artikel.js
- Buka file `js/daftar-artikel.js`
- Di bagian DAFTAR_MY_STORY, tambahkan nama file Anda:

```
const DAFTAR_MY_STORY = [
  "cerita-lebaran.md",          ← tambahkan ini (paling atas = paling baru)
  "pagi-yang-tidak-terburu.md",
  "memulai-lagi.md"
];
```

Jangan lupa tanda koma ( , ) dan tanda kutip ( " ).

### Langkah 3: Commit
- Klik "Commit changes"
- Tunggu 1-2 menit
- Website otomatis update! Artikel baru langsung muncul.

═══════════════════════════════════════════════════════
## 📝 UNTUK CERITA BISNIS
═══════════════════════════════════════════════════════

Sama persis caranya, tapi:
- Simpan file .md di folder `artikel/bisnis/`
- Daftarkan di bagian `DAFTAR_BISNIS`

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

- Artikel tidak muncul? Cek apakah nama file di daftar-artikel.js
  PERSIS sama dengan nama file .md (termasuk .md di akhir)
- Website rusak/polos? Pastikan folder css/ dan js/ ada di tempatnya
- Bingung? Kirim pertanyaan ke Claude, sertakan apa yang Anda lihat

Domain Anda: kakyani.my.id
Selamat menulis, Kak Yani! 🌟
