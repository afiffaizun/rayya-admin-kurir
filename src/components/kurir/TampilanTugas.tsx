"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Droplets,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import ProfilKurir from "./ProfilKurir"

export default function TampilanTugas() {
  const tasks = useAppStore((s) => s.tasks)
  const activeTaskId = useAppStore((s) => s.activeTaskId)
  const setKurirView = useAppStore((s) => s.setKurirView)
  const startTask = useAppStore((s) => s.startTask)
  const completeTask = useAppStore((s) => s.completeTask)
  const kurirName = useAppStore((s) => s.kurirName)
  const courier = useAppStore((s) => s.couriers.find((c) => c.id === s.kurirId))

  const task = tasks.find((t) => t.id === activeTaskId) ?? tasks[0]
  const [photoUploaded, setPhotoUploaded] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const inTransit = task.status === "DALAM_PENGIRIMAN"

  const handleStart = () => startTask(task.id)
  const handleConfirm = () => {
    setPhotoUploaded(true)
    setTimeout(() => completeTask(task.id), 400)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setKurirView("tugas")}
            aria-label="Kembali"
            className="grid h-9 w-9 place-items-center rounded-full text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-base font-bold text-slate-900">Rayya Kurir</span>
        </div>
        <button
          onClick={() => setShowProfile(true)}
          className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white hover:ring-2 hover:ring-blue-200 transition-shadow"
          style={{ background: courier?.avatarColor ?? "#1E88E5" }}
        >
          {courier?.initials ?? kurirName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </button>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Map section */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ background: "#E3F2FD" }}
        >
          {/* faux map graphic */}
          <FauxMap />

          {/* address card */}
          <div className="absolute left-3 top-3 max-w-[70%] rounded-xl bg-white px-3 py-2 shadow-sm">
            <p className="text-[10px] font-medium text-slate-500">MENUJU KE</p>
            <p className="flex items-center gap-1 text-sm font-bold text-slate-900">
              <MapPin className="h-3.5 w-3.5" style={{ color: BRAND.blue }} />
              {shortAddr(task.address)}
            </p>
          </div>

          {/* eta badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm">
            <span className="text-2xl font-bold" style={{ color: BRAND.blue }}>
              8
            </span>
            <span className="text-[10px] font-semibold leading-tight text-slate-600">
              MENIT
              <br />
              LAGI
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <button className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white py-3 text-sm font-bold text-blue-600 active:scale-[0.98]">
            <Phone className="h-4 w-4" />
            Telepon
          </button>
          <button
            className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold active:scale-[0.98]"
            style={{ background: "#E8F5E9", color: "#2E7D32" }}
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
        </div>

        {/* Order details */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Rincian Pesanan</h2>
            <span
              className="rounded-md px-2.5 py-1 text-[10px] font-bold"
              style={{ background: "#E3F2FD", color: "#1565C0" }}
            >
              {inTransit ? "DALAM PENGIRIMAN" : "DITUGASKAN"}
            </span>
          </div>

          {/* Product card */}
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
            <span
              className="grid h-10 w-10 place-items-center rounded-xl text-white"
              style={{ background: `linear-gradient(135deg, ${BRAND.blue}, #1E88E5)` }}
            >
              <Droplets className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">{task.items}</p>
              <p className="text-xs text-slate-500">Isi Ulang Tersegel &amp; Higienis</p>
            </div>
          </div>

          {/* Details list */}
          <dl className="mt-3 space-y-2 text-sm">
            <DetailRow label="ID Pesanan" value={task.id} />
            <DetailRow label="Pelanggan" value={task.recipient} />
            <DetailRow
              label="Instruksi Khusus"
              value="Titipkan di teras depan"
            />
          </dl>
        </div>

        {/* Primary action */}
        {!inTransit ? (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-md active:scale-[0.98]"
            style={{ background: BRAND.blue }}
          >
            Mulai Pengiriman
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirm}
            disabled={photoUploaded}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-md active:scale-[0.98] disabled:opacity-70"
            style={{ background: BRAND.blue }}
          >
            <Camera className="h-4 w-4" />
            {photoUploaded ? "Mengunggah..." : "Konfirmasi Selesai & Unggah Foto"}
          </motion.button>
        )}

        {/* pagination hint */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ChevronLeft className="h-3.5 w-3.5" />
          Geser untuk lihat tugas lain
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>

      <ProfilKurir open={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-900">{value}</dd>
    </div>
  )
}

function shortAddr(addr: string) {
  // take first meaningful chunk
  const parts = addr.split(",")
  return parts.slice(0, 2).join(", ").slice(0, 22) + (addr.length > 22 ? "…" : "")
}

function FauxMap() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="h-44 w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="200" fill="#E3F2FD" />
      {/* green areas */}
      <path d="M0 140 Q60 120 120 140 T240 150 V200 H0 Z" fill="#C8E6C9" opacity="0.7" />
      <path d="M260 0 Q300 40 280 90 T320 160 V0 Z" fill="#C8E6C9" opacity="0.6" />
      {/* roads */}
      <g stroke="#fff" strokeWidth="6" fill="none" opacity="0.9">
        <path d="M-10 60 H410" />
        <path d="M-10 110 H410" />
        <path d="M120 -10 V210" />
        <path d="M260 -10 V210" />
      </g>
      <g stroke="#BBDEFB" strokeWidth="3" fill="none">
        <path d="M-10 30 H410" />
        <path d="M-10 170 H410" />
        <path d="M60 -10 V210" />
        <path d="M200 -10 V210" />
        <path d="M340 -10 V210" />
      </g>
      {/* route line */}
      <path
        d="M40 170 Q120 150 180 110 T330 40"
        stroke="#007AFF"
        strokeWidth="3"
        fill="none"
        strokeDasharray="6 5"
      />
      {/* start pin */}
      <circle cx="40" cy="170" r="6" fill="#007AFF" />
      <circle cx="40" cy="170" r="12" fill="#007AFF" opacity="0.2" />
      {/* end pin */}
      <g transform="translate(330,40)">
        <path d="M0 0 C-8 -14 -14 -10 -14 -18 A14 14 0 1 1 14 -18 C14 -10 8 -14 0 0 Z" fill="#EF4444" transform="translate(0,18)" />
        <circle cx="0" cy="2" r="5" fill="#fff" transform="translate(0,18)" />
      </g>
    </svg>
  )
}
