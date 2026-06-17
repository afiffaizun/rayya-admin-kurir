"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Eye, Plus, X } from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import type { OrderStatus } from "@/lib/types"
import { StatusBadge } from "./BerandaAdmin"

const CUSTOMER_TYPES = ["Regular Client", "New Customer", "VIP Member"]
const STATUS_OPTIONS: OrderStatus[] = ["Diproses", "Dalam Pengiriman", "Selesai", "Ditolak"]

const EMPTY_FORM = {
  customer: "",
  customerType: "Regular Client",
  location: "",
  items: "",
  total: "",
  status: "Diproses" as OrderStatus,
}

export default function PesananAdmin() {
  const orders = useAppStore((s) => s.orders)
  const orderTab = useAppStore((s) => s.orderTab)
  const setOrderTab = useAppStore((s) => s.setOrderTab)
  const addOrder = useAppStore((s) => s.addOrder)

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [search, setSearch] = useState("")

  const filtered = orders.filter((o) => {
    const matchTab =
      orderTab === "Semua"
        ? true
        : orderTab === "Aktif"
          ? o.status === "Dalam Pengiriman" || o.status === "Diproses"
          : o.status === "Selesai"
    const matchSearch =
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const handleCreate = () => {
    if (!form.customer.trim() || !form.location.trim() || !form.items.trim()) return
    addOrder(form)
    setForm(EMPTY_FORM)
    setShowForm(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-slate-900 md:text-2xl">Pesanan</h1>
        <p className="text-xs text-slate-500 md:text-sm">
          Kelola dan pantau seluruh pesanan pelanggan.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID pesanan atau pelanggan..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {(["Semua", "Aktif", "Selesai"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setOrderTab(t)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  orderTab === t
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setForm(EMPTY_FORM)
              setShowForm(true)
            }}
            className="flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Pesanan Baru</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
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

      {/* Add Order Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Pesanan Baru</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <Field
                  label="Nama Pelanggan"
                  value={form.customer}
                  onChange={(v) => setForm({ ...form, customer: v })}
                  placeholder="Contoh: Ahmad Faisal"
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-900">
                    Tipe Pelanggan
                  </label>
                  <div className="flex gap-2">
                    {CUSTOMER_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setForm({ ...form, customerType: t })}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                          form.customerType === t
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <Field
                  label="Lokasi"
                  value={form.location}
                  onChange={(v) => setForm({ ...form, location: v })}
                  placeholder="Contoh: Jl. Bantul Km 5, Bantul"
                />
                <Field
                  label="Items"
                  value={form.items}
                  onChange={(v) => setForm({ ...form, items: v })}
                  placeholder="Contoh: 5 Galon Mineral"
                />
                <Field
                  label="Total Harga"
                  value={form.total}
                  onChange={(v) => setForm({ ...form, total: v })}
                  placeholder="Contoh: Rp 50.000"
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-900">
                    Status
                  </label>
                  <div className="flex gap-2">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setForm({ ...form, status: s })}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                          form.status === s
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!form.customer.trim() || !form.location.trim() || !form.items.trim()}
                  className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white shadow-md disabled:opacity-50"
                  style={{ background: BRAND.blue }}
                >
                  Buat Pesanan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-900">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
      />
    </label>
  )
}
