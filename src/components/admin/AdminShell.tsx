"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  ClipboardList,
  Truck,
  Boxes,
  Droplets,
  Search,
  Bell,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import type { AdminView } from "@/lib/types"
import BerandaAdmin from "./BerandaAdmin"
import ManajemenKurir from "./ManajemenKurir"
import ManajemenGalon from "./ManajemenGalon"
import PesananAdmin from "./PesananAdmin"

const NAV: { key: AdminView; label: string; icon: React.ReactNode }[] = [
  { key: "beranda", label: "Beranda", icon: <Home className="h-5 w-5" /> },
  { key: "pesanan", label: "Pesanan", icon: <ClipboardList className="h-5 w-5" /> },
  { key: "kurir", label: "Kurir", icon: <Truck className="h-5 w-5" /> },
  { key: "stok", label: "Manajemen Stok", icon: <Boxes className="h-5 w-5" /> },
]

export default function AdminShell() {
  const adminView = useAppStore((s) => s.adminView)
  const setAdminView = useAppStore((s) => s.setAdminView)
  const adminName = useAppStore((s) => s.adminName)
  const logout = useAppStore((s) => s.logout)

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-white"
            style={{ background: `linear-gradient(135deg, ${BRAND.blue}, #1E88E5)` }}
          >
            <Droplets className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold text-slate-900">
            Rayya<span style={{ color: BRAND.blue }}>Water</span>
          </span>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {NAV.map((item) => {
            const active = adminView === item.key
            return (
              <button
                key={item.key}
                onClick={() => setAdminView(item.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
                style={active ? { background: "#1D4ED8" } : undefined}
              >
                {item.icon}
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-slate-200 p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <LogOut className="h-5 w-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6">
          {/* mobile brand */}
          <div className="flex items-center gap-2 md:hidden">
            <span
              className="grid h-8 w-8 place-items-center rounded-lg text-white"
              style={{ background: BRAND.blue }}
            >
              <Droplets className="h-4 w-4" />
            </span>
            <span className="font-bold text-slate-900">RayyaWater</span>
          </div>

          {/* search */}
          <div className="relative hidden flex-1 md:block md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Cari pesanan, armada, atau inventaris..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* mobile nav (compact) */}
          <div className="ml-auto flex items-center gap-1 md:hidden">
            {NAV.map((item) => {
              const active = adminView === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setAdminView(item.key)}
                  aria-label={item.label}
                  className={`grid h-9 w-9 place-items-center rounded-lg ${
                    active ? "text-white" : "text-slate-500 hover:bg-slate-100"
                  }`}
                  style={active ? { background: "#1D4ED8" } : undefined}
                >
                  {item.icon}
                </button>
              )
            })}
          </div>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <IconBtn>
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </IconBtn>
            <IconBtn>
              <HelpCircle className="h-5 w-5" />
            </IconBtn>
            <div className="ml-2 flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1">
              <span
                className="grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-white"
                style={{ background: "#1D4ED8" }}
              >
                {adminName
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div className="hidden text-left lg:block">
                <div className="text-xs font-semibold text-slate-900">{adminName}</div>
                <div className="text-[10px] text-slate-500">Administrator</div>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="min-w-0 flex-1 px-4 py-5 md:px-6 md:py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={adminView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {adminView === "beranda" && <BerandaAdmin />}
              {adminView === "pesanan" && <PesananAdmin />}
              {adminView === "kurir" && <ManajemenKurir />}
              {adminView === "stok" && <ManajemenGalon />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="relative grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100">
      {children}
    </button>
  )
}
