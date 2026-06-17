"use client"

import { motion } from "framer-motion"
import { Truck, MapPin, ArrowRight, Package } from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"

export default function DalamPerjalanan() {
  const tasks = useAppStore((s) => s.tasks)
  const openTask = useAppStore((s) => s.openTask)

  const inTransit = tasks.filter((t) => t.status === "DALAM_PENGIRIMAN")

  return (
    <div className="flex h-full flex-col px-5 pb-6">
      <div className="pt-1">
        <h1 className="text-2xl font-bold text-slate-900">Dalam Perjalanan</h1>
        <p className="mt-1 text-sm text-slate-500">
          {inTransit.length > 0
            ? `${inTransit.length} pengiriman sedang berjalan.`
            : "Belum ada pengiriman yang berjalan."}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {inTransit.map((t, i) => (
          <motion.button
            key={t.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => openTask(t.id)}
            className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm active:scale-[0.99]"
          >
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white"
              style={{ background: BRAND.blue }}
            >
              <Truck className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-slate-900">{t.recipient}</p>
                <span
                  className="rounded-md px-2 py-0.5 text-[10px] font-bold"
                  style={{ background: "#E3F2FD", color: "#1565C0" }}
                >
                  DALAM PENGIRIMAN
                </span>
              </div>
              <p className="mt-0.5 flex items-start gap-1 text-xs text-slate-500">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span className="line-clamp-1">{t.address}</span>
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                <Package className="h-3.5 w-3.5 text-slate-400" />
                {t.items}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
          </motion.button>
        ))}

        {inTransit.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <Truck className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-2 text-sm text-slate-500">
              Tidak ada pengiriman aktif. Mulai dari daftar tugas.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
