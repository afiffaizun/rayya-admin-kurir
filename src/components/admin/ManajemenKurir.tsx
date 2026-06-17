"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  Zap,
  CheckCircle2,
  Star,
  Phone,
  Filter,
  BarChart3,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import type { Courier, CourierStatus } from "@/lib/types"

const AVATAR_COLORS = ["#1E88E5", "#43A047", "#FB8C00", "#8E24AA", "#E53935", "#00897B"]

const EMPTY_FORM = {
  name: "",
  phone: "",
  status: "Tersedia" as CourierStatus,
  location: "",
  rating: 5.0,
  totalTasks: 0,
}

export default function ManajemenKurir() {
  const couriers = useAppStore((s) => s.couriers)
  const addCourier = useAppStore((s) => s.addCourier)
  const updateCourier = useAppStore((s) => s.updateCourier)
  const deleteCourier = useAppStore((s) => s.deleteCourier)

  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteTarget, setDeleteTarget] = useState<Courier | null>(null)

  const total = couriers.length
  const active = couriers.filter((c) => c.status !== "Offline").length
  const doneToday = couriers.reduce((a, c) => a + (c.totalTasks > 100 ? 8 : 5), 0)

  const openAdd = () => {
    setEditId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (c: Courier) => {
    setEditId(c.id)
    setForm({
      name: c.name,
      phone: c.phone,
      status: c.status,
      location: c.location,
      rating: c.rating,
      totalTasks: c.totalTasks,
    })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.phone.trim()) return
    if (editId) {
      updateCourier(editId, form)
    } else {
      addCourier(form)
    }
    setShowForm(false)
  }

  const handleDelete = () => {
    if (deleteTarget) {
      deleteCourier(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-slate-900 md:text-2xl">Manajemen Kurir</h1>
        <p className="text-xs text-slate-500 md:text-sm">
          Pantau lokasi dan performa armada secara real-time.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          tint="#1E88E5"
          label="TOTAL KURIR"
          value={total}
        />
        <StatCard
          icon={<Zap className="h-5 w-5" />}
          tint="#4CAF50"
          label="KURIR AKTIF"
          value={active}
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          tint="#FB8C00"
          label="SELESAI HARI INI"
          value={doneToday}
          tintBg="#FFCCBC"
        />
      </div>

      {/* List */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 md:text-lg">
            Daftar Kurir Aktif
          </h2>
          <div className="flex items-center gap-2">
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
              Tambah Kurir
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {couriers.map((c, i) => (
            <CourierRow
              key={c.id}
              index={i}
              courier={c}
              onEdit={() => openEdit(c)}
              onDelete={() => setDeleteTarget(c)}
            />
          ))}
        </div>
      </div>

      {/* Floating action button */}
      <button
        className="fixed bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full text-white shadow-lg hover:scale-105"
        style={{ background: BRAND.blue }}
        aria-label="Statistik"
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
                  {editId ? "Edit Kurir" : "Tambah Kurir"}
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
                  placeholder="Contoh: Andi Pratama"
                />
                <Field
                  label="Nomor Telepon"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  placeholder="Contoh: +62 812-3456-7890"
                />
                <Field
                  label="Lokasi"
                  value={form.location}
                  onChange={(v) => setForm({ ...form, location: v })}
                  placeholder="Contoh: Jl. Kaliurang KM 7"
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-900">
                    Status
                  </label>
                  <div className="flex gap-2">
                    {(["Tersedia", "Mengantar", "Offline"] as CourierStatus[]).map((s) => (
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
                  onClick={handleSave}
                  disabled={!form.name.trim() || !form.phone.trim()}
                  className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white shadow-md disabled:opacity-50"
                  style={{ background: BRAND.blue }}
                >
                  {editId ? "Simpan Perubahan" : "Tambah Kurir"}
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
                <h3 className="mt-3 text-lg font-bold text-slate-900">Hapus Kurir?</h3>
                <p className="mt-1 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">{deleteTarget.name}</span> akan
                  dihapus dari daftar kurir secara permanen.
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

function CourierRow({
  index,
  courier,
  onEdit,
  onDelete,
}: {
  index: number
  courier: Courier
  onEdit: () => void
  onDelete: () => void
}) {
  const { status, name, location, rating, totalTasks, phone, initials, avatarColor } = courier
  const online = status !== "Offline"
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex flex-col gap-3 rounded-xl border border-slate-100 p-3 hover:border-slate-200 hover:shadow-sm md:flex-row md:items-center"
    >
      <div className="flex items-center gap-3 md:w-56 md:shrink-0">
        <div className="relative">
          <span
            className="grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-white"
            style={{ background: avatarColor }}
          >
            {initials}
          </span>
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
              online ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900">{name}</p>
          <StatusPill status={status} />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-semibold tracking-wide text-slate-400">
            LOKASI TERKINI
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-600">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span className="line-clamp-1">{location}</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-wide text-slate-400">PERFORMA</p>
          <p className="flex items-center gap-1 text-xs text-slate-600">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-900">{rating}</span>
            <span className="text-slate-400">({totalTasks} tugas)</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:ml-auto">
        <a
          href={`tel:${phone}`}
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
          aria-label="Telepon kurir"
        >
          <Phone className="h-4 w-4" />
        </a>
        <button
          onClick={onEdit}
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          aria-label="Edit kurir"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-500"
          aria-label="Hapus kurir"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

function StatusPill({ status }: { status: CourierStatus }) {
  const map: Record<CourierStatus, string> = {
    Tersedia: "bg-green-100 text-green-700",
    Mengantar: "bg-blue-100 text-blue-700",
    Offline: "bg-red-100 text-red-600",
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${map[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Offline" ? "bg-red-500" : "bg-green-500"
        }`}
      />
      {status}
    </span>
  )
}
