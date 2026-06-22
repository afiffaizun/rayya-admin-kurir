"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  ShoppingCart,
  UserPlus,
  Phone,
  Filter,
  BarChart3,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Mail,
} from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import type { Customer } from "@/lib/types"

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  address: "",
  customerType: "Regular Client" as Customer["customerType"],
  totalOrders: 0,
}

export default function DataPelanggan() {
  const customers = useAppStore((s) => s.customers)
  const addCustomer = useAppStore((s) => s.addCustomer)
  const updateCustomer = useAppStore((s) => s.updateCustomer)
  const deleteCustomer = useAppStore((s) => s.deleteCustomer)

  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null)
  const [search, setSearch] = useState("")

  const total = customers.length
  const newCust = customers.filter((c) => c.customerType === "New Customer").length

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => {
    setEditId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (c: Customer) => {
    setEditId(c.id)
    setForm({
      name: c.name,
      phone: c.phone,
      email: c.email,
      address: c.address,
      customerType: c.customerType,
      totalOrders: c.totalOrders,
    })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.phone.trim()) return
    if (editId) {
      updateCustomer(editId, form)
    } else {
      addCustomer(form)
    }
    setShowForm(false)
  }

  const handleDelete = () => {
    if (deleteTarget) {
      deleteCustomer(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-slate-900 md:text-2xl">Data Pelanggan</h1>
        <p className="text-xs text-slate-500 md:text-sm">
          Kelola data pelanggan RayyaWater.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          tint="#1E88E5"
          label="TOTAL PELANGGAN"
          value={total}
        />
        <StatCard
          icon={<UserPlus className="h-5 w-5" />}
          tint="#4CAF50"
          label="PELANGGAN BARU"
          value={newCust}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-bold text-slate-900 md:text-lg">Daftar Pelanggan</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, telepon, atau email..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:w-56"
            />
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
              style={{ background: BRAND.blue }}
            >
              <Plus className="h-3.5 w-3.5" />
              Tambah Pelanggan
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Tidak ada pelanggan ditemukan.</p>
          ) : (
            filtered.map((c, i) => (
              <CustomerRow
                key={c.id}
                index={i}
                customer={c}
                onEdit={() => openEdit(c)}
                onDelete={() => setDeleteTarget(c)}
              />
            ))
          )}
        </div>
      </div>

      <button
        className="fixed bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full text-white shadow-lg hover:scale-105"
        style={{ background: BRAND.blue }}
        aria-label="Statistik Pelanggan"
      >
        <BarChart3 className="h-5 w-5" />
      </button>

      {/* Add/Edit Form Modal */}
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
                <h3 className="text-lg font-bold text-slate-900">
                  {editId ? "Edit Pelanggan" : "Tambah Pelanggan"}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <Field
                  label="Nama Lengkap"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Contoh: Budi Santoso"
                />
                <Field
                  label="Nomor Telepon"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  placeholder="Contoh: 081234567890"
                />
                <Field
                  label="Email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="Contoh: budi@gmail.com"
                />
                <Field
                  label="Alamat"
                  value={form.address}
                  onChange={(v) => setForm({ ...form, address: v })}
                  placeholder="Contoh: Jl. Sudirman No. 123"
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-900">
                    Tipe Pelanggan
                  </label>
                  <div className="flex gap-2">
                    {(["Regular Client", "New Customer"] as const).map((t) => (
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
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  disabled={!form.name.trim() || !form.phone.trim()}
                  className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white shadow-md disabled:opacity-50"
                  style={{ background: BRAND.blue }}
                >
                  {editId ? "Simpan Perubahan" : "Tambah Pelanggan"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="flex flex-col items-center text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-900">Hapus Pelanggan?</h3>
                <p className="mt-1 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">{deleteTarget.name}</span> akan
                  dihapus dari daftar pelanggan secara permanen.
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-red-600"
                >
                  Hapus
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

function StatCard({
  icon,
  tint,
  label,
  value,
  tintBg,
}: {
  icon: React.ReactNode
  tint: string
  label: string
  value: number
  tintBg?: string
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
        style={{
          background: tintBg ?? `${tint}1A`,
          color: tint,
        }}
      >
        {icon}
      </span>
      <div>
        <p className="text-[11px] font-semibold tracking-wide text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </motion.div>
  )
}

function CustomerRow({
  index,
  customer,
  onEdit,
  onDelete,
}: {
  index: number
  customer: Customer
  onEdit: () => void
  onDelete: () => void
}) {
  const { name, phone, email, address, customerType, totalOrders } = customer
  const typeColors: Record<string, string> = {
    "Regular Client": "bg-blue-100 text-blue-700",
    "New Customer": "bg-green-100 text-green-700",
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex flex-col gap-3 rounded-xl border border-slate-100 p-3 hover:border-slate-200 hover:shadow-sm md:flex-row md:items-center"
    >
      <div className="flex items-center gap-3 md:w-56 md:shrink-0">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
          {name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900">{name}</p>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeColors[customerType] ?? "bg-slate-100 text-slate-600"}`}
          >
            {customerType}
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div>
          <p className="text-[10px] font-semibold tracking-wide text-slate-400">KONTAK</p>
          <p className="flex items-center gap-1 text-xs text-slate-600">
            <Phone className="h-3.5 w-3.5 text-slate-400" />
            <span>{phone}</span>
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-600">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate">{email}</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-wide text-slate-400">ALAMAT</p>
          <p className="flex items-center gap-1 text-xs text-slate-600">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span className="line-clamp-1">{address}</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-wide text-slate-400">TOTAL PESANAN</p>
          <p className="flex items-center gap-1 text-xs text-slate-600">
            <ShoppingCart className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-semibold text-slate-900">{totalOrders}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:ml-auto">
        <a
          href={`tel:${phone}`}
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
          aria-label="Telepon pelanggan"
        >
          <Phone className="h-4 w-4" />
        </a>
        <button
          onClick={onEdit}
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          aria-label="Edit pelanggan"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-500"
          aria-label="Hapus pelanggan"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}
