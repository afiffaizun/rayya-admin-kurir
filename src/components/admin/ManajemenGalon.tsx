"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
  Search,
  Minus,
  Plus,
  ListChecks,
  Droplets,
} from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import type { StockItem } from "@/lib/types"

export default function ManajemenGalon() {
  const stock = useAppStore((s) => s.stock)
  const updateStockQty = useAppStore((s) => s.updateStockQty)
  const adminName = useAppStore((s) => s.adminName)

  const total = stock.reduce((a, s) => a + s.quantity, 0)
  const isi = stock.find((s) => s.type === "isi")?.quantity ?? 0
  const kosong = stock.find((s) => s.type === "kosong")?.quantity ?? 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 md:text-2xl">Manajemen Stok Galon</h1>
          <p className="mt-1 text-xs text-slate-500 md:text-sm">
            Pantau dan kelola persediaan galon isi serta kosong secara real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Cari tipe galon..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 md:flex">
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
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900">{adminName}</div>
              <div className="text-[10px] text-slate-500">Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StockSummary
          icon={<ClipboardCheck className="h-5 w-5" />}
          tint="#007BFF"
          label="Total Stok"
          value={total}
          unit="Unit"
        />
        <StockSummary
          icon={<CheckCircle2 className="h-5 w-5" />}
          tint="#28A745"
          label="Galon Isi"
          value={isi}
          unit="Tersedia"
          unitTint="#28A745"
        />
        <StockSummary
          icon={<AlertCircle className="h-5 w-5" />}
          tint="#DC3545"
          label="Galon Kosong"
          value={kosong}
          unit="Butuh Isi"
          unitTint="#DC3545"
        />
      </div>

      {/* Product list */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 md:p-5">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 md:text-lg">
            <ListChecks className="h-5 w-5 text-slate-500" />
            Daftar Produk &amp; Pengelolaan
          </h2>
          <span className="text-xs text-slate-400">Last Update: 5 Mins Ago</span>
        </div>

        <div className="divide-y divide-slate-100">
          {stock.map((item, i) => (
            <ProductRow
              key={item.id}
              item={item}
              index={i}
              onDelta={(d) => updateStockQty(item.id, d)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StockSummary({
  icon,
  tint,
  label,
  value,
  unit,
  unitTint,
}: {
  icon: React.ReactNode
  tint: string
  label: string
  value: number
  unit: string
  unitTint?: string
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl"
          style={{ background: `${tint}1A`, color: tint }}
        >
          {icon}
        </span>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value.toLocaleString("id-ID")}</p>
        </div>
      </div>
      <p
        className="mt-2 text-xs font-medium"
        style={{ color: unitTint ?? "#6C757D" }}
      >
        {unit}
      </p>
    </motion.div>
  )
}

function ProductRow({
  item,
  index,
  onDelta,
}: {
  item: StockItem
  index: number
  onDelta: (d: number) => void
}) {
  const [qty, setQty] = useState(0)
  const [updated, setUpdated] = useState(false)

  const handleUpdate = () => {
    if (qty !== 0) {
      onDelta(qty)
      setQty(0)
      setUpdated(true)
      setTimeout(() => setUpdated(false), 1500)
    }
  }

  const accent =
    item.type === "isi" ? "#28A745" : item.type === "kosong" ? "#DC3545" : "#1565C0"

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:p-5"
    >
      {/* thumbnail */}
      <div
        className="grid h-16 w-16 shrink-0 place-items-center rounded-xl"
        style={{ background: `${item.thumbColor}1A` }}
      >
        <Droplets
          className="h-8 w-8"
          style={{ color: item.thumbColor }}
        />
      </div>

      {/* details */}
      <div className="min-w-0 flex-1">
        <p className="font-bold text-slate-900">{item.name}</p>
        <p className="text-xs text-slate-500">ID: {item.productId}</p>
        <p className="mt-1 text-sm text-slate-700">
          {item.quantity.toLocaleString("id-ID")}{" "}
          <span className="text-slate-400">{item.unit}</span>
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full"
              style={{ width: `${item.capacityPct}%`, background: accent }}
            />
          </div>
          <span className="text-xs font-semibold" style={{ color: accent }}>
            {item.capacityPct}% Kapasitas
          </span>
        </div>
      </div>

      {/* quantity controls */}
      <div className="flex items-center gap-3 md:flex-col md:items-end">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQty((q) => q - 1)}
            className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Kurangi"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            value={qty}
            onChange={(e) => setQty(Number(e.target.value) || 0)}
            className="h-8 w-14 rounded-lg border border-slate-200 text-center text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Tambah"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={handleUpdate}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-white transition-colors"
          style={{ background: updated ? "#28A745" : BRAND.blue }}
        >
          {updated ? "Diperbarui" : "Update"}
        </button>
      </div>
    </motion.div>
  )
}
