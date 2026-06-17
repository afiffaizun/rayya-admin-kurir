"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Droplets, LogOut, ClipboardList, Truck, Clock } from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import { MobileFrame } from "./MobileFrame"
import DaftarTugas from "./DaftarTugas"
import TampilanTugas from "./TampilanTugas"
import KonfirmasiSelesai from "./KonfirmasiSelesai"
import RiwayatPengiriman from "./RiwayatPengiriman"
import DalamPerjalanan from "./DalamPerjalanan"

export default function KurirApp() {
  const kurirView = useAppStore((s) => s.kurirView)
  const setKurirView = useAppStore((s) => s.setKurirView)
  const kurirName = useAppStore((s) => s.kurirName)
  const logout = useAppStore((s) => s.logout)

  // Detail & confirmation are full-screen overlays (no bottom nav)
  const isOverlay = kurirView === "detail" || kurirView === "konfirmasi"

  const activeTab: "tugas" | "perjalanan" | "riwayat" =
    kurirView === "perjalanan"
      ? "perjalanan"
      : kurirView === "riwayat"
        ? "riwayat"
        : "tugas"

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <MobileFrame>
        {/* Top bar (hidden on overlay detail/konfirmasi which have their own header) */}
        {!isOverlay && (
          <header className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-2">
              <span
                className="grid h-8 w-8 place-items-center rounded-lg text-white"
                style={{ background: `linear-gradient(135deg, ${BRAND.blue}, #1E88E5)` }}
              >
                <Droplets className="h-4 w-4" />
              </span>
              <span className="text-base font-bold text-slate-900">Kurir Water</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white"
                style={{ background: "#1E88E5" }}
              >
                {kurirName
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <button
                onClick={logout}
                aria-label="Keluar"
                className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </header>
        )}

        {/* Content */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={kurirView}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              {kurirView === "tugas" && <DaftarTugas />}
              {kurirView === "perjalanan" && <DalamPerjalanan />}
              {kurirView === "riwayat" && <RiwayatPengiriman />}
              {kurirView === "detail" && <TampilanTugas />}
              {kurirView === "konfirmasi" && <KonfirmasiSelesai />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav (hidden on overlays) */}
        {!isOverlay && (
          <nav className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-2.5">
            <BottomTab
              active={activeTab === "tugas"}
              onClick={() => setKurirView("tugas")}
              icon={<ClipboardList className="h-5 w-5" />}
              label="Tugas"
            />
            <BottomTab
              active={activeTab === "perjalanan"}
              onClick={() => setKurirView("perjalanan")}
              icon={<Truck className="h-5 w-5" />}
              label="Dalam Perjalanan"
            />
            <BottomTab
              active={activeTab === "riwayat"}
              onClick={() => setKurirView("riwayat")}
              icon={<Clock className="h-5 w-5" />}
              label="Riwayat"
            />
          </nav>
        )}
      </MobileFrame>
    </div>
  )
}

function BottomTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium transition-colors"
      style={
        active
          ? { background: BRAND.blue, color: "#fff" }
          : { color: "#374151", background: "#F3F4F6" }
      }
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
