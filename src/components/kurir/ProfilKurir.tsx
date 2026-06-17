"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Pencil,
  Phone,
  MapPin,
  Star,
  ClipboardCheck,
  Save,
  Briefcase,
} from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import type { CourierStatus } from "@/lib/types"

interface Props {
  open: boolean
  onClose: () => void
}

export default function ProfilKurir({ open, onClose }: Props) {
  const kurirId = useAppStore((s) => s.kurirId)
  const courier = useAppStore((s) => s.couriers.find((c) => c.id === s.kurirId))
  const updateCourier = useAppStore((s) => s.updateCourier)

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    status: "Tersedia" as CourierStatus,
  })

  if (!courier) return null

  const openEdit = () => {
    setForm({
      name: courier.name,
      phone: courier.phone,
      location: courier.location,
      status: courier.status,
    })
    setEditing(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.phone.trim()) return
    updateCourier(kurirId, {
      name: form.name,
      phone: form.phone,
      location: form.location,
      status: form.status,
      initials: form.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    })
    setEditing(false)
  }

  const handleCancel = () => {
    setEditing(false)
  }

  const statusColors: Record<CourierStatus, { bg: string; text: string; dot: string }> = {
    Tersedia: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
    Mengantar: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
    Offline: { bg: "bg-red-100", text: "text-red-600", dot: "bg-red-500" },
  }

  const sc = statusColors[courier.status]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white shadow-xl overflow-hidden"
          >
            {/* Header with avatar */}
            <div
              className="relative flex flex-col items-center px-6 pt-7 pb-5"
              style={{ background: `linear-gradient(135deg, ${BRAND.blue}, #1E88E5)` }}
            >
              <button
                onClick={onClose}
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-white/80 hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <span
                className="grid h-20 w-20 place-items-center rounded-full text-2xl font-bold text-white border-4 border-white/30"
                style={{ background: courier.avatarColor }}
              >
                {courier.initials}
              </span>

              <h3 className="mt-3 text-lg font-bold text-white">{courier.name}</h3>
              <span
                className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${sc.bg} ${sc.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                {courier.status}
              </span>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              {editing ? (
                <div className="space-y-4">
                  <Field
                    label="Nama Lengkap"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                  />
                  <Field
                    label="Nomor Telepon"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                  />
                  <Field
                    label="Lokasi"
                    value={form.location}
                    onChange={(v) => setForm({ ...form, location: v })}
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

                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={handleCancel}
                      className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={!form.name.trim() || !form.phone.trim()}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold text-white shadow-md disabled:opacity-50"
                      style={{ background: BRAND.blue }}
                    >
                      <Save className="h-4 w-4" />
                      Simpan
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    <InfoRow icon={<Phone className="h-4 w-4" />} label="Telepon" value={courier.phone} />
                    <InfoRow icon={<MapPin className="h-4 w-4" />} label="Lokasi" value={courier.location} />
                    <InfoRow
                      icon={<Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                      label="Rating"
                      value={`${courier.rating} / 5.0`}
                    />
                    <InfoRow
                      icon={<ClipboardCheck className="h-4 w-4" />}
                      label="Total Tugas"
                      value={`${courier.totalTasks} tugas`}
                    />
                  </div>

                  <button
                    onClick={openEdit}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white shadow-md"
                    style={{ background: BRAND.blue }}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit Profil
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
      <span className="text-slate-400">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold tracking-wide text-slate-400">{label}</p>
        <p className="truncate text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-900">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
      />
    </label>
  )
}
