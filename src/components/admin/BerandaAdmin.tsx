"use client"

import { motion } from "framer-motion"
import {
  ShoppingCart,
  Wallet,
  Warehouse,
  Droplets,
  Recycle,
  Eye,
  AlertTriangle,
  Truck,
  Clock,
  RefreshCw,
} from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import type { OrderStatus } from "@/lib/types"

export default function BerandaAdmin() {
  const orders = useAppStore((s) => s.orders)
  const orderTab = useAppStore((s) => s.orderTab)
  const setOrderTab = useAppStore((s) => s.setOrderTab)

  const filtered = orders.filter((o) => {
    if (orderTab === "Semua") return true
    if (orderTab === "Aktif") return o.status === "Dalam Pengiriman" || o.status === "Diproses"
    return o.status === "Selesai"
  })

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-slate-900 md:text-2xl">Dashboard Ringkasan</h1>
        <p className="text-xs text-slate-500 md:text-sm">
          Terakhir diperbarui: 12 Oktober 2023, 14:30 WIB
        </p>
      </div>

      {/* Summary cards - top row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          icon={<ShoppingCart className="h-5 w-5" />}
          tint="#2563EB"
          label="PESANAN AKTIF"
          sub="HARI INI"
          value="24"
        />
        <SummaryCard
          icon={<Wallet className="h-5 w-5" />}
          tint="#10B981"
          label="PENDAPATAN (MTD)"
          sub="BULAN INI"
          value="Rp 42,5 jt"
        />
        <SummaryCard
          icon={<Warehouse className="h-5 w-5" />}
          tint="#F59E0B"
          label="STATUS STOK"
          sub="INVENTARIS LANGSUNG"
          value="998"
          subValue="Galon Total"
        />
      </div>

      {/* Stock management cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StockCard
          title="GALON ISI"
          icon={<Droplets className="h-5 w-5" />}
          accent="#2563EB"
          value={842}
          capacity={1000}
          actionLabel="Kelola Stok"
          note="Optimalkan pengiriman untuk menjaga sirkulasi stok."
        />
        <StockCard
          title="GALON KOSONG"
          icon={<Recycle className="h-5 w-5" />}
          accent="#EF4444"
          value={156}
          capacity={1000}
          actionLabel="Update Galon"
          note="Kumpulkan galon kosong untuk diisi ulang."
          actionVariant="outline-danger"
        />
      </div>

      {/* Order board */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 md:text-lg">Papan Pesanan</h2>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {(["Semua", "Aktif", "Selesai"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setOrderTab(t)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors md:text-sm ${
                  orderTab === t
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-semibold">ID Pesanan</th>
                <th className="px-4 py-3 font-semibold">Pelanggan</th>
                <th className="px-4 py-3 font-semibold">Lokasi</th>
                <th className="px-4 py-3 font-semibold">Items</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr
                  key={o.id}
                  className={`border-b border-slate-50 hover:bg-slate-50/60 ${
                    i % 2 === 1 ? "bg-slate-50/30" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-slate-900">{o.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{o.customer}</div>
                    <div className="text-xs text-slate-500">{o.customerType}</div>
                  </td>
                  <td className="max-w-[200px] px-4 py-3 text-slate-600">
                    <span className="line-clamp-1">{o.location}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{o.items}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{o.total}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    Tidak ada pesanan pada tab ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({
  icon,
  tint,
  label,
  sub,
  value,
  subValue,
}: {
  icon: React.ReactNode
  tint: string
  label: string
  sub: string
  value: string
  subValue?: string
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-wide text-slate-500">{label}</p>
          <p className="text-[11px] text-slate-400">{sub}</p>
        </div>
        <span
          className="grid h-10 w-10 place-items-center rounded-xl text-white"
          style={{ background: tint }}
        >
          {icon}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-slate-900 md:text-3xl">{value}</p>
        {subValue && <p className="text-xs text-slate-500">{subValue}</p>}
      </div>
    </motion.div>
  )
}

function StockCard({
  title,
  icon,
  accent,
  value,
  capacity,
  actionLabel,
  note,
  actionVariant = "primary",
}: {
  title: string
  icon: React.ReactNode
  accent: string
  value: number
  capacity: number
  actionLabel: string
  note: string
  actionVariant?: "primary" | "outline-danger"
}) {
  const pct = Math.round((value / capacity) * 100)
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span
          className="grid h-10 w-10 place-items-center rounded-xl text-white"
          style={{ background: accent }}
        >
          {icon}
        </span>
        <div>
          <p className="text-[11px] font-semibold tracking-wide text-slate-500">{title}</p>
          <p className="text-xl font-bold text-slate-900">
            {value.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-slate-500">Kapasitas: {capacity.toLocaleString("id-ID")}</p>
          <p className="text-xs font-semibold" style={{ color: accent }}>
            {pct}%
          </p>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: accent }}
        />
      </div>

      <p className="mt-3 text-xs text-slate-500">{note}</p>

      <div className="mt-4 flex justify-end">
        {actionVariant === "primary" ? (
          <button
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
            style={{ background: BRAND.blue }}
          >
            {actionLabel}
          </button>
        ) : (
          <button className="rounded-lg border border-red-400 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50">
            {actionLabel}
          </button>
        )}
      </div>
    </motion.div>
  )
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, { bg: string; fg: string; icon: React.ReactNode }> = {
    Ditolak: { bg: "#FEE2E2", fg: "#DC2626", icon: <AlertTriangle className="h-3 w-3" /> },
    "Dalam Pengiriman": {
      bg: "#DBEAFE",
      fg: "#1D4ED8",
      icon: <Truck className="h-3 w-3" />,
    },
    Diproses: { bg: "#FEF3C7", fg: "#D97706", icon: <Clock className="h-3 w-3" /> },
    Selesai: { bg: "#D1FAE5", fg: "#059669", icon: <RefreshCw className="h-3 w-3" /> },
  }
  const s = map[status]
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{ background: s.bg, color: s.fg }}
    >
      {s.icon}
      {status}
    </span>
  )
}
