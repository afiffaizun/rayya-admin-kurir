"use client"

import { Search, Eye, Plus } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { StatusBadge } from "./BerandaAdmin"

export default function PesananAdmin() {
  const orders = useAppStore((s) => s.orders)
  const orderTab = useAppStore((s) => s.orderTab)
  const setOrderTab = useAppStore((s) => s.setOrderTab)

  const filtered = orders.filter((o) => {
    if (orderTab === "Semua") return true
    if (orderTab === "Aktif") return o.status === "Dalam Pengiriman" || o.status === "Diproses"
    return o.status === "Selesai"
  })

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
          <button className="flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8]">
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
    </div>
  )
}
