# 🦁 Aku Bisa Baca! — Game Belajar Huruf PAUD

Game edukasi belajar huruf untuk anak PAUD dengan tema kartun Indonesia.

## Halaman
- `/` — Homepage (tombol Start)
- `/menu` — Menu pilih pembelajaran
- `/abjad` — Huruf Abjad A-Z
- `/vokal` — Huruf Vokal A I U E O
- `/membaca` — Ayo Membaca (suku kata)
- `/game` — Game Time (kuis tebak huruf)

---

## Deploy ke Vercel

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "init: paud game"
git remote add origin https://github.com/USERNAME/paud-game.git
git push -u origin main
```

### 2. Vercel
1. Buka vercel.com → New Project
2. Import repo tadi
3. Framework Preset: Vite
4. Klik Deploy

---

## Cara Ganti Asset

### Karakter maskot (homepage)
1. Taruh file di `public/assets/maskot.png`
2. Buka `src/pages/HomePage.jsx`
3. Ganti div `hero-img-placeholder` dengan: `<img src="/assets/maskot.png" alt="Maskot" />`

### Background
Taruh `public/assets/bg.png`, lalu di CSS tambah:
```css
.batik-bg { background-image: url('/assets/bg.png'); background-size: cover; }
```

### Audio suara huruf
1. Taruh file di `public/assets/audio/A.mp3`, `B.mp3`, dst.
2. Di `AbjadPage.jsx`, tambahkan di onClick:
```js
new Audio(`/assets/audio/${item.huruf}.mp3`).play();
```

---

## Struktur Folder
```
src/
  pages/         ← Semua halaman
  components/    ← Navbar
  data/
    content.js   ← Edit konten huruf, kata, soal di sini
  index.css      ← Warna & style global
public/
  assets/        ← Taruh semua asset di sini
vercel.json      ← Config routing Vercel
```
