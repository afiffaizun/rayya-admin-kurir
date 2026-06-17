# RayyaWater Admin Kurir

Aplikasi manajemen pengiriman galon air untuk **Admin** & **Kurir**. Pengantaran cepat & higienis.

## Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | React framework (App Router) |
| [React](https://react.dev/) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first CSS framework |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5 | State management |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Animasi & transisi |
| [shadcn/ui](https://ui.shadcn.com/) | - | Komponen UI (Radix UI + Tailwind) |
| [Lucide React](https://lucide.dev/) | - | Ikon |
| [Prisma](https://www.prisma.io/) | 6 | ORM (database) |

## Fitur

### Admin
- **Beranda** — Dashboard ringkasan pesanan, kurir, dan stok
- **Pesanan** — Daftar pesanan, pencarian, tambah pesanan baru
- **Kurir** — CRUD kurir (tambah, edit, hapus), status & performa
- **Pelanggan** — CRUD pelanggan, tipe pelanggan (Regular, VIP, New)
- **Manajemen Stok** — Pantau & update stok galon

### Kurir
- **Daftar Tugas** — Lihat tugas yang ditugaskan
- **Dalam Perjalanan** — Status pengiriman aktif
- **Riwayat** — Riwayat pengiriman selesai
- **Profil** — Lihat & edit profil kurir (nama, telepon, lokasi, status)
- **Mobile Frame** — Tampilan seperti aplikasi mobile dengan status bar real-time

## Cara Install & Jalankan

### Prasyarat
- [Node.js](https://nodejs.org/) v18 atau lebih tinggi
- npm, yarn, atau bun

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/afiffaizun/rayya-admin-kurir.git

# 2. Masuk ke direktori project
cd rayya-admin-kurir

# 3. Install dependencies
npm install

# 4. Jalankan development server
npm run dev
```

### Buka di browser

```
http://localhost:3000
```

### Login

- **Admin** — Klik tombol "Admin" di layar login
- **Kurir** — Klik tombol "Kurir" di layar login

## Script Tersedia

| Script | Keterangan |
|---|---|
| `npm run dev` | Jalankan development server (port 3000) |
| `npm run build` | Build untuk production |
| `npm run start` | Jalankan production server |
| `npm run lint` | Jalankan ESLint |

## Struktur Folder

```
rayya-admin-kurir/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Halaman utama (login/admin/kurir)
│   │   └── api/              # API routes
│   ├── components/
│   │   ├── admin/            # Komponen admin
│   │   │   ├── AdminShell.tsx
│   │   │   ├── BerandaAdmin.tsx
│   │   │   ├── PesananAdmin.tsx
│   │   │   ├── ManajemenKurir.tsx
│   │   │   ├── ManajemenGalon.tsx
│   │   │   └── DataPelanggan.tsx
│   │   ├── kurir/            # Komponen kurir
│   │   │   ├── KurirApp.tsx
│   │   │   ├── MobileFrame.tsx
│   │   │   ├── DaftarTugas.tsx
│   │   │   ├── TampilanTugas.tsx
│   │   │   ├── DalamPerjalanan.tsx
│   │   │   ├── RiwayatPengiriman.tsx
│   │   │   ├── KonfirmasiSelesai.tsx
│   │   │   └── ProfilKurir.tsx
│   │   ├── ui/               # Komponen UI (shadcn/ui)
│   │   └── LoginScreen.tsx
│   ├── lib/
│   │   ├── store.ts          # Zustand store
│   │   └── types.ts          # TypeScript type definitions
│   └── hooks/                # Custom hooks
├── prisma/                   # Prisma schema
├── public/                   # Static assets
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## License

Private — RayyaWater © 2026
