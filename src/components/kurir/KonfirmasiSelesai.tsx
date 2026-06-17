"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle2,
  Home,
  Clock,
  MapPin,
} from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import ProfilKurir from "./ProfilKurir"

export default function KonfirmasiSelesai() {
  const tasks = useAppStore((s) => s.tasks)
  const activeTaskId = useAppStore((s) => s.activeTaskId)
  const history = useAppStore((s) => s.history)
  const setKurirView = useAppStore((s) => s.setKurirView)
  const kurirName = useAppStore((s) => s.kurirName)
  const courier = useAppStore((s) => s.couriers.find((c) => c.id === s.kurirId))

  const completed = history[0]
  const task = tasks.find((t) => t.id === activeTaskId)
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3.5">
        <button
          onClick={() => setKurirView("perjalanan")}
          aria-label="Kembali"
          className="grid h-9 w-9 place-items-center rounded-full text-white"
          style={{ background: BRAND.blue }}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-base font-bold text-slate-900">Rayya Kurir</span>
        <button
          onClick={() => setShowProfile(true)}
          className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white hover:ring-2 hover:ring-blue-200 transition-shadow"
          style={{ background: courier?.avatarColor ?? "#1E88E5" }}
        >
          {courier?.initials ?? kurirName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Success banner */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="flex flex-col items-center rounded-2xl px-6 py-7 text-center"
          style={{ background: "#E6F7EE" }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 16 }}
            className="grid h-14 w-14 place-items-center rounded-full"
            style={{ background: "#10B981" }}
          >
            <CheckCircle2 className="h-8 w-8 text-white" />
          </motion.span>
          <h1 className="mt-3 text-xl font-bold text-slate-900">Pengiriman Berhasil</h1>
          <p className="mt-1 text-sm text-slate-600">
            Pesan telah diterima oleh pelanggan
          </p>
        </motion.div>

        {/* Order summary */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Ringkasan Pesanan</h2>
            <span
              className="rounded-md px-2.5 py-1 text-[10px] font-bold"
              style={{ background: "#D1FAE5", color: "#059669" }}
            >
              Selesai
            </span>
          </div>

          <dl className="mt-3 space-y-2.5 text-sm">
            <Row label="ID Pesanan" value={completed?.id ?? "#AQ-29381"} />
            <Row label="Pelanggan" value={completed?.customer ?? task?.recipient ?? "Joko Subroto"} />
            <Row
              label="Waktu Selesai"
              value={completed?.time ?? "14:30 WIB"}
              icon={<Clock className="h-3.5 w-3.5 text-slate-400" />}
            />
          </dl>
        </div>

        {/* Delivery proof */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">Bukti Pengiriman</h2>
          <div className="relative mt-3 overflow-hidden rounded-xl">
            <ProofPhoto />
            <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              <MapPin className="h-3 w-3" />
              {completed?.instructions ?? "Teras depan (Sesuai Instruksi)"}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 space-y-2.5">
          <button
            onClick={() => setKurirView("tugas")}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-md active:scale-[0.98]"
            style={{ background: BRAND.blue }}
          >
            <Home className="h-4 w-4" />
            Kembali ke Beranda
          </button>
          <button
            onClick={() => setKurirView("riwayat")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3.5 text-sm font-semibold text-slate-700 active:scale-[0.98]"
          >
            <Clock className="h-4 w-4" />
            Lihat Riwayat
          </button>
        </div>
      </div>

      <ProfilKurir open={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}

function Row({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className="flex items-center gap-1.5 text-right font-semibold text-slate-900">
        {icon}
        {value}
      </dd>
    </div>
  )
}

function ProofPhoto() {
  // A stylized illustration of a water jug on a porch
  return (
    <svg viewBox="0 0 400 200" className="h-40 w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="porch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D7E8F5" />
          <stop offset="100%" stopColor="#A8C8E0" />
        </linearGradient>
        <linearGradient id="jug" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5BB7F5" />
          <stop offset="100%" stopColor="#1E88E5" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#porch)" />
      {/* floor tiles */}
      <g stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2">
        <path d="M0 150 H400" />
        <path d="M80 150 L100 200" />
        <path d="M180 150 L200 200" />
        <path d="M280 150 L300 200" />
      </g>
      {/* door */}
      <rect x="250" y="30" width="110" height="125" rx="4" fill="#8B6F47" />
      <rect x="258" y="38" width="94" height="55" rx="2" fill="#A98B68" />
      <circle cx="348" cy="95" r="3" fill="#FBBF24" />
      {/* jug */}
      <g transform="translate(120,60)">
        <path
          d="M30 0 H70 V18 Q86 22 86 40 V110 Q86 130 66 130 H34 Q14 130 14 110 V40 Q14 22 30 18 Z"
          fill="url(#jug)"
        />
        <path d="M38 0 H62 V14 H38 Z" fill="#1565C0" />
        <rect x="30" y="60" width="56" height="34" rx="3" fill="#ffffff" opacity="0.85" />
        <text x="58" y="82" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E88E5">
          19L
        </text>
        <ellipse cx="50" cy="125" rx="40" ry="6" fill="#000" opacity="0.12" />
      </g>
      {/* subtle overlay */}
      <rect width="400" height="200" fill="#000" opacity="0.05" />
    </svg>
  )
}
