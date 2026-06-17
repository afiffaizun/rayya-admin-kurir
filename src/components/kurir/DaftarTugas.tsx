"use client"

import { motion } from "framer-motion"
import {
  MapPin,
  CheckSquare,
  ArrowRight,
  Info,
  Home,
  Building2,
} from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"

export default function DaftarTugas() {
  const tasks = useAppStore((s) => s.tasks)
  const openTask = useAppStore((s) => s.openTask)
  const setKurirView = useAppStore((s) => s.setKurirView)

  const assigned = tasks.filter((t) => t.status === "DITUGASKAN")
  const inTransit = tasks.filter((t) => t.status === "DALAM_PENGIRIMAN")

  return (
    <div className="px-5 pb-6">
      <div className="pt-1">
        <h1 className="text-2xl font-bold text-slate-900">Tugas Pengiriman Hari Ini</h1>
        <p className="mt-1 text-sm text-slate-500">
          Anda memiliki {assigned.length} tugas menunggu penjemputan.
        </p>
      </div>

      {/* In-transit banner if any */}
      {inTransit.length > 0 && (
        <button
          onClick={() => setKurirView("perjalanan")}
          className="mt-4 flex w-full items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-left"
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-lg text-white"
            style={{ background: BRAND.blue }}
          >
            <TruckSmall />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">
              {inTransit.length} pengiriman sedang berjalan
            </p>
            <p className="text-xs text-slate-500">Ketuk untuk melanjutkan</p>
          </div>
          <ArrowRight className="h-4 w-4 text-blue-600" />
        </button>
      )}

      {/* Task cards */}
      <div className="mt-4 space-y-3">
        {assigned.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            {/* status badge */}
            <span
              className="absolute right-3 top-3 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide"
              style={{ background: "#FFF3E0", color: "#FFA500" }}
            >
              DITUGASKAN
            </span>

            {/* building type icon */}
            <span className="absolute left-3 top-3 hidden">
              {t.buildingType === "gedung" ? (
                <Building2 className="h-4 w-4 text-blue-600" />
              ) : (
                <Home className="h-4 w-4 text-blue-600" />
              )}
            </span>

            <p className="mt-4 text-base font-bold text-slate-900">{t.recipient}</p>
            <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-500">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <span>{t.address}</span>
            </p>
            <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-500">
              <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <span>{t.items}</span>
            </p>

            <button
              onClick={() => openTask(t.id)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white shadow-sm transition-transform active:scale-[0.98]"
              style={{ background: BRAND.blue }}
            >
              Mulai Pengiriman
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        ))}

        {assigned.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">
              Tidak ada tugas menunggu. Semua tugas sedang berjalan atau selesai.
            </p>
          </div>
        )}
      </div>

      {/* Optimization tip */}
      <div
        className="mt-4 flex items-start gap-2.5 rounded-xl border border-dashed p-3"
        style={{ borderColor: BRAND.blue, background: "#E6F2FF" }}
      >
        <Info className="mt-0.5 h-5 w-5 shrink-0" style={{ color: BRAND.blue }} />
        <div className="text-sm">
          <span className="font-semibold" style={{ color: BRAND.blue }}>
            Saran Optimalisasi:
          </span>{" "}
          <span className="text-slate-600">
            Hemat 12 menit dengan rute bersamaan.
          </span>
        </div>
      </div>
    </div>
  )
}

function TruckSmall() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h1" />
      <path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-1" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  )
}
