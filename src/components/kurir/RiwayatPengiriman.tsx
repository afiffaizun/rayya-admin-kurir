"use client"

import { motion } from "framer-motion"
import { Truck } from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import { KurirPageHeader } from "./shared"

export default function RiwayatPengiriman() {
  const history = useAppStore((s) => s.history)
  const setKurirView = useAppStore((s) => s.setKurirView)

  return (
    <div className="flex h-full flex-col">
      <KurirPageHeader
        title="Riwayat Pengiriman"
        onBack={() => setKurirView("tugas")}
      />

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Total Selesai" value="124" tint={BRAND.blue} />
          <StatCard label="Bulan Ini" value="28" tint="#10B981" />
        </div>

        {/* List */}
        <h2 className="mt-5 mb-3 text-base font-semibold text-slate-900">
          Aktivitas Terbaru
        </h2>
        <div className="space-y-3">
          {history.map((h, i) => (
            <motion.div
              key={`${h.id}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                style={{ background: "#D1FAE5" }}
              >
                <Truck className="h-5 w-5" style={{ color: "#10B981" }} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">{h.id}</p>
                  <span
                    className="rounded-md px-2 py-0.5 text-[10px] font-semibold text-white"
                    style={{ background: "#10B981" }}
                  >
                    Selesai
                  </span>
                </div>
                <p className="text-sm text-slate-700">{h.customer}</p>
                <p className="text-xs text-slate-400">{h.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, tint }: { label: string; value: string; tint: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold" style={{ color: tint }}>
        {value}
      </p>
    </motion.div>
  )
}
