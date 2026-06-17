"use client"

import { motion } from "framer-motion"
import {
  Users,
  Zap,
  CheckCircle2,
  Star,
  Phone,
  Filter,
  BarChart3,
  MapPin,
} from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import type { CourierStatus } from "@/lib/types"

export default function ManajemenKurir() {
  const couriers = useAppStore((s) => s.couriers)

  const total = couriers.length
  const active = couriers.filter((c) => c.status !== "Offline").length
  const doneToday = couriers.reduce((a, c) => a + (c.totalTasks > 100 ? 8 : 5), 0)

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
          </div>
        </div>

        <div className="space-y-3">
          {couriers.map((c, i) => (
            <CourierRow
              key={c.id}
              index={i}
              status={c.status}
              name={c.name}
              location={c.location}
              rating={c.rating}
              totalTasks={c.totalTasks}
              phone={c.phone}
              initials={c.initials}
              avatarColor={c.avatarColor}
            />
          ))}
        </div>
      </div>

      {/* Floating action buttons (chart + refresh) */}
      <button
        className="fixed bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full text-white shadow-lg hover:scale-105"
        style={{ background: BRAND.blue }}
        aria-label="Statistik"
      >
        <BarChart3 className="h-5 w-5" />
      </button>
    </div>
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
  status,
  name,
  location,
  rating,
  totalTasks,
  phone,
  initials,
  avatarColor,
}: {
  index: number
  status: CourierStatus
  name: string
  location: string
  rating: number
  totalTasks: number
  phone: string
  initials: string
  avatarColor: string
}) {
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
        <button className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200">
          Atur Tugas
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
